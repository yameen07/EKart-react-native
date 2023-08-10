import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import FirebaseProvider from './src/providers/firebaseProvider';
import {StatusBar, View} from 'react-native';

function App(): JSX.Element {
  return (
    <FirebaseProvider>
      <StatusBar translucent backgroundColor="transparent" />
      <AppNavigator />
    </FirebaseProvider>
  );
}
export default App;
