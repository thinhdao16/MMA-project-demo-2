import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  ToastAndroid,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import Feather from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown'

import Container from '../../components/Container/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import store from '../../storage/database/store';

import styles from './Store.style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const countries = ["receive", "give"]

const TopLabel = () => {
  const bottomSheet = useRef();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Tạo bài viết mới</Text>
      </View>
      <View style={styles.right}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
        />

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={250}
          sheetBackgroundColor="#262626"
        >
          <View
            style={{ backgroundColor: 'black', flex: 1, marginTop: 10 }}
          >
            <Text style={styles.labelText}>Tài khoản của bạn</Text>
            <View style={styles.containerText}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="white"
              />
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
  const { fetchAllData, userProfile, } = React.useContext(AuthContext)

  const [imageUri, setImageUri] = useState(null);
  const [token, setToken] = useState(null); // Trạng thái token
  const [description, setDescription] = useState('');
  const [typePost, setTypePost] = useState('')
  const [point, setPoint] = useState("");

  const [isTypePostEmpty, setIsTypePostEmpty] = useState(true);

  const handlePointChange = (text) => {
    if (isTypePostEmpty) {
      // Hiển thị thông báo khi nhập số trong trường hợp typePost rỗng
      Alert.alert("Thông báo", "Vui lòng chọn loại bài đăng trước khi nhập số");
      setPoint("");
      return;
    }

    const numericValue = parseInt(text);
    if (!isNaN(numericValue)) {
      const limitedValue = typePost === "receive" ? Math.min(numericValue, userProfile?.point) : numericValue;
      setPoint(limitedValue.toString());
    }
  };

  // Cập nhật trạng thái isTypePostEmpty khi typePost thay đổi
  useEffect(() => {
    setIsTypePostEmpty(typePost === "");
  }, [typePost]);


  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Quyền truy cập ảnh',
        'Vui lòng cấp quyền truy cập ảnh để chọn ảnh từ thư viện.'
      );
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Quyền truy cập ảnh',
        'Vui lòng cấp quyền truy cập ảnh để chọn ảnh từ thư viện.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Lưu đường dẫn ảnh vào state hoặc biến khác
      setImageUri(result.uri);
    }
  };

  const handleUploadImage = async () => {
    if (imageUri) {
      const accessToken = await AsyncStorage.getItem('Access_Token');
      const dataToken = JSON.parse(accessToken);
      const formData = new FormData();

      formData.append('img', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('description', description);
      formData.append('type', typePost)
      formData.append('point', point)
      try {
        const response = await axios.post(
          'https://trading-stuff-be-iphg.vercel.app/post/create',
          formData,
          {
            headers: {
              Authorization: `Bearer ${dataToken.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Gửi ảnh lên server thành công:', response.data);
        ToastAndroid.show('Đăng bài thành công!', ToastAndroid.SHORT);
        setImageUri(null)
        setDescription("")
        setTypePost("")
        setPoint("")
        fetchAllData(dataToken.accessToken)
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {!imageUri ? (
            <>
              <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Image
                  source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzGzTj0c4Gy2R6Gl856kAX1RiOxu38P9C8w&usqp=CAU" }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                    marginTop: '50%',
                  }}
                />
                <TouchableOpacity style={styles.btnImage} onPress={pickImage}>
                  <Text style={styles.imagesText}>Chọn từ máy bạn</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={pickImage} style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', marginBottom: 15
              }}>
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: 380,
                    height: 380,
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>
              <View>
                <Text style={{ color: "#393949", fontSize: 18, marginLeft: 18, }}>Description :</Text>
              </View>
              <View>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Input description"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                />
                <Feather
                  name="file-text"
                  size={20}
                  color="white"
                  style={styles.iconInput}
                />
              </View>
              <View>
                <Text style={{ color: "#393949", fontSize: 18, marginLeft: 18, marginBottom: 15 }}>TypePost :</Text>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                      setTypePost(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    dropdownStyle={{ borderRadius: 15 }}
                  />

                </View>
                <Text style={{ color: "#393949", fontSize: 18, marginLeft: 18 }}>Point :</Text>
              </View>
              <View>
                <TextInput
                  value={point}
                  onChangeText={handlePointChange}
                  placeholder="Input point"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                  keyboardType="numeric"
                />
                <Feather
                  name="file-text"
                  size={20}
                  color="white"
                  style={styles.iconInput}
                />
              </View>

              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableOpacity
                  onPress={handleUploadImage}
                  style={styles.btnSubmit}
                >
                  <Text style={styles.submit}>Gửi</Text>
                </TouchableOpacity>
              </View>

            </>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};


export default Store;
