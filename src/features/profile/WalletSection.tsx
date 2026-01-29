import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@utils/Constants';
import WalletItem from './WalletItem';

const WalletSection = () => {
  return (
    <View
      style={styles.walletContainer}
      accessibilityRole="menu"
      accessibilityLabel="Wallet options"
    >
      <WalletItem
        icon="wallet-outline"
        label="Wallet"
      />

      <WalletItem
        icon="chatbubble-ellipses-outline"
        label="Support"
      />

      <WalletItem
        icon="card-outline"
        label="Payments"
      />
    </View>
  );
};

export default memo(WalletSection);

const styles = StyleSheet.create({
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
});
