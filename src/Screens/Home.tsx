import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../types/ScreenTypes';

type HomeProps = {
  navigation: StackNavigationProp<StackParamList, 'Home'>;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
      }}>
      <Text onPress={() => navigation.navigate('Notification')}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
