import React from 'react';
import { Button, Image, StatusBar, Text, TouchableOpacity, View, Platform, TextInput, ScrollView, ToastAndroid } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';

import styles from './HomeComponents.style';
import { AuthContext } from '../../views/context/AuthContext';
import axios from 'axios';

const TopBar = () => {

  const navigation = useNavigation();
  const { userProfile, accessToken } = React.useContext(AuthContext)

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [imageUri, setImageUri] = React.useState(null);
  const [content, setContent] = React.useState("")
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  React.useEffect(() => {
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
      const formData = new FormData();

      formData.append('img', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      formData.append('description', content);
      try {
        const response = await axios.post(
          'https://trading-stuff-be-iphg.vercel.app/post/create',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Gửi ảnh lên server thành công:', response.data);
        ToastAndroid.show('Đăng bài thành công!', ToastAndroid.SHORT);
        fetchAllData(dataToken.accessToken)
      } catch (error) {
        console.error('Lỗi khi gửi ảnh lên server:', error);
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh trước khi gửi.');
    }
  };

  return (

    <View style={styles.body}>
      {/* modal */}
      <Modal isVisible={isModalVisible} style={{ maxHeight: 900 }} >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{
            flex: 1,
            backgroundColor: "black",
            borderRadius: 8,
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              },
              android: {
                elevation: 5,
              }
            })
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
              <FontAwesome name="times-circle" size={40} color="white" onPress={toggleModal} />
            </View>
            <View style={{ flex: 1, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.image_bank} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/auth-fhome.appspot.com/o/profilePics%2Ftpbank.jpg?alt=media&token=abe240f1-807a-4d77-b6c9-e916ff8d20d1&_gl=1*euyfrm*_ga*MjY1NDExNDQuMTY4NTA5OTM4OQ..*_ga_CW55HF8NVT*MTY4NjU5NDkwNy40LjEuMTY4NjU5NDk0OC4wLjAuMA.." }} />
              </View>
              <Text style={{ color: "white" }}>Tranfer content</Text>
              <View>
                <TextInput
                  placeholder="Input point"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                  defaultValue={userProfile?.email}
                  readOnly={true}
                />
                <Feather
                  name="file-text"
                  size={20}
                  color="white"
                  style={styles.iconInput}
                />
              </View>
              <Text style={{ color: "white" }}>Point</Text>
              <View>
                <TextInput
                  value={content}
                  onChangeText={setContent}
                  placeholder="Input point"
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {!imageUri ? (
                  <>
                    <Image
                      source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzGzTj0c4Gy2R6Gl856kAX1RiOxu38P9C8w&usqp=CAU" }}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 500,
                        resizeMode: 'contain',
                      }}
                    />
                    <TouchableOpacity style={styles.btnImage} onPress={pickImage}>
                      <Text style={styles.imagesText}>Chọn từ máy bạn</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      source={{ uri: imageUri }}
                      style={{
                        width: 300,
                        height: 300,
                        borderRadius: 15,
                      }}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleUploadImage}>
                  <Text style={{ color: "white" }}>
                    Nạp điểm
                  </Text>
                </TouchableOpacity>
              </View>


            </View>
          </View>
        </ScrollView>
      </Modal>

      {/*modla*/}
      <StatusBar backgroundColor="black" />
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.icon}
        />
      </View>
      <View style={styles.iconContainer}>
        <Text style={{ color: "white" }}> {userProfile?.point}</Text>

        <TouchableOpacity
        // onPress={() => openCamera()}
        >
          <FontAwesome name="plus-circle" size={20} color="white" onPress={toggleModal} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Feather name="heart" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
