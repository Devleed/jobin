import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = (props) => {
  const [coords, setCoords] = useState(props.region);

  useEffect(() => {
    mapRef.current.animateToRegion(props.region);
  }, [props.region]);

  const mapRef = useRef(null);

  return (
    <MapView
      ref={mapRef}
      style={{ height: props.height, width: props.width }}
      initialRegion={coords}
      onRegionChangeComplete={(region) =>
        setCoords({
          ...coords,
          longitude: region.longitude,
          latitude: region.latitude,
        })
      }
    >
      <Marker
        coordinate={{
          longitude: props.region.longitude,
          latitude: props.region.latitude,
        }}
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
