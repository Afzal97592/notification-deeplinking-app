import {
  Alert,
  AppState,
  StyleSheet,
  Text,
  View,
  AppStateStatus,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import messaging from '@react-native-firebase/messaging';
import {getNotificationPermission} from '../permission/NotificationPermissions';
import {useIsFocused} from '@react-navigation/native';

const Notifications = () => {
  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!1111', remoteMessage);
  // });
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
