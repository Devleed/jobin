import React, { useRef, useCallback } from 'react';
import { Dimensions, PanResponder, Animated } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CARD_THRESHOLD = 160;

const Deck = (props) => {
  // using animated position for dragging of card
  const position = useRef(new Animated.ValueXY()).current;

  // creating new panresponder whenever props.data changes
  const panResponder = useCallback(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > CARD_THRESHOLD) {
          swipeOffScreen('right');
        } else if (gesture.dx < -CARD_THRESHOLD) {
          swipeOffScreen('left');
        } else {
          resetPosition();
        }
      },
    }),
    [props.data],
  );

  // function to reset position of card
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  // function to swipe the card off screen
  const swipeOffScreen = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;

    Animated.timing(position, {
      toValue: {
        x,
        y: 0,
      },
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      props.onSwipeComplete(direction);
      position.setValue({ x: 0, y: 0 });
    });
  };

  // interpolating x position to rotate card
  const scale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  // updated card style object
  const animatedCardStyle = {
    ...position.getLayout(),
  };

  // maps over and renders cards
  const renderCards = () => {
    return props.data
      .map((item, index) => {
        let cardStyle = {
          position: 'absolute',
        };

        // attach pan handlers to the top most card on deck
        if (index === 0) {
          return (
            <Animated.View
              style={[cardStyle, animatedCardStyle]}
              key={index}
              {...panResponder.panHandlers}
            >
              {props.renderCard(item, index)}
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              style={[cardStyle, { transform: [{ scale }] }]}
              key={index}
            >
              {props.renderCard(item, index)}
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  return renderCards();
};

export default Deck;
