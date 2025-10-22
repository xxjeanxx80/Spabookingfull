import { useState } from 'react';

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error?: string;
  loading: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<LocationState>({ latitude: null, longitude: null, loading: false });

  const locate = () => {
    if (!navigator.geolocation) {
      setState({ latitude: null, longitude: null, loading: false, error: 'Geolocation is not supported.' });
      return;
    }
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
        });
      },
      (error) => {
        setState({
          latitude: null,
          longitude: null,
          loading: false,
          error: error.message ?? 'Unable to fetch location',
        });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return { ...state, locate };
};
