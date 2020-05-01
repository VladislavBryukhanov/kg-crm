export interface UiUtilsState {
  snackbar: SnackBar;
}

export interface SnackBar {
  message: string;
  duration?: number;
  isDisplayed?: boolean;
}