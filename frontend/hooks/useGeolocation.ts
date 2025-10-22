'use client';

import { useEffect, useState } from 'react';

type Coordinates = { lat: number; lng: number } | null;

type GeoState = {
  position: Coordinates;
  loading: boolean;
  error?: string;
};

export function useGeolocation(): GeoState {
  const [state, setState] = useState<GeoState>({ position: null, loading: true });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ position: null, loading: false, error: 'Geolocation not supported' });
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (position) =>
        setState({
          position: { lat: position.coords.latitude, lng: position.coords.longitude },
          loading: false
        }),
      () => setState({ position: null, loading: false, error: 'Permission denied' })
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return state;
}
