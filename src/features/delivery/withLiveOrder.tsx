import React, { FC, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import type { LatLng } from 'react-native-maps';

import { Colors, Fonts } from '@utils/Constants';
import { useAuthStore } from '@state/authStore';
import { sendLiveOrderUpdates } from '@services/orderService';
import { hocStyles } from '@styles/GlobalStyles';
import { navigate } from '@utils/NavigationUtils';

import CustomText from '@components/ui/CustomText';

const withLiveOrder = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const LiveOrderWrapper: FC<P> = props => {
    const { currentOrder, user } = useAuthStore();
    const [myLocation, setMyLocation] = useState<LatLng | null>(null);

    /* ================= LOCATION TRACKING ================= */

    useEffect(() => {
      if (
        !currentOrder ||
        currentOrder.deliveryPartner?._id !== user?._id
      ) {
        return;
      }

      const watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setMyLocation({ latitude, longitude });
        },
        error => {
          console.log('Location error:', error);
        },
        {
          enableHighAccuracy: false,
          distanceFilter: 200,
        },
      );

      return () => Geolocation.clearWatch(watchId);
    }, [currentOrder, user?._id]);

    /* ================= SEND LIVE UPDATES ================= */

    useEffect(() => {
      if (
        !myLocation ||
        !currentOrder ||
        currentOrder.deliveryPartner?._id !== user?._id ||
        currentOrder.status === 'delivered' ||
        currentOrder.status === 'cancelled'
      ) {
        return;
      }

      sendLiveOrderUpdates(
        currentOrder._id,     // ✅ FIXED
        myLocation,
        currentOrder.status,
      );
    }, [myLocation, currentOrder, user?._id]);

    /* ================= UI ================= */

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />

        {currentOrder && (
          <View style={[hocStyles.cartContainer, styles.bottomBar]}>
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={styles.icon}
                />
              </View>

              <View style={styles.info}>
                <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
                  #{currentOrder.orderId}
                </CustomText>
                <CustomText variant="h9" fontFamily={Fonts.Medium}>
                  {currentOrder.deliveryLocation?.address}
                </CustomText>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  navigate('DeliveryMap', {
                    orderId: currentOrder.orderId,
                  })
                }
              >
                <CustomText
                  variant="h8"
                  fontFamily={Fonts.Medium}
                  style={{ color: Colors.secondary }}
                >
                  Continue
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return LiveOrderWrapper;
};

export default withLiveOrder;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  info: {
    width: '62%',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});
