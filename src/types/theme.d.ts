// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    darkBg: Palette['primary'];
    lightBg: Palette['primary'];
    green: Palette['primary'];
    mint: Palette['primary'];
    sky: Palette['primary'];
    red: Palette['primary'];
    orange: Palette['primary'];
    yellow: Palette['primary'];
    violet: Palette['primary'];
    purple: Palette['primary'];
    pink: Palette['primary'];
    blue: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    darkBg: PaletteOptions['primary'];
    lightBg: PaletteOptions['primary'];
    green: PaletteOptions['primary'];
    mint: PaletteOptions['primary'];
    sky: PaletteOptions['primary'];
    red: PaletteOptions['primary'];
    orange: PaletteOptions['primary'];
    yellow: PaletteOptions['primary'];
    violet: PaletteOptions['primary'];
    purple: PaletteOptions['primary'];
    pink: PaletteOptions['primary'];
    blue: PaletteOptions['primary'];
  }

  interface PaletteColor {
    subtone1?: string;
    subtone2?: string;
    subtone3?: string;
    subtone320?: string;
    subtone310?: string;
    n400?: string;
    n300?: string;
    n200?: string;
    darkBlueHigh?: string;
    darkBlueMedium?: string;
    n400?: string;
    dark?: string;
    white?: string;
    gray?: string;
    darkGray?: string;
    lightGray?: string;
  }
  interface SimplePaletteColorOptions {
    subtone1?: string;
    subtone2?: string;
    subtone3?: string;
    subtone320?: string;
    subtone310?: string;
    n400?: string;
    n300?: string;
    n200?: string;
    darkBlueHigh?: string;
    darkBlueMedium?: string;
    n400?: string;
    dark?: string;
    white?: string;
    gray?: string;
    darkGray?: string;
    lightGray?: string;
  }

  export interface TypographyVariants {
    labelBold14: React.CSSProperties;
    labelMedium14: React.CSSProperties;
    labelMedium12: React.CSSProperties;
    labelRegular12: React.CSSProperties;
    labelRegular10: React.CSSProperties;
    p16: React.CSSProperties;
    p14: React.CSSProperties;
    p12: React.CSSProperties;
    b16: React.CSSProperties;
    b14: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    labelBold14?: React.CSSProperties;
    labelMedium14?: React.CSSProperties;
    labelMedium12?: React.CSSProperties;
    labelRegular12?: React.CSSProperties;
    labelRegular10?: React.CSSProperties;
    p16?: React.CSSProperties;
    p14?: React.CSSProperties;
    p12?: React.CSSProperties;
    b16?: React.CSSProperties;
    b14?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    labelBold14: true;
    labelMedium14: true;
    labelMedium12: true;
    labelRegular12: true;
    labelRegular10: true;
    p16: true;
    p14: true;
    p12: true;
    b16: true;
    b12: true;
  }
}
