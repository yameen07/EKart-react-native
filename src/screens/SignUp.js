import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useFirebase} from '../providers/firebaseProvider';

const SignUp = ({navigation}) => {
  const {signUp, user} = useFirebase();
  const [email, setEmail] = useState('@gmail.com');
  const [password, setPassword] = useState('password');
  const [fullName, setFullName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const handleSignUp = () => {
    setEmailError('');
    setPasswordError('');
    setFullNameError('');
    let error = false;
    if (!email) {
      setEmailError('Email is required');
      error = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      error = true;
    }

    if (!fullName) {
      setFullNameError('Username is required');
      error = true;
    }

    if (error) return;

    signUp(fullName, email, password).then(() => {
      navigation.goBack;
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        placeholderTextColor="#808080"></TextInput>
      {fullNameError ? (
        <Text style={styles.errorText}>{fullNameError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#808080"></TextInput>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
      <CustomButton title="Sign Up" onPress={handleSignUp} />
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
    backgroundColor: `#e0ebe2`,
  },
  input: {
    color: '#121c14',
    padding: 10,
    marginVertical: 10,
    width: '80%',
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

export default SignUp;
