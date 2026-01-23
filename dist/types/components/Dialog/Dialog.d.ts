import React from 'react';
import { type WindowProps } from '../Window/Window';
export interface DialogProps extends Omit<WindowProps, 'active'> {
    /**
     * Whether the dialog is open
     * @default false
     */
    open?: boolean;
    /**
     * Callback when dialog should close
     * Called when backdrop is clicked or Escape is pressed
     */
    onClose?: () => void;
    /**
     * Whether clicking the backdrop closes the dialog
     * @default true
     */
    closeOnBackdropClick?: boolean;
    /**
     * Whether pressing Escape closes the dialog
     * @default true
     */
    closeOnEscape?: boolean;
    /**
     * Custom backdrop className
     */
    backdropClassName?: string;
    /**
     * Whether to trap focus within the dialog
     * @default true
     */
    trapFocus?: boolean;
    /**
     * Initial focus element selector or ref
     */
    initialFocus?: string | React.RefObject<HTMLElement>;
}
/**
 * Mac OS 9 style Dialog component
 *
 * Modal dialog with backdrop, focus trapping, and keyboard handling.
 * Built on top of the Window component.
 *
 * Features:
 * - Classic Mac OS 9 dialog styling
 * - Modal backdrop with click-to-close
 * - Escape key to close
 * - Focus trapping within dialog
 * - Centered on screen
 * - Prevents body scroll when open
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm"
 *   width={350}
 * >
 *   <p>Are you sure?</p>
 *   <div>
 *     <Button onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="primary">OK</Button>
 *   </div>
 * </Dialog>
 * ```
 */
export declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;
export default Dialog;
