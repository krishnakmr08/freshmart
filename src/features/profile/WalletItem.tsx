import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { IconProps } from 'react-native-vector-icons/Icon';
import { RFValue } from 'react-native-responsive-fontsize';

import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';

/* ================= TYPES ================= */

interface WalletItemProps {
  icon: IconProps['name']; // ✅ strongly typed icon
  label: string;
}

/* ================= COMPONENT ================= */

const WalletItem: FC<WalletItemProps> = ({ icon, label }) => {
  return (
    <View
      style={styles.walletItemContainer}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      <Icon
        name={icon}
        color={Colors.text}
        size={RFValue(20)}
      />

      <CustomText
        variant="h8"
        fontFamily={Fonts.Medium}
      >
        {label}
      </CustomText>
    </View>
  );
};

export default memo(WalletItem);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  walletItemContainer: {
    alignItems: 'center',
    gap: 6,
  },
});
