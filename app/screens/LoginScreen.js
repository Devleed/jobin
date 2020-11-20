import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { Context as AuthContext } from '../context/authContext';

import { Button } from '../native components';

const LoginScreen = () => {
  const { googleSignIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button
        title="Google Sign-In"
        onPress={googleSignIn}
        mainColor="tomato"
        btnStyle={{ paddingVertical: 30 }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
