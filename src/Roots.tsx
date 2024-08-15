import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import Home from './Screens/Home.tsx';
import Notifications from './Screens/Notifications.tsx';
import Profile from './Screens/Profile.tsx';
import messaging from '@react-native-firebase/messaging';
import {AppContext} from './Context/Context.tsx';

const Stack = createStackNavigator();
const config = {
  screens: {
    Notification: 'notification',
    Profile: 'profile',
  },
};

const NAVIGATION_IDS = ['notification', 'post', 'settings'];

interface NotificationData {
  navigationId: string;
}

function buildDeepLinkFromNotificationData(
  data: NotificationData,
): string | null {
  console.log('data_____', data);
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  if (navigationId === 'notification') {
    return 'notificationapp://notification';
  }
  // if (navigationId === 'settings') {
  //   return 'myapp://settings';
  // }
  // const postId = data?.postId;
  // if (typeof postId === 'string') {
  //   return `myapp://post/${postId}`
  // }
  // console.warn('Missing postId')
  return null;
}

const linking = {
  prefixes: ['notificationapp://'],
  config,
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    interface Message {
      data: object;
    }
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

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
