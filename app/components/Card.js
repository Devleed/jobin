import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { Text, Spacer } from '../native components';
import colors from '../colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Card = ({ item, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Text h5 bold transform="uppercase" style={styles.jobTitle}>
        {item.title}
      </Text>

      <Spacer top={20} />
      <View style={styles.company}>
        <Text h5 bold style={styles.companyName} color="white">
          {item.company?.name}
        </Text>
        <MaterialCommunityIcon
          name="check-circle"
          color="lightblue"
          size={20}
        />
      </View>
      <Spacer top={10} />
      <Text style={styles.jobLocation} color="white">
        {item.location?.city}, {item.location?.country}
      </Text>
      <Spacer top={10} />
      <View style={styles.salary}>
        <Text color="white">expected salary: </Text>
        <Text color="white">
          ${Math.floor(Number(item.salary?.min.replace('$', '')))} -{' '}
        </Text>
        <Text color="white">
          ${Math.floor(Number(item.salary?.max.replace('$', '')))}
        </Text>
      </View>
      <Spacer top={20} />
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: WIDTH,
    backgroundColor: colors.primary,
    minHeight: HEIGHT * 0.2,
    padding: 20,
  },
  jobTitle: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    letterSpacing: -0.5,
  },
  phone: {
    backgroundColor: '#ffffff42',
    padding: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  company: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    marginRight: 5,
  },
  salary: {
    flexDirection: 'row',
  },
});
