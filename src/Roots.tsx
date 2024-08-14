import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import Home from './Screens/Home.tsx';
import Notifications from './Screens/Notifications.tsx';
import Profile from './Screens/Profile.tsx';
import messaging from '@react-native-firebase/messaging';
import {AppContext} from './Context/Context.tsx';

const Stack = createStackNavigator();

const Roots = () => {
  const data = useContext(AppContext);
  console.log(data.notificationData);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // const data = await JSON.stringify(remoteMessage);
      data.setNotificationData(remoteMessage);
      console.log('Message handled in the background!44444', data);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      data.setNotificationData(remoteMessage);
    });

    return unsubscribe;
  }, []);
  console.log('callll');

  const config = {
    screens: {
      Notification: 'notification',
      Profile: 'profile',
    },
  };

  const linking = {
    prefixes: ['notificationapp://'],
    config,
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Notification" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Roots;

const styles = StyleSheet.create({});
