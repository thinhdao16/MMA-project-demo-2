import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

import Container from '../../components/Container/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import store from '../../storage/database/store';

import styles from './Store.style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const TopLabel = () => {
  const bottomSheet = useRef();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Tạo bài viết mới</Text>
      </View>
      <View style={styles.right}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={250}
          sheetBackgroundColor="#262626">
          <View style={{ backgroundColor: 'black', flex: 1, marginTop: 10 }}>
            <Text style={styles.labelText}>Tài khoản của bạn</Text>
            <View style={styles.containerText}>
              <Ionicons name="notifications-outline" size={24} color="white" />
              <TouchableOpacity>
                <Text style={styles.text2}>Thông báo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <Text style={styles.labelText}>Cửa hàng Instagram</Text>
            <Text style={styles.labelText}>Video</Text>
          </View>
        </BottomSheet>

        <TouchableOpacity onPress={() => bottomSheet.current.show()}>
          <FontAwesome name="bars" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Store = () => {
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null); // Trạng thái token
  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập ảnh', 'Vui lòng cấp quyền truy cập ảnh để chọn ảnh từ thư viện.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập ảnh', 'Vui lòng cấp quyền truy cập ảnh để chọn ảnh từ thư viện.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      try {
        const accessToken = await AsyncStorage.getItem('Access_Token');
        const dataToken = JSON.parse(accessToken)
        const formData = new FormData(); 
        formData.append('img', image);

        const response = await axios.post(
          'https://f-home-be.vercel.app/posts/create',
          formData,
          {
            headers: {
              Authorization : `Bearer ${dataToken.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Gửi ảnh lên server thành công:', response.data);
      } catch (error) {
        console.error('Lỗi khi gửi ảnh lên server:', error);
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh trước khi gửi.');
    }
  };

  return (
    <Container insets={{ top: true }}>
      <TopLabel />
      <SearchBar placeHolders={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.videos}>
          <Text style={styles.videosText}>Video</Text>
        </TouchableOpacity>
        <View>
          <View
            style={{
              // flexDirection: 'row',
              // flexWrap: 'wrap',
            }}>

            <View>
              {image ? (
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
              ) : (
                <View style={{ width: 200, height: 200, backgroundColor: '#ccc' }} />
              )}
              <TouchableOpacity style={styles.btnImage} onPress={pickImage}>
                <Text style={styles.imagesText}>Chọn từ máy bạn</Text>
              </TouchableOpacity>
              <Button title="Gửi" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Store;
