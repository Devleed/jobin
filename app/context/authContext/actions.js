import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';

const setUser = (state, dispatch) => async (user, cb) => {
  try {
    const document = await firestore().collection('Users').doc(user.uid).get();

    if (document.exists) dispatch({type: 'set_user', payload: document.data()});
  } catch (error) {
    console.error(error.code);
  } finally {
    if (cb) cb();
  }
};

const googleSignIn = (state, dispatch) => async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const {user} = await auth().signInWithCredential(googleCredential);

    console.log('google user =>', user);

    await firestore().collection('Users').doc(user.uid).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
    });

    dispatch({
      type: 'sign_in',
      payload: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const signout = (state, dispatch) => async () => {
  try {
    await auth().signOut();
    dispatch({type: 'sign_out'});
  } catch (error) {
    console.error(error);
  }
};

const clearError = (state, dispatch) => (key) => {
  dispatch({type: 'clear_error', payload: key});
};

export default {
  setUser,
  signout,
  googleSignIn,
  clearError,
};
