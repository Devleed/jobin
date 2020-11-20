import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';

import { Context as CardContext } from '../context/cardContext';

import { Text, Spacer, Button } from '../native components';
import Card from '../components/Card';

const WIDTH = Dimensions.get('window').width;

const FavouriteScreen = ({ navigation }) => {
  const { state: jobState, removeFromFavourites } = useContext(CardContext);

  const renderFavoutiteCard = ({ item }) => {
    return (
      <Spacer vertical={10}>
        <Card item={item} style={{ width: WIDTH - 20, borderRadius: 10 }}>
          <View style={styles.btnStack}>
            <Button
              title="view job"
              btnStyle={styles.viewJobBtn}
              mainColor="transparent"
              textColor="white"
              onPress={() => navigation.navigate('JobDetail', { id: item.id })}
            />
            <Button
              title="delete"
              btnStyle={styles.deleteBtn}
              mainColor="#812e2e"
              textColor="white"
              onPress={() => removeFromFavourites(item.id)}
            />
          </View>
        </Card>
      </Spacer>
    );
  };

  return (
    <Spacer around={10} top={30}>
      {!jobState.favourites.length ? (
        <Text h1 style={{ textAlign: 'center', marginTop: '50%' }}>
          you have no favourites
        </Text>
      ) : (
        <FlatList
          data={jobState.favourites}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderFavoutiteCard}
        />
      )}
    </Spacer>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  viewJobBtn: {
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  deleteBtn: {
    width: 100,
    marginLeft: 'auto',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  btnStack: {
    flexDirection: 'row-reverse',
  },
});
