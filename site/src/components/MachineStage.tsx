// Chooses how the machine is drawn, and owns the handoff to the live desktop.
//
// The desktop lives in one detached host element for the whole session, and
// that element is *moved* between three homes: the CSS3D layer while the WebGL
// machine has it, a plain full-viewport wrapper once the zoom completes, and
// the CSS machine's screen when WebGL is unavailable. Moving the node rather
// than re-parenting it in React is what keeps the desktop's state — open
// windows, chosen flavour, selected rows — across the handoff. React renders
// into the host through a portal and never has to care where it currently is.
//
// WebGL is loaded on demand and is never on the critical path: if it fails, is
// unsupported, or the visitor prefers reduced motion, the desktop is simply
// there, at full size, with no machine around it.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { MachineGLHandle } from './machineGL';

export interface MachineStageProps {
	/** The live desktop. */
	children: ReactNode;
	/** Copy rendered above the machine in the hero. */
	above: ReactNode;
	/** Copy rendered below the machine in the hero. */
	below: ReactNode;
}

/** Fraction of the scroll track over which the zoom completes. */
const ZOOM_COMPLETE_AT = 0.8;

/** Progress past which the desktop is released to the page. */
const RELEASE_AT = 0.995;

/** Degrees of rotation at the far edge of the viewport. */
const MAX_TILT = 13;

/** Fraction of the zoom over which the tilt returns to square. */
const TILT_GONE_AT = 0.4;

/** Per-frame fraction of the remaining distance to the pointer. */
const TILT_EASE = 0.09;

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

/** Whether this browser can give us a WebGL2 context at all. */
function hasWebGL(): boolean {
	try {
		const canvas = document.createElement('canvas');
		return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
	} catch {
		return false;
	}
}

export function MachineStage({ children, above, below }: MachineStageProps) {
	// Created once and never re-created: this is the element React portals the
	// desktop into, and the one that gets moved between homes.
	const host = useMemo(() => {
		const node = document.createElement('div');
		node.className = 'machineScreen__live';
		return node;
	}, []);

	const trackRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const mountRef = useRef<HTMLDivElement>(null);
	const releaseRef = useRef<HTMLDivElement>(null);

	const [mode, setMode] = useState<'pending' | 'gl' | 'flat'>('pending');

	useEffect(() => {
		const track = trackRef.current;
		const stage = stageRef.current;
		const mount = mountRef.current;
		const release = releaseRef.current;
		if (!track || !stage || !mount || !release) return;

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

		let handle: MachineGLHandle | null = null;
		let frame: number | null = null;
		let cancelled = false;

		// null rather than false so the first call always applies the
		// attributes, instead of being skipped by the no-op guard.
		let released: boolean | null = null;

		const target = { x: 0, y: 0 };
		const current = { x: 0, y: 0 };

		const setReleased = (next: boolean) => {
			if (next === released) return;
			released = next;
			stage.dataset.released = next ? 'true' : 'false';

			if (next) {
				release.appendChild(host);
				// CSS3DRenderer writes position and a matrix3d straight onto the
				// element it owns. Those survive the move, so without clearing
				// them the desktop lands half a viewport up and to the left.
				host.style.position = '';
				host.style.transform = '';
				host.style.willChange = '';
				host.removeAttribute('inert');
				host.removeAttribute('aria-hidden');
				handle?.setVisible(false);
			} else {
				// `inert` is set through the DOM rather than as a JSX prop
				// because React 18 does not recognise it as a known attribute.
				host.setAttribute('inert', '');
				host.setAttribute('aria-hidden', 'true');
				handle?.setVisible(true);
			}
		};

		const readProgress = () => {
			const rect = track.getBoundingClientRect();
			const scrollable = rect.height - window.innerHeight;
			const raw = scrollable <= 0 ? 0 : clamp(-rect.top / scrollable, 0, 1);
			return clamp(raw / ZOOM_COMPLETE_AT, 0, 1);
		};

		// --- Flat fallback: no machine, just the desktop ---------------------
		const runFlat = () => {
			release.appendChild(host);
			host.removeAttribute('inert');
			host.removeAttribute('aria-hidden');
			stage.dataset.released = 'true';
			released = true;
			setMode('flat');
		};

		if (reduceMotion.matches || !hasWebGL()) {
			runFlat();
			return;
		}

		const apply = () => {
			frame = null;
			if (!handle) return;

			const progress = readProgress();
			stage.style.setProperty('--zoom-progress', String(progress));

			const strength = clamp(1 - progress / TILT_GONE_AT, 0, 1);
			current.x += (target.x - current.x) * TILT_EASE;
			current.y += (target.y - current.y) * TILT_EASE;

			setReleased(progress >= RELEASE_AT);

			if (released !== true) {
				handle.update(progress, current.x * strength, current.y * strength);
			}

			const settled =
				Math.abs(target.x - current.x) < 0.01 && Math.abs(target.y - current.y) < 0.01;
			if (!settled) schedule();
		};

		const schedule = () => {
			if (frame !== null) return;
			frame = requestAnimationFrame(apply);
		};

		const onPointerMove = (event: PointerEvent) => {
			if (!canHover.matches) return;
			const nx = clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
			const ny = clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
			// A pointer to the right should turn the machine to face it, and a
			// pointer above should tip its top toward the viewer.
			target.y = nx * MAX_TILT;
			target.x = -ny * MAX_TILT;
			schedule();
		};

		const onPointerLeave = () => {
			target.x = 0;
			target.y = 0;
			schedule();
		};

		const onResize = () => {
			handle?.resize();
			apply();
		};

		void (async () => {
			try {
				const { createMachineGL } = await import('./machineGL');
				if (cancelled) return;

				handle = await createMachineGL({ mount, screenContent: host });
				if (cancelled) {
					handle.dispose();
					return;
				}

				setMode('gl');
				setReleased(false);
				apply();

				window.addEventListener('scroll', schedule, { passive: true });
				window.addEventListener('resize', onResize);
				window.addEventListener('pointermove', onPointerMove, { passive: true });
				document.addEventListener('pointerleave', onPointerLeave);
			} catch (error) {
				// A machine is decoration; the desktop is the content. Losing the
				// first must never cost the second.
				console.warn('Machine: falling back to the flat desktop.', error);
				if (!cancelled) runFlat();
			}
		})();

		return () => {
			cancelled = true;
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('pointerleave', onPointerLeave);
			if (frame !== null) cancelAnimationFrame(frame);
			handle?.dispose();
		};
	}, [host]);

	return (
		<div className="zoomTrack" ref={trackRef} data-mode={mode}>
			<div className="zoomStage" ref={stageRef} data-released="false">
				<div className="zoomCopy zoomCopy--above">{above}</div>
				<div className="machineGL" ref={mountRef} aria-hidden="true" />
				<div className="machineRelease" ref={releaseRef} />
				<div className="zoomCopy zoomCopy--below">{below}</div>
			</div>
			{createPortal(children, host)}
		</div>
	);
}
