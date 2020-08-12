/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Users from './src/pages/Users';
import Profile from './src/pages/Profile';
import About from './src/pages/About';
import SingleJobPage from './src/pages/SingleJobPage';

import {Provider} from 'react-redux';
import {init} from '@rematch/core';
import {friends} from './src/redux/models.js';
import MapPage from './src/pages/Maps';

const Stack = createStackNavigator();

console.disableYellowBox = true;

const models = {
  friends,
};

const store = init({
  models,
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MapPage"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="SingleJobPage" component={SingleJobPage} />
          <Stack.Screen name="MapPage" component={MapPage} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({route}) => ({title: route.params.firstName})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
