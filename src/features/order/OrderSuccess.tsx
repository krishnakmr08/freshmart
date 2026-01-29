import { StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import { screenWidth } from '@utils/Scaling';
import { Colors, Fonts } from '@utils/Constants';
import { useAuthStore } from '@state/authStore';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { replace } from '@utils/NavigationUtils';

const OrderSuccess: FC = () => {
  const { user } = useAuthStore();

  const hasNavigated = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigateToTracking = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    replace('LiveTracking');
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/animations/confirm.json')}
        autoPlay
        loop={false}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
        onAnimationFinish={() => {
          timeoutRef.current = setTimeout(navigateToTracking, 300);
        }}
      />

      <CustomText
        variant="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlaceText}
      >
        ORDER PLACED
      </CustomText>

      <View style={styles.deliveryContainer}>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={styles.deliveryText}
        >
          Delivery to Home
        </CustomText>
      </View>

      <CustomText
        variant="h8"
        style={styles.addressText}
        fontFamily={Fonts.Medium}
      >
        {user?.address || 'Delivery address not available'}
      </CustomText>
    </View>
  );
};

export default OrderSuccess;



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlaceText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.secondary,
  },
  addressText: {
    opacity: 0.8,
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
  },
});

