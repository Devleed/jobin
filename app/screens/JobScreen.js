import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Octicon from 'react-native-vector-icons/dist/Octicons';

import {Context as JobContext} from '../context/cardContext';
import {Context as LocationContext} from '../context/locationContext';

import {Text} from '../native components';
import Deck from '../components/Deck';
import Card from '../components/Card';
import Map from '../components/Map';
import colors from '../colors';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const JobScreen = ({navigation}) => {
  const {state: jobState, loadCards, deleteCard, addToFavourites} = useContext(
    JobContext,
  );
  const {state: locationState} = useContext(LocationContext);

  const [mapCoords, setMapCoords] = useState(null);
  const [filterScreenVisible, setFilterScreenVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const scaleFilterOptions = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      if (filterScreenVisible) {
        animateFilterScreen(1);
        setFilterScreenVisible(false);
      }
    }, [filterScreenVisible]),
  );

  const renderCardItem = (item, index) => {
    return <Card item={item} />;
  };

  useEffect(() => {
    let opts = {
      startId: 1,
      limit: 2,
      location: {
        long: locationState.location.longitude,
        lat: locationState.location.latitude,
      },
    };
    loadCards(opts, () => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (jobState.jobList[0]) {
      setMapCoords({
        longitude: jobState.jobList[0].location.longitude,
        latitude: jobState.jobList[0].location.latitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01,
      });
    }
  }, [jobState.jobList]);

  const onSwipeComplete = (direction) => {
    if (direction === 'right') {
      addToFavourites(jobState.jobList[0]);
    }
    deleteCard(jobState.jobList[0].id);
    let opts = {
      startId: Number(jobState.jobList[0].id) + 2,
      limit: 1,
      location: {
        long: locationState.location.longitude,
        lat: locationState.location.latitude,
      },
    };
    loadCards(opts);
  };

  const animateFilterScreen = (value) => {
    Animated.timing(scaleFilterOptions, {
      toValue: value,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{flex: 1}}
      />
    );

  return (
    <>
      <Animated.View
        style={[styles.optionsBtn, {transform: [{scale: scaleFilterOptions}]}]}
      />
      <TouchableOpacity
        style={styles.optionsBtn}
        onPress={() => {
          if (filterScreenVisible) {
          } else {
            animateFilterScreen(30);
            setFilterScreenVisible(true);
            navigation.navigate('JobFilters');
          }
        }}>
        <Octicon name="settings" color="black" size={24} />
      </TouchableOpacity>
      {mapCoords ? (
        <Map
          region={mapCoords}
          height={HEIGHT * 0.6}
          width={WIDTH}
          draggable={false}
        />
      ) : null}
      <View>
        {jobState.jobList.length ? (
          <Deck
            data={jobState.jobList}
            renderCard={renderCardItem}
            onSwipeComplete={onSwipeComplete}
          />
        ) : (
          <Text h3 style={styles.finishText} color={colors.primary}>
            no more jobs in this area
          </Text>
        )}
      </View>
    </>
  );
};

export default JobScreen;

const styles = StyleSheet.create({
  optionsBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 5000,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  finishText: {
    textAlign: 'center',
    marginTop: 70,
    width: '80%',
    alignSelf: 'center',
  },
});
