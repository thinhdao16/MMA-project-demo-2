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
  const { userProfile, accessToken, fetchAllData } = React.useContext(AuthContext)
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

      formData.append('point', content);
      try {
        const response = await axios.post(
          'https://trading-stuff-be-iphg.vercel.app/invoice/create',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('nap diem thành công:', response.data);
        ToastAndroid.show('Đăng bài thành công!', ToastAndroid.SHORT);
        fetchAllData(accessToken.accessToken)
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
            backgroundColor: "#1c1c24",
            borderRadius: 28,
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
              <Text style={{ color: "#393949", fontSize: 18, marginLeft: 12 }}>Tranfer content:</Text>
              <View>
                <TextInput
                  placeholder="Input content"
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
              <Text style={{ color: "#393949", fontSize: 18, marginLeft: 14 }}>Point:</Text>
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
              <View>
                <Feather
                  name="file-text"
                  size={20}
                  color={'yellow'}
                  style={{
                    paddingLeft: 10,
                  }}
                />
                <Text style={{ color: 'white' }}> 1đ = 1000vnđ</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
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
                    <Text style={{ color: "#393949", fontSize: 18, marginLeft: 5, marginBottom: 15 }}>Image:</Text>
                    <Image
                      source={{ uri: imageUri }}
                      style={{
                        width: 340,
                        height: 340,
                        borderRadius: 15,
                      }}
                    />
                  </TouchableOpacity>
                )}
                <View style={styles.line} />
                <TouchableOpacity onPress={handleUploadImage} style={styles.btnImagePost}>
                  <Text style={{ color: "white", fontWeight: 700, fontSize: 17 }}>
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
          source={{ uri: 'data:image/png;base64,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' }}
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
