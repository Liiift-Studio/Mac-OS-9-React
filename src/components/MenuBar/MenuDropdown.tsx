import React, { useState, useEffect, useRef } from 'react';
import styles from './MenuBar.module.css';

export interface MenuDropdownProps {
    /**
     * Menu label (displayed in the menu bar/button)
     */
    label: React.ReactNode;

    /**
     * Menu items (content of the dropdown)
     */
    items: React.ReactNode;

    /**
     * Whether the menu is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Custom class name for the menu container
     */
    className?: string;

    /**
     * Custom class name for menu dropdown
     */
    dropdownClassName?: string;

    /**
     * Alignment of the dropdown menu
     * @default 'left'
     */
    align?: 'left' | 'right';
}

/**
 * Mac OS 9 style MenuDropdown component
 * 
 * A standalone dropdown menu that shares the styling of the MenuBar.
 * Useful for placing menus in the status area (rightContent) or other parts of the app.
 */
export const MenuDropdown: React.FC<MenuDropdownProps> = ({
    label,
    items,
    disabled = false,
    className = '',
    dropdownClassName = '',
    align = 'left',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close menu
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Handle Escape key to close menu
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const menuContainerClassNames = [
        styles.menuContainer,
        className
    ].filter(Boolean).join(' ');

    const menuButtonClassNames = [
        styles.menuButton,
        isOpen ? styles['menuButton--open'] : '',
        disabled ? styles['menuButton--disabled'] : '',
    ].filter(Boolean).join(' ');

    const dropdownClassNames = [
        styles.dropdown,
        align === 'right' ? styles['dropdown--right'] : '',
        dropdownClassName
    ].filter(Boolean).join(' ');

    return (
        <div ref={containerRef} className={menuContainerClassNames}>
            <button
                type="button"
                className={menuButtonClassNames}
                onClick={handleToggle}
                disabled={disabled}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-disabled={disabled}
            >
                {typeof label === 'string' ? <h3>{label}</h3> : label}
            </button>

            {isOpen && (
                <div
                    className={dropdownClassNames}
                    role="menu"
                    onClick={() => setIsOpen(false)} // Close when an item is clicked
                >
                    {items}
                </div>
            )}
        </div>
    );
};
