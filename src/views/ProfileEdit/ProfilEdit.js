import React, { useRef, useState } from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import DefaultImage from '../../../assets/images/profil.jpg';

import styles from './ProfilEdit.style';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilEdit = () => {
  const [name, setName] = useState(userProfile?.fullname);
  const [phone, setPhone] = useState(userProfile?.phoneNumber)
  const [image, setImage] = useState();
  const navigation = useNavigation();
  const bottomSheet = useRef();
  const { userProfile, fetchAllData } = React.useContext(AuthContext)

  const handleSubmitFormProfile = async (e) => {
    const storedData = await AsyncStorage.getItem('Access_Token');
    const accessToken = JSON.parse(storedData)
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", name);
    formData.append("phoneNumber", phone);
    // formData.append("img", newImage);
    try {
      const response = await axios.put(
        "https://trading-stuff-be-iphg.vercel.app/user/edit",
        // formData,
        {
          phoneNumber: phone,
          fullname: name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      ToastAndroid.show('Chỉnh sửa thành công!', ToastAndroid.SHORT);
      fetchAllData(accessToken.accessToken)
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.body}>
      <View style={{ margin: 10 }}>
        <View style={styles.topContainer}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="close"
                size={32}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.label}>Chỉnh sửa</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              onPress={
                handleSubmitFormProfile
              }>
              <AntDesign
                name="check"
                size={32}
                color="#0098fd"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={userProfile?.img ? { uri: userProfile?.img } : DefaultImage}
          />

          <TouchableOpacity onPress={() => bottomSheet.current.show()}>
            <Text style={styles.change}> Thay đổi ảnh hồ sơ</Text>
          </TouchableOpacity>

          <BottomSheet
            hasDraggableIcon
            ref={bottomSheet}
            height={350}
            sheetBackgroundColor="#262626">
            <View style={{ marginLeft: 10 }}>
              <View style={{ marginTop: 25, marginBottom: 15 }}>
                <Text style={styles.sheetText}>
                  Thay đổi ảnh hồ sơ
                </Text>
              </View>

              <View style={styles.lineGrey} />

              <TouchableOpacity
                style={{ marginVertical: 20 }}
              // onPress={chooseFromLibrary}
              >
                <Text style={styles.sheetText}>Ảnh hồ sơ mới</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginVertical: 15 }}
                onPress={() => {
                  Linking.openURL('https://www.facebook.com/login/');
                }}>
                <Text style={styles.sheetText}>Facebook'tan aktar</Text>
              </TouchableOpacity>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.sheetText}>Avatar kullan</Text>
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text
                  style={{ color: '#be363f', fontWeight: '500', fontSize: 18 }}>
                  Xóa ảnh hồ sơ
                </Text>
              </View>
            </View>
          </BottomSheet>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>FullName</Text>
          <TextInput style={styles.input} defaultValue={userProfile?.fullname} onChangeText={setName} />
          <View style={styles.line} />
          <Text style={styles.inputLabel}>PhoneNumber</Text>
          <TextInput style={styles.input} defaultValue={userProfile?.phoneNumber} onChangeText={setPhone} />
          <View style={styles.line} />
          <Text style={styles.inputLabel}>Point</Text>
          <TextInput style={styles.input} readOnly={true}>
            {userProfile?.point}
          </TextInput>
          <View style={styles.line} />
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input} readOnly={true}>
            {userProfile?.email}
          </TextInput>
          <View style={styles.line} />
        </View>
        <View style={styles.lineGrey}>
          <Text
            style={{
              color: 'white',
              marginTop: 15,
              fontSize: 19,
              marginLeft: 10,
              marginBottom: 5,
            }}>
            Thêm liên kết
          </Text>
        </View>

        <View style={styles.blueContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OnboardingScreen')}>
            <Text style={styles.blueText}>Chuyển sang tài khoản chuyên nghiệp</Text>
          </TouchableOpacity>

          <Text style={styles.blueText}>Chỉnh sửa avatar</Text>

          <Text style={styles.blueText}>Cài đặt thông tin cá nhân</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilEdit;
