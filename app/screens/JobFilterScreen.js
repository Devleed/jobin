import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/dist/Entypo';

import { Context as JobContext } from '../context/cardContext';

import { Text, Spacer, Button, TextInput } from '../native components';
import colors from '../colors';

const JobFilterScreen = ({ navigation }) => {
  const [oneOfWord, setOneOfWord] = useState('');
  const { state, setFilters } = useContext(JobContext);

  const getFilterValueFromState = (type) => {
    return state.filters.find((item) => item.type === type)?.value.join(' ');
  };

  useFocusEffect(
    useCallback(() => {
      getFilterValueFromState('oneOfWord');

      setOneOfWord(getFilterValueFromState('oneOfWord'));
    }, [state.filters]),
  );

  const callSetFilters = () => {
    if (oneOfWord === getFilterValueFromState('oneOfWord')) {
      return;
    }
    const oneOfWordFilter = {
      type: 'oneOfWord',
      value: oneOfWord.split(' '),
    };

    setFilters([oneOfWordFilter]);
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      <Text h3 style={styles.heading}>
        Filters
      </Text>
      <TouchableOpacity
        style={styles.optionsBtn}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Entypo name="cross" color="black" size={24} />
      </TouchableOpacity>

      <Spacer horizontal={30} top={150}>
        <View>
          <View>
            <Text size={12} color="gray">
              should contain atleast one of these words
            </Text>
            <Spacer top={5} />
            <TextInput
              bordered
              style={styles.filterInputStyling}
              value={oneOfWord}
              onChangeText={(val) => setOneOfWord(val)}
            />
          </View>
          <Spacer top={15} />
          <View>
            <Text size={12} color="gray">
              should contain all of these words
            </Text>
            <Spacer top={5} />
            <TextInput
              bordered
              style={styles.filterInputStyling}
              value={oneOfWord}
              onChangeText={(val) => setOneOfWord(val)}
            />
          </View>
          <Spacer top={30}>
            <Button
              title="Apply"
              mainColor={colors.primary}
              textColor="white"
              onPress={callSetFilters}
            />
          </Spacer>
        </View>
      </Spacer>
    </View>
  );
};

export default JobFilterScreen;

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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.43,
    // shadowRadius: 9.51,
    // elevation: 15,
  },
  filterInputStyling: {
    borderColor: 'lightgray',
    fontSize: 15,
  },
  heading: {
    position: 'absolute',
    top: 66,
    left: 30,
  },
});
