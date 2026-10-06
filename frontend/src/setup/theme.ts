import "@fontsource-variable/inter";
import { css } from "@emotion/react";
import { extendTheme } from "@mui/joy/styles";
import { Link } from "@tanstack/react-router";

declare module "@mui/joy/styles" {
  interface Palette {
    gradient: {
      faded: string;
      full: string;
    };
  }
}

declare module "@mui/joy/Alert" {
  interface AlertPropsVariantOverrides {
    gradient: true;
  }
}

declare module "@mui/joy/ModalDialog" {
  interface ModalDialogPropsVariantOverrides {
    gradient: true;
  }
}

declare module "@mui/joy/Sheet" {
  interface SheetPropsVariantOverrides {
    gradient: true;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        gradient: {
          full: "linear-gradient(60deg, #ffba00 15%, #84bd00 50%, #28939c 85%)",
          faded: "linear-gradient(60deg, #fefcf4 15%, #f8fcf4 50%, #f5f9fa 85%)",
        },
        neutral: {
          // 50: '#ebebeb',
          // 100: '#cccccc',
          // 200: '#aaaaaa',
          // 300: '#888888',
          // 400: '#6f6f6f',
          // 500: '#555555',
          // 600: '#4e4e4e',
          // 700: '#444444',
          // 800: '#3b3b3b',
          // 900: '#2a2a2a',
        },
      },
    },
  },

  fontFamily: {
    display: "Inter Variable, var(--joy-fontFamily-fallback)",
    body: "Inter Variable, var(--joy-fontFamily-fallback)",
  },

  components: {
    JoyAlert: {
      defaultProps: {
        variant: "gradient",
        size: "lg",
      },
      styleOverrides: {
        root: ({ theme: innerTheme, ownerState }) => {
          if (ownerState.variant === "gradient") {
            return css`
              border: ${innerTheme.vars.palette.neutral.outlinedBorder} 1px solid;
              border-radius: ${innerTheme.vars.radius.xl};
              background: ${innerTheme.vars.palette.gradient.faded};
              padding: ${innerTheme.spacing(4)} ${innerTheme.spacing(4)};
            `;
          }

          return undefined;
        },
      },
    },
    JoyButton: {
      defaultProps: {
        variant: "outlined",
        color: "neutral",
      },
    },
    JoyFormControl: {
      defaultProps: {
        size: "lg",
      },
    },
    JoyModalDialog: {
      defaultProps: {
        variant: "gradient",
      },
      styleOverrides: {
        root: ({ theme: innerTheme, ownerState }) => {
          if (ownerState.variant === "gradient") {
            return css`
              background: ${innerTheme.vars.palette.gradient.faded};
            `;
          }

          return undefined;
        },
      },
    },
    JoyLink: {
      defaultProps: {
        component: Link,
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: css`
          --ListItem-radius: 8px;
        `,
      },
    },
    JoySheet: {
      defaultProps: {
        variant: "gradient",
      },
      styleOverrides: {
        root: ({ theme: innerTheme, ownerState }) => {
          if (ownerState.variant === "gradient") {
            return css`
              background: ${innerTheme.vars.palette.gradient.faded};
              border: ${innerTheme.vars.palette.neutral.outlinedBorder} 1px solid;
              border-radius: ${innerTheme.vars.radius.xl};
              margin-bottom: ${innerTheme.spacing(2)};
            `;
          }

          return undefined;
        },
      },
    },
    JoyTable: {
      defaultProps: {
        hoverRow: true,
      },
      styleOverrides: {
        root: ({ theme: overridesTheme }) => css`
          table-layout: initial;
          --TableCell-headBackground: transparent;
          --TableRow-hoverBackground: ${overridesTheme.vars.palette.common.white};
          --TableCell-paddingX: 24px;
          --TableCell-paddingY: 8px;
          --Table-headerUnderlineThickness: 1px;
        `,
      },
    },
  },
});
