import { create } from 'zustand';
import type MapView from 'react-native-maps';
import type { RefObject } from 'react';

interface MapRefStore {
  mapRef: RefObject<MapView | null> | null;
  setMapRef: (ref: RefObject<MapView | null>) => void;
}

export const useMapRefStore = create<MapRefStore>(set => ({
  mapRef: null,
  setMapRef: ref => set({ mapRef: ref }),
}));
