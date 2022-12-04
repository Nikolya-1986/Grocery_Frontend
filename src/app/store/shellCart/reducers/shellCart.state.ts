export interface ShellCartState {
    cartOpen: boolean;
};

export const initialShellCartState: ShellCartState = {
    cartOpen: false,
};

export interface DegaultShellCartState {
    cartGrocery: ShellCartState;
};