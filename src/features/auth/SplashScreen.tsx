import { Alert, Image, StyleSheet, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import Logo from '@assets/images/icon.png';
import { screenHeight, screenWidth } from '@utils/Scaling';
import { resetAndNavigate } from '@utils/NavigationUtils';
import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { jwtDecode } from 'jwt-decode';
import { refetchUser, refresh_tokens } from '@service/authService';
import { Colors } from '@utils/Constants';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const { setUser } = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken');

    const refreshToken = tokenStorage.getString('refreshToken');

    if (!accessToken || !refreshToken) {
      resetAndNavigate('CustomerLogin');
      return;
    }

    try {
      const currentTime = Date.now() / 1000;

      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      if (decodedRefreshToken.exp < currentTime) {
        Alert.alert('Session Expired', 'Please login again');
        resetAndNavigate('CustomerLogin');
        return;
      }

      if (decodedAccessToken.exp < currentTime) {
        await refresh_tokens();
      }

      const user = await refetchUser(setUser);

      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error refreshing token');
      resetAndNavigate('CustomerLogin');
    }
  };

  useEffect(() => {
    const initialStartup = async () => {
      try {
        GeoLocation.requestAuthorization();
        await tokenCheck();
      } catch {
        Alert.alert(
          'Sorry we need location service to give you better shopping experience',
        );
      }
    };

    const timeoutId = setTimeout(initialStartup, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.active,
  },
  logoImage: {
    height: screenHeight * 0.8,
    width: screenWidth * 0.8,
    resizeMode: 'contain',
  },
});
