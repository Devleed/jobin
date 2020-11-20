import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

import { Context as JobContext } from '../context/cardContext';

import { Text, Spacer, Button } from '../native components';
import Map from '../components/Map';
import colors from '../colors';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const JobDetailScreen = ({ navigation, route }) => {
  const { state, removeFromFavourites } = useContext(JobContext);
  const id = route.params.id;
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(state.favourites.find((item) => item.id === id));

    return () => {
      setItem(null);
    };
  }, []);

  if (!item)
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ flex: 1 }}
      />
    );

  return (
    <>
      <TouchableOpacity
        style={[styles.optionsBtn, { left: 30 }]}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialIcon
          name="arrow-back-ios"
          color="black"
          size={20}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.optionsBtn, { right: 30 }]}
        onPress={() => {
          removeFromFavourites(item.id);
          navigation.goBack();
        }}
      >
        <MaterialIcon name="delete-outline" color="red" size={25} />
      </TouchableOpacity>
      <Map
        region={{
          longitude: item.location.longitude,
          latitude: item.location.latitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        height={HEIGHT * 0.5}
        width={WIDTH}
        draggable={false}
      />
      <ScrollView style={styles.job} showsVerticalScrollIndicator={false}>
        <Text h3 bold style={styles.jobTitle} color="white">
          {item.title}
        </Text>
        <Spacer top={20} />
        <View style={styles.jobCompanyName}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(item.company.url).catch((e) => console.error(e))
            }
          >
            <Text h5 bold>
              {item.company.name}
            </Text>
          </TouchableOpacity>
          <MaterialIcon
            name="check-circle"
            color="lightblue"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
        <Spacer top={10} />
        <Text>
          {item.location.city}, {item.location.country}
        </Text>
        <Spacer top={10} />
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
        >
          <MaterialIcon
            name="phone"
            color={colors.primary}
            size={20}
            style={{ marginRight: 5 }}
          />
          <Text color={colors.primary}>{item.phone}</Text>
        </TouchableOpacity>
        <Spacer top={5} />
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() =>
            Linking.openURL(
              `mailto:${item.email}?subject=${item.title} Job Application`,
            )
          }
        >
          <MaterialIcon
            name="mail-outline"
            color={colors.primary}
            size={20}
            style={{ marginRight: 5 }}
          />
          <Text color={colors.primary}>{item.email}</Text>
        </TouchableOpacity>

        <Spacer top={20} />
        <View style={styles.jobDepartment}>
          <Text bold>department: </Text>
          <Text>{item.department}</Text>
        </View>
        <Spacer vertical={10}>
          <Text>{item.description}</Text>
        </Spacer>
        <View style={styles.salary}>
          <Text bold>expected salary: </Text>
          <Text>
            ${Math.floor(Number(item.salary.min.replace('$', '')))} -{' '}
          </Text>
          <Text>${Math.floor(Number(item.salary.max.replace('$', '')))}</Text>
        </View>
        <Spacer bottom={20} />
        <Button title="Apply" mainColor={colors.primary} textColor="white" />
        <Spacer bottom={50} />
      </ScrollView>
    </>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  deleteBtn: {
    width: 100,
    borderRadius: 10,
    flex: 1,
  },
  btnStack: {
    flexDirection: 'row-reverse',
  },
  optionsBtn: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 40,
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
  job: {
    padding: 20,
  },
  jobTitle: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  jobCompanyName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contact: {
    flexDirection: 'row',
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: '#2e3b8123',
  },
  salary: {
    flexDirection: 'row',
  },
  jobDepartment: {
    flexDirection: 'row',
  },
});
