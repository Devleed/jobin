import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const JobFilters = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        position: 'absolute',
        top: '30%',
        width,
        height: height * 0.6,
        zIndex: 10000,
      }}
    >
      <Text>i will filter for you</Text>
    </View>
  );
};

export default JobFilters;

const styles = StyleSheet.create({});
