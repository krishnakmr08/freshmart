import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TextProps,
  StyleProp,
  LayoutChangeEvent,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, Fonts } from '@utils/Constants';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8'
  | 'h9'
  | 'body';

interface CustomTextProps extends TextProps {
  variant?: Variant;
  fontFamily?: Fonts;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const FONT_SIZES = {
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
  h7: 12,
  h8: 10,
  h9: 9,
  body: 12,
};

const CustomText: FC<CustomTextProps> = ({
  variant = 'body',
  fontFamily = Fonts.Regular,
  fontSize,
  style,
  children,
  ...textProps
}) => {
  const computedFontSize = RFValue(fontSize ?? FONT_SIZES[variant]);

  return (
    <Text
      {...textProps}
      style={[
        styles.text,
        {
          color: Colors.text,
          fontSize: computedFontSize,
          fontFamily,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
