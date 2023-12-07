import { Dimensions } from 'react-native';

// const useWindowSize = () => {
//   const [size, setSize] = React.useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }

const X_SMALL = 590
const SMALL = 840
const MEDIUM = 1090
const LARGE = 1440
const X_LARGE = 1690
const XX_LARGE = 1940
const XXX_LARGE = 2190


const Dimensions_ = () => {

  let window = {}
  // const height = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width
  window.width = windowWidth

  if (windowWidth <= X_SMALL) {
    window.widthName = 'xsmall'
  }
  else if (windowWidth > X_SMALL && windowWidth <= SMALL) {
    window.widthName = 'small'
  }
  else if (windowWidth > SMALL && windowWidth <= MEDIUM) {
    window.widthName = 'medium'
  }
  else if (windowWidth > MEDIUM && windowWidth <= LARGE) {
    window.widthName = 'large'
  }
  else if (windowWidth > LARGE && windowWidth <= X_LARGE) {
    window.widthName = 'xlarge'
  }
  else if (windowWidth > X_LARGE && windowWidth <= XX_LARGE) {
    window.widthName = 'xxlarge'
  }
  else if (windowWidth > XX_LARGE && windowWidth <= XXX_LARGE) {
    window.widthName = 'xxxlarge'
  }
  else if (windowWidth > XXX_LARGE) {
    window.widthName = 'largest'
  }
  window.isIsmallScreenOrSmaller = windowWidth <= SMALL
  return window;
}

export default Dimensions_;