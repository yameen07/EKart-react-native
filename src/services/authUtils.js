import firebase from 'firebase/compat';
import {Alert} from 'react-native';
import {createUser} from './userService';

export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    Alert.alert('Alert', 'Please enter valid credentials.', [{text: 'OK'}]);
    return false;
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (error) {
    console.log('Error signing out:', error);
    return false;
  }
};

export const signUp = async (name, email, password) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async result => {
        user = {
          name: name,
          email: email,
        };
        await createUser(user, result.user.uid).then(() => {
          Alert.alert('Success', 'Signup successful!', [{text: 'OK'}]);
        });
      });

    return true;
  } catch (error) {
    Alert.alert('Alert', `${error}`, [{text: 'OK'}]);
    return false;
  }
};
