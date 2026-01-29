import CustomText from '@components/ui/CustomText';
import { useNavigationState } from '@react-navigation/native';
import { SOCKET_URL } from '@services/config';
import { useAuthStore } from '@state/authStore';
import { hocStyles } from '@styles/GlobalStyles';
import { Colors, Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import React, { FC, useEffect, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { io, Socket } from 'socket.io-client';

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = props => {
    const currentOrder = useAuthStore(state => state.currentOrder);
    const setCurrentOrder = useAuthStore(state => state.setCurrentOrder);

    const socketRef = useRef<Socket | null>(null);

    const routeName = useNavigationState(
      state => state.routes[state.index]?.name,
    );

    useEffect(() => {
      if (!currentOrder?._id) return;

      socketRef.current = io(SOCKET_URL, {
        transports: ['websocket'],
        withCredentials: true,
      });

      socketRef.current.emit('joinRoom', currentOrder._id);

      socketRef.current.on('liveTrackingUpdates', order => {
        setCurrentOrder(order);
      });

      socketRef.current.on('orderConfirmed', order => {
        setCurrentOrder(order);
      });

      return () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
      };
    }, [currentOrder?._id, setCurrentOrder]);

    // Safe UI helpers
    const firstItemName =
      currentOrder?.items?.[0]?.item?.name ?? 'Items';

    const extraItems =
      currentOrder?.items && currentOrder.items.length > 1
        ? ` and ${currentOrder.items.length - 1}+ items`
        : '';

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />

        {currentOrder && routeName === 'ProductDashboard' && (
          <View
            style={[
              hocStyles.cartContainer,
              { flexDirection: 'row', alignItems: 'center' },
            ]}
          >
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={{ width: 20, height: 20 }}
                />
              </View>

              <View style={{ width: '68%' }}>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  Order is {currentOrder.status}
                </CustomText>

                <CustomText variant="h9" fontFamily={Fonts.Medium}>
                  {firstItemName}
                  {extraItems}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigate('LiveTracking')}
              style={styles.btn}
            >
              <CustomText
                fontFamily={Fonts.Medium}
                variant="h8"
                style={{ color: Colors.secondary }}
              >
                View
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return React.memo(WithLiveStatusComponent);
};

export default withLiveStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});
