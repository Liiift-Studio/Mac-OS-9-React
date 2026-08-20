// Button component - Mac OS 9 style
// Enhanced with polymorphic support, loading states, and icon support
//
// API notes (panel review #41, #42, #43, #56, #88, #90, #91, #92, #99, #123):
//  - Standard hyphenated aria-* props; the camelCase aliases still work for
//    one major version and warn in development (#41)
//  - Variant accepts all four shared tokens, size the shared sm/md/lg (#42, #43)
//  - Class composition goes through mergeClasses like every other component (#56)
//  - iconOnly requires an accessible name and says so loudly in dev, instead
//    of silently producing an unlabelled control for non-string children (#123)
//  - The ref type follows the `as` discriminant, so useRef<HTMLButtonElement>
//    assigns without a cast (#90)
//  - Known props are destructured before the rest spread, so caller props can
//    no longer clobber aria-disabled / aria-busy or reintroduce href (#91)
//  - ARIA attributes are typed rather than Record<string, any> (#92)
//  - asChild renders the caller's own element, so Next/Router Link can be
//    styled as a button without losing behaviour (#99)
//  - IconButton is now a thin preset over Button rather than a parallel
//    implementation (#88)

import React, {
	forwardRef,
	cloneElement,
	isValidElement,
	type AnchorHTMLAttributes,
	type AriaAttributes,
	type ButtonHTMLAttributes,
	type ReactElement,
} from 'react';
import { sanitizeUrl } from '../../utils/url';
import { mergeClasses } from '../../utils/classNames';
import { warnDeprecatedProp, warnMissingProp } from '../../utils/deprecation';
import type { Size, Variant } from '../../types';
import styles from './Button.module.css';

/** The ARIA attributes Button computes and forwards. */
type ButtonAriaAttributes = Pick<
	AriaAttributes,
	| 'aria-label'
	| 'aria-labelledby'
	| 'aria-describedby'
	| 'aria-pressed'
	| 'aria-disabled'
	| 'aria-busy'
>;

// Common props shared by button and link variants
interface BaseButtonProps {
	/**
	 * Button variant
	 * @default 'default'
	 */
	variant?: Variant;

	/**
	 * Button size
	 * @default 'md'
	 */
	size?: Size;

	/**
	 * Whether the button is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the button should take full width
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Loading state - shows loading indicator and disables interaction
	 * @default false
	 */
	loading?: boolean;

	/**
	 * Text to show when loading (replaces children)
	 */
	loadingText?: string;

	/**
	 * Use Mac OS 9 style watch cursor during loading
	 * @default false
	 */
	useCursorLoading?: boolean;

	/**
	 * Icon to display before the button text
	 */
	leftIcon?: React.ReactNode;

	/**
	 * Icon to display after the button text
	 */
	rightIcon?: React.ReactNode;

	/**
	 * If true, only the icon is displayed.
	 *
	 * An accessible name is then required: pass `aria-label`, or use string
	 * children which are used as the label. Non-string children (an `<Icon>`
	 * element, say) cannot supply one, and previously produced a silently
	 * unnamed control — that now warns in development (issue #123).
	 */
	iconOnly?: boolean;

	/**
	 * Render the caller's own element instead of a button or anchor, keeping
	 * Button's classes and behaviour. Use it to style a framework link:
	 *
	 * ```tsx
	 * <Button asChild><NextLink href="/x">Go</NextLink></Button>
	 * ```
	 *
	 * `children` must be a single React element (issue #99).
	 */
	asChild?: boolean;

	/** @deprecated Use `aria-label`. Removed in 2.0. */
	ariaLabel?: string;

	/** @deprecated Use `aria-describedby`. Removed in 2.0. */
	ariaDescribedBy?: string;

	/** @deprecated Use `aria-pressed`. Removed in 2.0. */
	ariaPressed?: boolean;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Button content
	 */
	children: React.ReactNode;
}

// Button-specific props
interface ButtonAsButton
	extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
	/**
	 * Render as button element
	 * @default 'button'
	 */
	as?: 'button';

	/**
	 * Associate button with a form by ID
	 */
	form?: string;

	/**
	 * Override form action URL
	 */
	formAction?: string;

	/**
	 * Override form method
	 */
	formMethod?: 'get' | 'post';

	/**
	 * Skip form validation
	 */
	formNoValidate?: boolean;

	/**
	 * Where to display form response
	 */
	formTarget?: string;
}

// Link-specific props
interface ButtonAsLink
	extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
	/**
	 * Render as anchor element
	 */
	as: 'a';

	/**
	 * URL for the link
	 */
	href: string;

	/**
	 * Where to open the link
	 */
	target?: '_blank' | '_self' | '_parent' | '_top';

	/**
	 * Relationship of linked resource
	 * Auto-fills "noopener noreferrer" for external links if not provided
	 */
	rel?: string;

	/**
	 * Prompt to download the linked resource
	 */
	download?: boolean | string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Mac OS 9 style Button component
 *
 * Polymorphic component that can render as button or link with consistent styling.
 *
 * Features:
 * - Classic 3-layer bevel effect (highlight, shadow, drop shadow)
 * - Polymorphic - renders as <button> or <a> based on `as` prop
 * - Loading states with optional Mac OS 9 watch cursor
 * - Icon support (left, right, or icon-only)
 * - Full accessibility with ARIA support
 * - Form integration props
 * - Auto-security for external links
 *
 * @example
 * ```tsx
 * // Button
 * <Button onClick={handleClick}>Click Me</Button>
 * <Button variant="primary" size="lg">Primary Action</Button>
 * <Button loading loadingText="Saving...">Save</Button>
 *
 * // Link styled as button
 * <Button as="a" href="/dashboard">Go to Dashboard</Button>
 * <Button as="a" href="https://example.com" target="_blank">
 *   External Link
 * </Button>
 *
 * // With icons
 * <Button leftIcon={<FolderIcon />}>Open</Button>
 * <Button iconOnly aria-label="Close">
 *   <CloseIcon />
 * </Button>
 * ```
 */
const ButtonRoot = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
	const {
		variant = 'default',
		size = 'md',
		disabled = false,
		fullWidth = false,
		loading = false,
		loadingText,
		useCursorLoading = false,
		leftIcon,
		rightIcon,
		iconOnly = false,
		asChild = false,
		ariaLabel,
		ariaDescribedBy,
		ariaPressed,
		className = '',
		children,
		// Hyphenated forms are destructured explicitly so they can win over
		// the deprecated camelCase aliases and can't be re-applied by the
		// rest spread further down (issue #91).
		'aria-label': ariaLabelProp,
		'aria-labelledby': ariaLabelledByProp,
		'aria-describedby': ariaDescribedByProp,
		'aria-pressed': ariaPressedProp,
		...restProps
	} = props as BaseButtonProps &
		ButtonAriaAttributes & { asChild?: boolean } & Record<string, unknown>;

	// Deprecated aliases still work for one major version, but say so once.
	if (ariaLabel !== undefined) warnDeprecatedProp('Button', 'ariaLabel', 'aria-label');
	if (ariaDescribedBy !== undefined)
		warnDeprecatedProp('Button', 'ariaDescribedBy', 'aria-describedby');
	if (ariaPressed !== undefined) warnDeprecatedProp('Button', 'ariaPressed', 'aria-pressed');

	// Hyphenated wins when both are supplied.
	const resolvedAriaLabel = ariaLabelProp ?? ariaLabel;
	const resolvedAriaDescribedBy = ariaDescribedByProp ?? ariaDescribedBy;
	const resolvedAriaPressed = ariaPressedProp ?? ariaPressed;

	// Determine if rendering as link
	const isLink = props.as === 'a';
	const Component = isLink ? 'a' : 'button';

	// Build class names through the shared helper, like every other
	// component, instead of a sixth hand-rolled variant (issue #56).
	const classNames = mergeClasses(
		styles.button,
		styles[`button--${variant}`],
		styles[`button--${size}`],
		fullWidth && styles['button--full-width'],
		disabled && styles['button--disabled'],
		loading && styles['button--loading'],
		loading && useCursorLoading && styles['button--cursor-loading'],
		iconOnly && styles['button--icon-only'],
		Boolean(leftIcon || rightIcon) && styles['button--with-icon'],
		className
	);

	// An icon-only button needs a name from somewhere. String children can
	// supply it; an <Icon> element cannot, and silently shipping an unnamed
	// control is worse than complaining in development (issue #123).
	const derivedLabel = resolvedAriaLabel ?? (typeof children === 'string' ? children : undefined);
	if (iconOnly && !derivedLabel && !ariaLabelledByProp) {
		warnMissingProp(
			'Button',
			'`iconOnly` needs an accessible name. Pass `aria-label`, or use string children.'
		);
	}

	// Typed rather than Record<string, any>, so a typo is a compile error
	// and the precise ARIA value types survive (issue #92).
	const ariaAttributes: ButtonAriaAttributes = {
		'aria-label': iconOnly ? derivedLabel : resolvedAriaLabel,
		'aria-labelledby': ariaLabelledByProp,
		'aria-describedby': resolvedAriaDescribedBy,
		'aria-pressed': resolvedAriaPressed,
		'aria-disabled': disabled || loading,
		'aria-busy': loading,
	};

	// asChild: hand the caller's own element our classes and ARIA, so a
	// framework Link keeps its navigation behaviour while looking like a
	// button (issue #99).
	if (asChild) {
		if (!isValidElement(children)) {
			warnMissingProp('Button', '`asChild` expects a single React element child.');
			return null;
		}
		const child = children as ReactElement<Record<string, unknown>>;
		return cloneElement(child, {
			...ariaAttributes,
			...restProps,
			className: mergeClasses(classNames, child.props.className as string | undefined),
			ref,
		} as Record<string, unknown>);
	}

	// Handle link-specific props
	if (isLink) {
		const { href, target, rel, download, ...linkProps } = restProps as unknown as ButtonAsLink;

		// Block javascript:/data:/vbscript: hrefs before they reach the DOM.
		// sanitizeUrl returns undefined for unsafe schemes; an anchor with no
		// href is non-functional but still visible, which is the desired
		// fail-closed behavior for untrusted input.
		const safeHref = sanitizeUrl(href);

		// Auto-add security rel for external links
		let finalRel = rel;
		if (target === '_blank' && !rel) {
			finalRel = 'noopener noreferrer';
		}

		// Links can't be truly disabled, so prevent default
		const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
			if (disabled || loading) {
				e.preventDefault();
				return;
			}
			linkProps.onClick?.(e);
		};

		// Caller props spread first, then everything Button computes. The
		// old order let linkProps override aria-disabled / aria-busy, and
		// could reintroduce an href that the disabled guard had removed
		// (issue #91).
		return (
			<a
				{...linkProps}
				ref={ref as React.Ref<HTMLAnchorElement>}
				href={disabled || loading ? undefined : safeHref}
				target={target}
				rel={finalRel}
				download={download}
				className={classNames}
				{...ariaAttributes}
				onClick={handleClick}
			>
				{renderButtonContent()}
			</a>
		);
	}

	// Handle button-specific props
	const {
		type = 'button',
		form,
		formAction,
		formMethod,
		formNoValidate,
		formTarget,
		...buttonProps
	} = restProps as unknown as ButtonAsButton;

	return (
		// Caller props first, computed props last — see the anchor branch.
		<button
			{...buttonProps}
			ref={ref as React.Ref<HTMLButtonElement>}
			type={type}
			disabled={disabled || loading}
			form={form}
			formAction={formAction}
			formMethod={formMethod}
			formNoValidate={formNoValidate}
			formTarget={formTarget}
			className={classNames}
			{...ariaAttributes}
		>
			{renderButtonContent()}
		</button>
	);

	// Render button content with icons and loading state
	function renderButtonContent() {
		// Show loading state
		if (loading) {
			return (
				<>
					{!useCursorLoading && (
						<span className={styles['button__loading-spinner']} aria-hidden="true">
							⏳
						</span>
					)}
					<span className={styles['button__text']}>{loadingText || children}</span>
				</>
			);
		}

		// Icon-only button
		if (iconOnly) {
			return <span className={styles['button__icon-only']}>{children}</span>;
		}

		// Button with icons
		return (
			<>
				{leftIcon && (
					<span className={styles['button__icon-left']} aria-hidden="true">
						{leftIcon}
					</span>
				)}
				<span className={styles['button__text']}>{children}</span>
				{rightIcon && (
					<span className={styles['button__icon-right']} aria-hidden="true">
						{rightIcon}
					</span>
				)}
			</>
		);
	}
});

ButtonRoot.displayName = 'Button';

/**
 * Ref element implied by the `as` discriminant, so a consumer writing
 * `useRef<HTMLButtonElement>(null)` assigns without a cast (issue #90).
 */
type ButtonRefFor<P> = P extends { as: 'a' } ? HTMLAnchorElement : HTMLButtonElement;

export const Button = ButtonRoot as <P extends ButtonProps>(
	props: P & { ref?: React.Ref<ButtonRefFor<P>> }
) => React.JSX.Element;

export default Button;
