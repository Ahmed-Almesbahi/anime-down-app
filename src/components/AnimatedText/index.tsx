import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import Colors from '../../assets/colors';

interface Props {
  children: React.ReactNode;
  style?: any;
  type?: 'regular' | 'light' | 'medium' | 'bold';
}

const AnimatedText: React.FC<Props> = ({ children, style, type, ...props }) => {

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
    <Animated.Text
      {...props}
      style={[{ fontFamily: font }, styles.text, style]}
    >
      {children}
    </Animated.Text>
  )
}

export default AnimatedText;

const styles = StyleSheet.create({
  text: {
    color: Colors.textOnPrimary,
    textAlign: 'right',
    paddingBottom: 2
  },
});
