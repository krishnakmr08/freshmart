import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useAuthStore } from '@state/authStore';
import { useCartStore } from '@state/cartStore';
import { fetchCustomerOrders } from '@services/orderService';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { storage, tokenStorage } from '@state/storage';

import CustomHeader from '@components/ui/CustomHeader';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

import ActionButton from './ActionButton';
import WalletSection from './WalletSection';
import ProfileOrderItem from './ProfileOrderItem';
import { Order } from 'types/order';

/* ================= COMPONENT ================= */

const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const { logout, user } = useAuthStore();
  const { clearCart } = useCartStore();

  /* ================= FETCH ORDERS ================= */

  const fetchOrders = useCallback(async () => {
    if (!user?._id) return;

    try {
      const data = await fetchCustomerOrders(user._id);
      setOrders(data);
    } catch (error) {
      console.log('Failed to fetch orders', error);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    clearCart();
    logout();
    tokenStorage.clearAll();
    storage.clearAll();
    resetAndNavigate('CustomerLogin');
  };

  /* ================= HEADER ================= */

  const renderHeader = () => (
    <View>
      <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
        Your account
      </CustomText>

      <CustomText variant="h7" fontFamily={Fonts.Medium}>
        {user?.phone}
      </CustomText>

      <WalletSection />

      <CustomText variant="h8" style={styles.informativeText}>
        YOUR INFORMATION
      </CustomText>

      <ActionButton icon="book-outline" label="Address book" />
      <ActionButton icon="information-circle-outline" label="About us" />
      <ActionButton
        icon="log-out-outline"
        label="Logout"
        onPress={handleLogout}
      />

      <CustomText variant="h8" style={styles.pastText}>
        PAST ORDERS
      </CustomText>
    </View>
  );

  /* ================= RENDER ITEM ================= */

  const renderOrders = useCallback(
    ({ item, index }: { item: Order; index: number }) => (
      <ProfileOrderItem item={item} index={index} />
    ),
    [],
  );

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />

      <FlatList
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={item => item.orderId}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Profile;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  informativeText: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastText: {
    marginVertical: 20,
    opacity: 0.7,
  },
});
