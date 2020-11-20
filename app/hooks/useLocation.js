import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

export default (shouldTrack, callback) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let watchId;
    const watchLocation = () => {
      watchId = Geolocation.watchPosition(
        callback,
        (error) => {
          console.log(error);
          setError(error);
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 },
      );
    };

    if (shouldTrack) watchLocation();
    else {
      Geolocation.clearWatch(watchId);
      watchId = null;
    }

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [shouldTrack, callback]);

  /**
   * useEffect looks at callback's memory if callback is new then it reruns
   */

  return [error];
};
