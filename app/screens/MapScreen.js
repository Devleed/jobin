import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Context as LocationContext } from '../context/locationContext';
import { Button } from '../native components';
import colors from '../colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MapScreen = () => {
  const { state, setLocation } = useContext(LocationContext);
  const [region, setRegion] = useState({
    longitude: state.location.longitude,
    latitude: state.location.latitude,
  });

  const mapRef = useRef(null);

  const saveLocation = async (coords) => {
    try {
      let position = JSON.stringify({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
      await AsyncStorage.setItem('@saved_location', position);
    } catch (error) {
      console.error(error);
    }
  };

  const animateToSavedLocation = async () => {
    let location = JSON.parse(await AsyncStorage.getItem('@saved_location'));

    mapRef.current.animateToRegion({
      longitude: location.longitude,
      latitude: location.latitude,
      longitudeDelta: 0.01,
      latitudeDelta: 0.01,
    });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        mapRef.current.animateToRegion({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        });
        saveLocation(position.coords);

        if (!position.coords) {
          animateToSavedLocation();
        }
      },
      (error) => {
        console.log(error);
        animateToSavedLocation();
      },
      { enableHighAccuracy: true, timeout: 20000 },
    );
  }, []);

  return (
    <View style={styles.container}>
      {!region ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            longitude: region.longitude,
            latitude: region.latitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }}
          onRegionChangeComplete={(region) => {
            setRegion(region);
          }}
        />
      )}
      <Button
        title="Set My Position"
        btnStyle={styles.btnStyle}
        mainColor={colors.primary}
        textColor="white"
        onPress={() => {}}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    height: height - 35,
    width,
  },
  container: {
    flex: 1,
  },
  btnStyle: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: width - 40,
    paddingVertical: 20,
  },
});
