import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomInputProps {
  left: React.ReactNode;
  onClear?: () => void;
  right?: boolean;
}

const CustomInput: FC<
  CustomInputProps & React.ComponentProps<typeof TextInput>
> = ({ left, onClear, right, value, ...inputProps }) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.left}>{left}</View>

      <TextInput
        {...inputProps}
        value={value}
        style={styles.inputContainer}
        placeholderTextColor="#ccc"
      />

      {right && !!value && (
        <TouchableOpacity onPress={onClear} style={styles.icon}>
          <Icon name="close-circle-sharp" size={RFValue(16)} color="#ccc" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },

  left: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    flex: 1,
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    color: Colors.text,
  },

  icon: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
