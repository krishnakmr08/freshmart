import axios from 'axios';
import { GOOGLE_MAP_API } from './config';
import { updateUserLocation } from './authService';

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
  setUser: any,
) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          latlng: `${latitude},${longitude}`,
          key: GOOGLE_MAP_API,
        },
      },
    );

    console.log(response);
    if (response.data.status === 'OK' && response.data.results?.length > 0) {
      const address = response.data.results[0].formatted_address;

      updateUserLocation(
        { liveLocation: { latitude, longitude }, address },
        setUser,
      );
    }
  } catch (error) {
    console.error('Reverse geocode failed', error);
  }
};
