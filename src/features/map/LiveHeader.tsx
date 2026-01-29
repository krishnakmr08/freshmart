import { Pressable, StyleSheet, View } from 'react-native';
import React, { FC, useCallback, useRef } from 'react';
import { useAuthStore } from '@state/authStore';
import { navigate } from '@utils/NavigationUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LiveHeaderProps {
  type: 'Customer' | 'Delivery';
  title: string;
  secondTitle: string;
}

const LiveHeader: FC<LiveHeaderProps> = ({ type, title, secondTitle }) => {
  const isCustomer = type === 'Customer';
  const insets = useSafeAreaInsets();
  const isNavigatingRef = useRef(false);

  const currentOrderStatus = useAuthStore(
    state => state.currentOrder?.status,
  );
  const setCurrentOrder = useAuthStore(state => state.setCurrentOrder);

  const handleBackPress = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    if (isCustomer) {
      if (currentOrderStatus === 'delivered') {
        setCurrentOrder(null);
      }
      navigate('ProductDashboard');
    } else {
      navigate('DeliveryDashboard');
    }

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  }, [isCustomer, currentOrderStatus, setCurrentOrder]);

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: insets.top + 10 },
      ]}
    >
      <Pressable style={styles.backButton} onPress={handleBackPress}>
        <Icon
          name="chevron-back"
          size={RFValue(16)}
          color={isCustomer ? '#fff' : '#000'}
        />
      </Pressable>

      <CustomText
        variant="h8"
        fontFamily={Fonts.Medium}
        style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
      >
        {title}
      </CustomText>

      <CustomText
        variant="h4"
        fontFamily={Fonts.SemiBold}
        style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
      >
        {secondTitle}
      </CustomText>
    </View>
  );
};

export default React.memo(LiveHeader);

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  titleTextBlack: {
    color: 'black',
  },
  titleTextWhite: {
    color: 'white',
  },
});
