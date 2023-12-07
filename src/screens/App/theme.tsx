import { DarkTheme, DefaultTheme } from 'react-native-paper';

const fonts = {
  web: {
    regular: {
      fontFamily: 'regular, Tahoma, sans-serif',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'medium, Tahoma, sans-serif',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'light, Tahoma, sans-serif',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'light, Tahoma, sans-serif',
      fontWeight: '100' as '100',
    }
  }, default: {
    regular: {
      fontFamily: 'regular',
    },
    medium: {
      fontFamily: 'medium',
    },
    light: {
      fontFamily: 'light',
    },
    thin: {
      fontFamily: 'light',
    }
  }
}

export const theme = {
  // ...DarkTheme,
  ...DefaultTheme,
  roundness: 25,
  colors: {
    // ...DarkTheme.colors,
    ...DefaultTheme.colors,
    primary: '#3b0e85',
    accent: 'white',
    placeholder: '#afafaf'
  },
  fonts: fonts,
  style: { marginBottom: 10 }
}








// primary: '#3b0e85',
// secondary: 'white',
// green: '#2bfead',
// yellow: '#febb2c',
// red: '#fc191c',
// grey: 'rgba(0, 0, 0, .7)',
// pink: '#f628fc',
// black: '#1d1d1d'


// import color from 'color';
// import { black, white, pinkA400 } from './colors';
// import configureFonts from './fonts';

// const DefaultTheme = {
//   dark: false,
//   roundness: 4,
//   colors: {
//     primary: '#6200ee',
//     accent: '#03dac4',
//     background: '#f6f6f6',
//     surface: white,
//     error: '#B00020',
//     text: black,
//     onBackground: '#000000',
//     onSurface: '#000000',
//     disabled: color(black)
//       .alpha(0.26)
//       .rgb()
//       .string(),
//     placeholder: color(black)
//       .alpha(0.54)
//       .rgb()
//       .string(),
//     backdrop: color(black)
//       .alpha(0.5)
//       .rgb()
//       .string(),
//     notification: pinkA400,
//   },
//   fonts: configureFonts(),
//   animation: {
//     scale: 1.0,
//   },
// };