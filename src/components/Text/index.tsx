import React from 'react';
import { Text as Text_, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../assets/colors';

interface Props {
  children: React.ReactNode;
  style?: any;
  type?: 'regular' | 'light' | 'medium' | 'bold';
  navigate?: any;
}

const Text: React.FC<Props> = ({ children, style, type, navigate, ...props }) => {

  const fontType = (type) => {
    switch (type) {
      case 'regular':
        return 'Regular';
      case 'light':
        return 'Light';
      case 'medium':
        return 'Medium';
      case 'bold':
        return 'Bold';
      default:
        return 'Regular';

    }
  }
  const font = fontType(type ? type : 'normal')

  return (
    <>
      {navigate !== undefined
        ? <TouchableOpacity
          onPress={() => {
            navigate
          }}
        >
          <Text_
            {...props}
            style={[{ fontFamily: font }, styles.textButton, style]}
          >
            {children}
          </Text_>
        </TouchableOpacity>
        : <Text_
          {...props}
          style={[{ fontFamily: font }, styles.text, style]}
        >
          {children}
        </Text_>
      }
    </>
  )
}


export default Text;

const styles = StyleSheet.create({
  text: {
    color: Colors.surface,
    textAlign: 'right',
    paddingBottom: 2
  },
  textButton: {
    color: Colors.quinary,
    textAlign: 'right',
    paddingBottom: 2
  },
});

// Text_.defaultProps = {
//   navigate: ''
// }