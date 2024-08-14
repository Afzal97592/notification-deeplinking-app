import {PermissionsAndroid, PermissionStatus} from 'react-native';

export async function getNotificationPermission(): Promise<PermissionStatus> {
  try {
    const data = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return data;
  } catch (err) {
    console.error('Permission request error:', err);
    throw err;
  }
}
