import React, { useRef, useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import ZocialIcon from 'react-native-vector-icons/dist/Zocial';

import { Context as AuthContext } from '../context/authContext';

import { Text, Button, Spacer } from '../native components';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const WelcomeScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { googleSignIn } = useContext(AuthContext);

  const welcomeItems = [
    { text: 'hello, welcome to Jobin', color: '#ca2e2e' },
    {
      text: 'start your career with nearest jobs around you',
      color: '#2e3a81',
    },
    {
      text: 'Sign in with google to start',
      color: 'purple',
      button: (
        <Button
          icon={<ZocialIcon name="google" color="white" />}
          title="sign in"
          mainColor="tomato"
          textColor="white"
          btnStyle={styles.signInBtnStyle}
          onPress={googleSignIn}
        />
      ),
    },
  ];

  const translateX = scrollX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0, -20, 0],
  });

  return (
    <>
      <Animated.FlatList
        data={welcomeItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={[styles.welcomeItem, { backgroundColor: item.color }]}>
              <Text h1 style={{ textAlign: 'center' }} color="white">
                {item.text}
              </Text>
              <Spacer top={20} />
              {item.button}
            </View>
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
      />

      <View style={styles.pageIndicators}>
        <Animated.View
          style={[styles.currentScreen, { transform: [{ translateX }] }]}
        />
        <View style={styles.pageIndicator} />
        <View style={styles.pageIndicator} />
        <View style={styles.pageIndicator} />
      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomeItem: {
    flex: 1,
    width,
    height: height + StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  signInBtnStyle: {
    alignSelf: 'stretch',
  },
  pageIndicators: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageIndicator: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    margin: 5,
  },
  currentScreen: {
    backgroundColor: 'black',
    width: 15,
    height: 15,
    position: 'absolute',
    borderRadius: 50,
    zIndex: 9000,
  },
});
