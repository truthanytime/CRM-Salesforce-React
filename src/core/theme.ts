import { createTheme, alpha } from '@mui/material/styles';

const paletteTheme = createTheme({
  palette: {
    primary: {
      main: '#1554FF',
      dark: '#0052D2',
      subtone1: '#8CB9FF',
      subtone2: '#DBE9FF',
      subtone3: '#F4F9FF',
      subtone320: alpha('#F4F9FF', 0.2),
      subtone310: alpha('#F4F9FF', 0.1),
      gray: '#898EA1',
    },
    neutral: {
      main: '#1E232C',
      n400: '#868B98',
      n300: '#CDD2DF',
      n200: '#DBDCE0',
      darkBlueHigh: '#071731',
      darkBlueMedium: '#0E254A',
      white: '#FFFFFF',
      darkGray: '#9DA1B5',
      lightGray: '#E1E5ED',
    },
    darkBg: {
      main: '#F0F3F8',
    },
    lightBg: {
      main: '#F6F8FB',
    },
    green: {
      main: '#60C67C',
      light: '#DFF4E5',
    },
    mint: {
      main: '#00CEDB',
      light: '#E1F9FF',
    },
    sky: {
      main: '#29B6F6',
      light: '#E3F4FF',
    },
    red: {
      main: '#FB4E6D',
      light: '#F7E6EA',
    },
    orange: {
      main: '#FFA26D',
      light: '#F8E6DF',
    },
    yellow: {
      main: '#FFE600',
      light: '#FFFBD2',
    },
    violet: {
      main: '#AA00FF',
      light: '#EEDEFB',
    },
    purple: {
      main: '#7637FF',
      light: '#E9E4FB',
    },
    pink: {
      main: '#D500F9',
      light: '#F3DEFB',
    },
    blue: {
      main: '#1554FF',
    },
  },
});

const typographyTheme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: 32,
      lineHeight: '32px',
      fontWeight: 600,
    },
    h2: {
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: 600,
    },
    h3: {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
    },
    labelBold14: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 700,
    },
    labelMedium14: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 500,
    },
    labelMedium12: {
      fontSize: 12,
      lineHeight: '16px',
      fontWeight: 500,
    },
    labelRegular12: {
      fontSize: 12,
      lineHeight: '16px',
      fontWeight: 400,
    },
    labelRegular10: {
      fontSize: 10,
      lineHeight: '16px',
      fontWeight: 400,
    },
    p16: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 400,
    },
    p14: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 400,
    },
    p12: {
      fontSize: 12,
      lineHeight: '16px',
      fontWeight: 400,
    },
    b16: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 600,
    },
    b14: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 600,
    },
  },
});

const theme = createTheme({
  palette: paletteTheme.palette,
  typography: typographyTheme.typography,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          '&.MuiIconButton-edgeEnd': {
            paddingRight: 14,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          ...typographyTheme.typography.b14,
          height: 40,
          textTransform: 'none',
          borderRadius: 4,
          '&:hover': {
            backgroundColor: paletteTheme.palette.primary.dark,
            color: paletteTheme.palette.neutral.white,
          },
          '&:focused': {
            backgroundColor: paletteTheme.palette.primary.dark,
            color: paletteTheme.palette.neutral.white,
          },
          '&:disabled': {
            backgroundColor: paletteTheme.palette.lightBg.main,
            color: paletteTheme.palette.neutral.n300,
          },
          '&:active': {
            backgroundColor: paletteTheme.palette.primary.main,
            color: paletteTheme.palette.neutral.white,
          },
          '& .MuiButton-startIcon': {
            marginRight: 16,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          '& input': {
            height: 40,
            boxSizing: 'border-box',
            borderRadius: 4,
            padding: '8px 16px',
            '&::placeholder': {
              ...typographyTheme.typography.p14,
              color: paletteTheme.palette.neutral.n400,
              opacity: 1,
              fontWeight: 400,
            },
          },
          '& fieldset': {
            borderColor: paletteTheme.palette.neutral.n200,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root': {
            ...typographyTheme.typography.p14,
            '&:hover fieldset': {
              borderColor: paletteTheme.palette.primary.main,
            },
            '&.Mui-error fieldset': {
              borderColor: paletteTheme.palette.red.main,
            },
            '&.Mui-focused fieldset': {
              borderWidth: 1,
            },
            '&.Mui-disabled fieldset': {
              borderColor: paletteTheme.palette.lightBg.main,
            },
            '&.Mui-disabled input': {
              backgroundColor: paletteTheme.palette.lightBg.main,
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          ...typographyTheme.typography.p12,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...typographyTheme.typography.labelRegular12,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: paletteTheme.palette.neutral.n200,
          ...typographyTheme.typography.p12,
          '& .MuiDivider-wrapper': {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...typographyTheme.typography.p14,
          height: 32,
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        disableClearable: true,
      },
      styleOverrides: {
        root: {
          '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
            height: 40,
            paddingTop: 0,
            paddingBottom: 0,
          },
          '& .MuiAutocomplete-endAdornment': {
            marginRight: 10,
            marginTop: 2,
          },
          ':hover svg path, &.Mui-focused svg path': {
            fill: '#1554FF',
            stroke: '#1554FF',
          },
          '& .MuiAutocomplete-clearIndicator': {
            marginRight: -8,
            '& svg rect': {
              fill: '#1554FF',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          '&.MuiSelect-iconOpen path': {
            fill: '#1554FF',
            stroke: '#1554FF',
          },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          ...typographyTheme.typography.p12,
          paddingTop: 16,
          paddingBottom: 8,
          height: 40,
          color: '#898EA1',
          position: 'inherit',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: 'white',
          backgroundColor: '#0D2045',
        },
        arrow: {
          color: '#0D2045',
        },
      },
    },
  },
});

export default theme;
