// The iMac as real geometry, lit and rendered with WebGL.
//
// The CSS version this replaces was a flat card that skewed: the rim, the ice
// panel, the bezel and the screen all sat in one plane, so there was no
// thickness anywhere, the silhouette stayed a rectangle however far it turned,
// and — the strongest tell — no highlight ever moved, because the gradients
// were baked at a fixed angle. Planes cannot make a compound curve.
//
// What makes this read as an object instead: a bevelled extrusion, so the
// edges are round and the silhouette changes as it turns; an environment map,
// so the plastic has a specular that slides across it; and a contact shadow,
// so it sits on something.
//
// The screen stays live DOM. The case is drawn into a transparent WebGL canvas
// stacked over a CSS3DRenderer that positions the real desktop in the same
// camera space, and a cutout plane at the screen writes depth without writing
// colour — punching a hole through the case so the DOM shows through, while
// still occluding the body behind it. This is three.js's own `css3d_mixed`
// arrangement.
//
// Everything here is loaded on demand: see MachineStage for the import.

import type * as THREE_NS from 'three';

type THREE = typeof THREE_NS;

/** Bondi blue, as linear-ish sRGB hex for the shell. */
const SHELL_COLOUR = 0x0f6f87;

/** The "ice" front panel — frosted polycarbonate over light grey. */
const ICE_COLOUR = 0xe8eef0;

/** Field of view, degrees. Long-ish, so the machine reads as a product shot. */
const FOV = 32;

/** How far back the camera sits in the hero, as a multiple of the end distance. */
const HERO_DISTANCE = 3.35;

export interface MachineGLOptions {
	/** Element the two renderers are appended to. */
	mount: HTMLElement;
	/** The live desktop, positioned in 3D and shown through the screen hole. */
	screenContent: HTMLElement;
}

export interface MachineGLHandle {
	/**
	 * Drive a frame.
	 *
	 * @param progress - Zoom progress, 0 in the hero to 1 at the screen.
	 * @param tiltX - Degrees of pitch, from the pointer.
	 * @param tiltY - Degrees of yaw, from the pointer.
	 */
	update(progress: number, tiltX: number, tiltY: number): void;
	/** Re-read the viewport and rebuild anything sized from it. */
	resize(): void;
	/** Show or hide the 3D presentation. */
	setVisible(visible: boolean): void;
	/** Release GPU resources and remove the canvases. */
	dispose(): void;
}

/**
 * Build a rounded rectangle as a Shape, optionally with a rectangular hole.
 *
 * Extruding this with a bevel is what gives the case its soft edges — and a
 * soft edge is the whole reason the silhouette changes as the machine turns,
 * which a flat plane can never do.
 */
function roundedRect(
	THREE: THREE,
	width: number,
	height: number,
	radius: number,
	hole?: { width: number; height: number; radius: number; offsetY: number }
): THREE_NS.Shape {
	const shape = new THREE.Shape();
	const w = width / 2;
	const h = height / 2;
	const r = Math.min(radius, w, h);

	shape.moveTo(-w + r, -h);
	shape.lineTo(w - r, -h);
	shape.quadraticCurveTo(w, -h, w, -h + r);
	shape.lineTo(w, h - r);
	shape.quadraticCurveTo(w, h, w - r, h);
	shape.lineTo(-w + r, h);
	shape.quadraticCurveTo(-w, h, -w, h - r);
	shape.lineTo(-w, -h + r);
	shape.quadraticCurveTo(-w, -h, -w + r, -h);

	if (hole) {
		const path = new THREE.Path();
		const hw = hole.width / 2;
		const hh = hole.height / 2;
		const hr = Math.min(hole.radius, hw, hh);
		const cy = hole.offsetY;

		path.moveTo(-hw + hr, cy - hh);
		path.lineTo(hw - hr, cy - hh);
		path.quadraticCurveTo(hw, cy - hh, hw, cy - hh + hr);
		path.lineTo(hw, cy + hh - hr);
		path.quadraticCurveTo(hw, cy + hh, hw - hr, cy + hh);
		path.lineTo(-hw + hr, cy + hh);
		path.quadraticCurveTo(-hw, cy + hh, -hw, cy + hh - hr);
		path.lineTo(-hw, cy - hh + hr);
		path.quadraticCurveTo(-hw, cy - hh, -hw + hr, cy - hh);

		shape.holes.push(path);
	}

	return shape;
}

/**
 * Stand up the scene. Async because three and its addons are code-split.
 */
export async function createMachineGL(options: MachineGLOptions): Promise<MachineGLHandle> {
	const THREE = (await import('three')) as unknown as THREE;
	const { CSS3DRenderer, CSS3DObject } = await import(
		'three/examples/jsm/renderers/CSS3DRenderer.js'
	);
	const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');

	const { mount, screenContent } = options;

	// --- Renderers --------------------------------------------------------
	//
	// CSS3D underneath, WebGL over the top with a transparent canvas. The
	// WebGL canvas takes no pointer events, so once the desktop is live it is
	// the DOM below that receives the clicks.
	const css3d = new CSS3DRenderer();
	css3d.domElement.className = 'machineGL__css';
	mount.appendChild(css3d.domElement);

	const gl = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	gl.toneMapping = THREE.NeutralToneMapping;
	gl.domElement.className = 'machineGL__canvas';
	mount.appendChild(gl.domElement);

	const scene = new THREE.Scene();

	// A procedural room, so the plastic has something to reflect without
	// shipping an HDR file.
	const pmrem = new THREE.PMREMGenerator(gl);
	const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	scene.environment = envMap;

	const key = new THREE.DirectionalLight(0xffffff, 2.4);
	key.position.set(-1.4, 1.6, 2.2);
	scene.add(key);

	const fill = new THREE.DirectionalLight(0xcfe8f2, 0.7);
	fill.position.set(2.2, -0.4, 1.2);
	scene.add(fill);

	const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 20000);

	// --- Geometry ---------------------------------------------------------
	//
	// One world unit is one CSS pixel, which is the convention CSS3DRenderer
	// works in — that is what lets the DOM screen line up with the hole.
	const machine = new THREE.Group();
	scene.add(machine);

	// Deliberately not `transmission`. A transmissive material is drawn in the
	// transparent pass, after the cutout has written its hole — so it blends
	// straight over the desktop and washes the whole screen cyan. Clearcoat
	// over a saturated base gives the same wet-plastic read, renders in the
	// opaque pass where the cutout can occlude it, and costs far less.
	const shellMaterial = new THREE.MeshPhysicalMaterial({
		color: SHELL_COLOUR,
		roughness: 0.18,
		metalness: 0,
		clearcoat: 1,
		clearcoatRoughness: 0.05,
		ior: 1.52,
		envMapIntensity: 1.15,
	});

	const iceMaterial = new THREE.MeshPhysicalMaterial({
		color: ICE_COLOUR,
		roughness: 0.42,
		metalness: 0,
		clearcoat: 0.7,
		clearcoatRoughness: 0.22,
		envMapIntensity: 0.85,
	});

	/** Sized from the viewport, so the screen is exactly the desktop. */
	let parts: THREE_NS.Object3D[] = [];
	let cutout: THREE_NS.Mesh | null = null;
	let screenObject: THREE_NS.Object3D | null = null;
	let endDistance = 1000;

	const buildGeometry = () => {
		for (const part of parts) {
			machine.remove(part);
			part.traverse((node) => {
				const mesh = node as THREE_NS.Mesh;
				if (mesh.geometry) mesh.geometry.dispose();
			});
		}
		parts = [];

		const screenW = window.innerWidth;
		const screenH = window.innerHeight;

		// Proportions taken off the real machine, expressed against the screen.
		// The chin is deep because that is where the iMac keeps its speakers,
		// its drive and its name — take it away and the case reads as a slab.
		const bezel = screenW * 0.055;
		const frontW = screenW + bezel * 2;
		const chin = screenH * 0.34;
		const frontH = screenH + bezel + chin;
		const depth = screenW * 0.62;

		// The screen sits above centre, with the chin below it.
		const screenOffsetY = (chin - bezel) / 2;

		// The ice front panel: a bevelled extrusion with the screen cut out of
		// it. The bevel is what rounds the edges.
		const frontShape = roundedRect(THREE, frontW, frontH, screenW * 0.13, {
			width: screenW,
			height: screenH,
			radius: screenW * 0.012,
			offsetY: screenOffsetY,
		});
		const frontGeo = new THREE.ExtrudeGeometry(frontShape, {
			depth: screenW * 0.05,
			bevelEnabled: true,
			bevelThickness: screenW * 0.028,
			bevelSize: screenW * 0.026,
			bevelSegments: 6,
			curveSegments: 24,
		});
		frontGeo.translate(0, 0, -screenW * 0.05);
		const front = new THREE.Mesh(frontGeo, iceMaterial);
		machine.add(front);
		parts.push(front);

		// The coloured shell: a slightly larger bevelled slab behind the ice
		// panel, so it reads as a rim in front and as the body from the side.
		// The shell needs the screen cut out of it too. Its front bevel reaches
		// slightly in FRONT of the cutout plane, so as a solid slab it passed
		// the depth test and painted the whole screen area shell-coloured —
		// which is what was covering the desktop.
		const shellShape = roundedRect(THREE, frontW * 1.055, frontH * 1.045, screenW * 0.17, {
			width: screenW,
			height: screenH,
			radius: screenW * 0.012,
			offsetY: screenOffsetY,
		});
		const shellGeo = new THREE.ExtrudeGeometry(shellShape, {
			depth: depth * 0.72,
			bevelEnabled: true,
			bevelThickness: screenW * 0.05,
			bevelSize: screenW * 0.045,
			bevelSegments: 8,
			curveSegments: 24,
		});
		shellGeo.translate(0, 0, -depth * 0.78);
		const shell = new THREE.Mesh(shellGeo, shellMaterial);
		machine.add(shell);
		parts.push(shell);

		// The tube housing tapering away behind, which is what stops the case
		// reading as a slab when it turns.
		const backGeo = new THREE.CylinderGeometry(
			frontW * 0.38,
			frontW * 0.17,
			depth * 0.5,
			28,
			1,
			false
		);
		backGeo.rotateX(Math.PI / 2);
		backGeo.translate(0, screenOffsetY, -depth * 0.95);
		const back = new THREE.Mesh(backGeo, shellMaterial);
		machine.add(back);
		parts.push(back);

		// --- The chin: two speakers, the slot drive, and the foot ----------
		//
		// These are the parts that say iMac. Without them the front is a
		// rounded rectangle and could be anything.
		const chinY = screenOffsetY - screenH / 2 - bezel - chin / 2;
		const speakerR = chin * 0.42;
		const speakerX = frontW * 0.36;

		for (const side of [-1, 1]) {
			// A shallow dome, recessed into the panel and coloured like the
			// shell — the translucent grille of the real machine.
			const domeGeo = new THREE.SphereGeometry(speakerR, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2);
			domeGeo.rotateX(Math.PI / 2);
			domeGeo.scale(1, 1, 0.3);
			domeGeo.translate(side * speakerX, chinY, screenW * 0.012);
			const dome = new THREE.Mesh(domeGeo, shellMaterial);
			machine.add(dome);
			parts.push(dome);
		}

		// The slot-loading drive.
		const slotGeo = new THREE.BoxGeometry(frontW * 0.34, chin * 0.075, screenW * 0.012);
		slotGeo.translate(0, chinY, screenW * 0.02);
		const slot = new THREE.Mesh(
			slotGeo,
			new THREE.MeshStandardMaterial({ color: 0x2b3338, roughness: 0.6 })
		);
		machine.add(slot);
		parts.push(slot);

		// The foot the whole thing sits on.
		const footShape = roundedRect(THREE, frontW * 0.3, chin * 0.34, chin * 0.16);
		const footGeo = new THREE.ExtrudeGeometry(footShape, {
			depth: depth * 0.34,
			bevelEnabled: true,
			bevelThickness: chin * 0.1,
			bevelSize: chin * 0.09,
			bevelSegments: 5,
			curveSegments: 16,
		});
		footGeo.translate(0, chinY - chin * 0.58, -depth * 0.36);
		const foot = new THREE.Mesh(footGeo, shellMaterial);
		machine.add(foot);
		parts.push(foot);

		// The hole. NoBlending with zero opacity writes depth but no colour, so
		// the canvas is transparent here and the DOM behind shows through —
		// while still hiding the housing behind it.
		if (cutout) {
			machine.remove(cutout);
			cutout.geometry.dispose();
		}
		// Kept in the same plane as the CSS3D screen. Moving it forward would
		// make it project larger than the DOM it is meant to reveal.
		const cutGeo = new THREE.PlaneGeometry(screenW, screenH);
		cutGeo.translate(0, screenOffsetY, 2);
		cutout = new THREE.Mesh(
			cutGeo,
			// Depth only: no colour is written at all, so the cleared
			// (transparent) canvas survives here and the DOM behind shows
			// through, while the depth it writes stops the case being drawn
			// over the screen.
			new THREE.MeshBasicMaterial({ colorWrite: false })
		);
		// Drawn before everything else, explicitly. Every mesh here has its
		// offsets baked into the geometry rather than set on the object, so
		// they all sit at the origin and three's front-to-back depth sort —
		// which reads the object's position, not the geometry's — cannot tell
		// them apart. Without this the cutout was drawn after the shell had
		// already painted the screen area, and the hole never appeared.
		cutout.renderOrder = -1;
		machine.add(cutout);

		// The live desktop, in the same camera space as the case.
		if (!screenObject) {
			screenObject = new CSS3DObject(screenContent) as unknown as THREE_NS.Object3D;
			machine.add(screenObject);
		}
		screenObject.position.set(0, screenOffsetY, 0);

		// Camera distance at which the screen plane exactly fills the viewport.
		// This is the same relation CSS3DRenderer uses for its perspective, so
		// at the end of the zoom the desktop is at 1:1.
		endDistance = screenH / (2 * Math.tan((FOV * Math.PI) / 360));
	};

	const resize = () => {
		const w = window.innerWidth;
		const h = window.innerHeight;
		gl.setSize(w, h);
		css3d.setSize(w, h);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		buildGeometry();
	};

	resize();

	const update = (progress: number, tiltX: number, tiltY: number) => {
		// Dolly in rather than scale up: the perspective genuinely changes,
		// which a CSS scale cannot do.
		const eased = progress * progress;
		const distance = endDistance * (HERO_DISTANCE - (HERO_DISTANCE - 1) * eased);
		camera.position.set(0, 0, distance);
		camera.lookAt(0, 0, 0);

		machine.rotation.x = (tiltX * Math.PI) / 180;
		machine.rotation.y = (tiltY * Math.PI) / 180;

		gl.render(scene, camera);
		css3d.render(scene, camera);
	};

	const setVisible = (visible: boolean) => {
		const display = visible ? '' : 'none';
		gl.domElement.style.display = display;
		css3d.domElement.style.display = display;
	};

	const dispose = () => {
		for (const part of parts) {
			part.traverse((node) => {
				const mesh = node as THREE_NS.Mesh;
				if (mesh.geometry) mesh.geometry.dispose();
			});
		}
		cutout?.geometry.dispose();
		shellMaterial.dispose();
		iceMaterial.dispose();
		envMap.dispose();
		pmrem.dispose();
		gl.dispose();
		gl.domElement.remove();
		css3d.domElement.remove();
	};

	return { update, resize, setVisible, dispose };
}
