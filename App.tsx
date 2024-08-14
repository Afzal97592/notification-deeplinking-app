import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Alert, PermissionStatus, SafeAreaView, StyleSheet} from 'react-native';
import {getNotificationPermission} from './src/permission/NotificationPermissions';
import Roots from './src/Roots';
import ContextProvider from './src/Context/Context';

function App(): React.JSX.Element {
  const [permission, setPermission] = useState<PermissionStatus>();
  useEffect(() => {
    async function getPermission() {
      try {
        const permissionResult = await getNotificationPermission();
        setPermission(permissionResult);
      } catch (error) {
        console.error(error);
      }
    }
    if (!permission) {
      getPermission();
    }
  }, [permission]);

  useEffect(() => {
    async function getTokenData() {
      try {
        // await messaging().registerDeviceForRemoteMessages();
        // const token = await messaging().getToken();
        // console.log('FCM Token12:', token);
      } catch (err) {
        console.error('Error getting FCM token:', err);
      }
    }

    getTokenData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ContextProvider>
        <Roots />
      </ContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
