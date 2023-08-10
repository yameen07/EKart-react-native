import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useFirebase} from '../providers/firebaseProvider';
import Loader from './Loader';

const Login = ({navigation}) => {
  const {signIn, user} = useFirebase();
  const [email, setEmail] = useState('yameen@gmail.com');
  const [password, setPassword] = useState('password');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigation.replace('Dashboard');
    }
  }, [user]);

  const signInUser = () => {
    setEmailError('');
    setPasswordError('');
    let error = false;
    if (!email) {
      setEmailError('Email is required');
      error = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      error = true;
    }

    if (error) return;
    setIsLoading(true);

    signIn(email, password).then(result => {
      if (result) {
        navigation.replace('Dashboard');
      }
      setIsLoading(false);
    });
  };
  const navigate = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      {isLoading ? (
        <View>
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#808080"></TextInput>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#808080"
            secureTextEntry></TextInput>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          <CustomButton title="LogIn" onPress={signInUser} />
          <CustomButton
            title="Dont have an account, SignUp!"
            onPress={navigate}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 2,
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: `#e0ebe2`,
  },
  input: {
    color: '#121c14',
    padding: 10,
    marginVertical: 10,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Login;
