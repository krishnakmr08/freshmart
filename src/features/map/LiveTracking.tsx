import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';

const LiveTracking = () => {
  const currentOrder = useAuthStore(state => state.currentOrder);

  if (!currentOrder) return null;

  const { title, subtitle } = useMemo(() => {
    switch (currentOrder.status) {
      case 'confirmed':
        return {
          title: 'Arriving soon',
          subtitle: 'Arriving in 8 minutes',
        };
      case 'arriving':
        return {
          title: 'Order Picked up',
          subtitle: 'Arriving in 6 minutes',
        };
      case 'delivered':
        return {
          title: 'Order Delivered',
          subtitle: 'Fastest Delivery ⚡️',
        };
      default:
        return {
          title: 'Packing your order',
          subtitle: 'Arriving in 10 minutes',
        };
    }
  }, [currentOrder.status]);

  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={title} secondTitle={subtitle} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LiveMap
          deliveryLocation={currentOrder.deliveryLocation}
          pickupLocation={currentOrder.pickupLocation}
          hasAccepted={currentOrder.status === 'confirmed'}
          hasPickedUp={currentOrder.status === 'arriving'}
          deliveryPersonLocation={currentOrder.deliveryPersonLocation}
        />

        {/* Delivery Partner */}
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name={currentOrder.deliveryPartner ? 'phone' : 'shopping'}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>

          <View style={{ width: '82%' }}>
            <CustomText numberOfLines={1} variant="h7" fontFamily={Fonts.SemiBold}>
              {currentOrder.deliveryPartner?.name ||
                'We will soon assign a delivery partner'}
            </CustomText>

            {currentOrder.deliveryPartner && (
              <CustomText variant="h7" fontFamily={Fonts.Medium}>
                {currentOrder.deliveryPartner.phone}
              </CustomText>
            )}

            <CustomText variant="h9" fontFamily={Fonts.Medium}>
              {currentOrder.deliveryPartner
                ? 'For delivery instructions you can contact here'
                : title}
            </CustomText>
          </View>
        </View>

        <DeliveryDetails details={currentOrder.customer} />

        <OrderSummary order={currentOrder} />

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name="cards-heart-outline"
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>

          <View style={{ width: '82%' }}>
            <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
              Do you like our app?
            </CustomText>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              Hit Like and subscribe! If you’re enjoying, comment your excitement
            </CustomText>
          </View>
        </View>

        <CustomText
          fontFamily={Fonts.SemiBold}
          variant="h6"
          style={{ opacity: 0.6, marginTop: 20 }}
        >
          Krishna Kumar x Blinkit
        </CustomText>
      </ScrollView>
    </View>
  );
};

export default React.memo(LiveTracking);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
