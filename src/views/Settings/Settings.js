import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Container/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import setting from '../../storage/database/setting';

import styles from './Setting.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingComponent = () => {
  return (
    <View>
      {setting.map((data, index) => {
        return (
          <View key={index} style={styles.container}>
            <Image source={data.icon} style={styles.icon} />
            <Text style={styles.iconText}>{data.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const Settings = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      // Clear the local storage
      await AsyncStorage.removeItem('Access_Token');

      // Navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };
  return (
    <Container insets={{ top: true }}>
      <View style={styles.topHeader}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Cài đặt</Text>
      </View>
      <SearchBar />
      <ScrollView>
        <SettingComponent />

        <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 5 }}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            style={{ marginLeft: 10, width: 20, height: 20 }}
          />
          <Text style={{ color: 'white', fontSize: 18, marginLeft: 5 }}>
            Meta
          </Text>
        </View>
        <Text
          style={{
            color: '#0098fd',
            fontSize: 18,
            margin: 10,
            marginBottom: 15,
            fontWeight: '500',
          }}>
          Trung tâm tài khoản
        </Text>

        <Text style={styles.p}>
          Bao gồm chia sẻ câu chuyện và bài đăng và đăng nhập.
        </Text>
        <Text style={styles.p}>Ứng dụng Instagram, Facebook và Messenger.</Text>
        <Text style={styles.p}>
          Kiểm tra cài đặt để có trải nghiệm được kết nối giữa.
        </Text>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.entry}>Mục</Text>
          <Text style={styles.blueText}>Thêm hoặc Thay đổi Tài khoản.</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.blueText}>Đăng xuất khỏi ezgiceylan</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.blueText} onPress={handleLogout}>Đăng xuất</Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Settings;
