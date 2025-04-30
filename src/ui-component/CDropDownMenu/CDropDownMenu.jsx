import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

// ✅ Reusable Dropdown Menu Component
const CDropDownMenu = ({ buttonContent, items, placement = 'bottom' }) => {
  return (
    <Dropdown placement={placement}>
      <MenuButton>{buttonContent}</MenuButton>
      <Menu slots={{ listbox: AnimatedListbox }}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={(e) => {
              item.onClick?.(e);
              // Close menu by blurring the button (simulate outside click)
              e.currentTarget.closest('[role="menu"]')?.blur();
            }}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default CDropDownMenu;

// Styled MenuButton
const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#DAE2ED'};
  color: ${theme.palette.mode === 'dark' ? '#E5EAF2' : '#1C2025'};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '#303740' : '#F3F6F9'};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? '#99CCF3' : '#C2E0FF'};
  }
`,
);

// Styled MenuItem
const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? '#0072E6' : '#99CCF3'};
    background-color: ${theme.palette.mode === 'dark' ? '#303740' : '#F3F6F9'};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? '#434D5B' : '#B0B8C4'};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? '#004C99' : '#F0F7FF'};
    color: ${theme.palette.mode === 'dark' ? '#C2E0FF' : '#003A75'};
  }
`,
);

// Styled Animated Listbox
const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#DAE2ED'};
  color: ${theme.palette.mode === 'dark' ? '#E5EAF2' : '#1C2025'};
  box-shadow: 0 4px 30px ${theme.palette.mode === 'dark' ? '#1C2025' : '#DAE2ED'};
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }

  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
`,
);

// Transition wrapper
const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (!popupContext) {
    throw new Error('AnimatedListbox must be used within a Popup context.');
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});
