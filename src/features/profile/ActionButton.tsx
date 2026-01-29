import React, { FC, memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { IconProps } from 'react-native-vector-icons/Icon';

import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

/* ================= TYPES ================= */

interface ActionButtonProps {
  icon: IconProps['name']; // ✅ typed icon names
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}

/* ================= COMPONENT ================= */

const ActionButton: FC<ActionButtonProps> = ({
  icon,
  label,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={icon}
          color={Colors.text}
          size={RFValue(14)}
        />
      </View>

      <CustomText
        variant="h7"
        fontFamily={Fonts.Medium}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

export default memo(ActionButton);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 100,
    backgroundColor: Colors.backgroundSecondary,
  },
});
