import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import data from '../../storage/database/post';

import styles from './HomeComponents.style';
import { AuthContext } from '../../views/context/AuthContext';

const Stories = () => {
  const navigation = useNavigation();
  const { postingPushPublished, isLoading } = React.useContext(AuthContext)
  const filteredData = postingPushPublished?.filter((item) => {
    const updatedAt = moment(item.updatedAt);
    const now = moment();

    // Lấy thời gian hiện tại trừ thời gian cập nhật (updatedAt)
    const diffHours = now.diff(updatedAt, 'hours');

    // Lọc các mục có updatedAt trong vòng 24 giờ trở lại
    return diffHours <= 24;
  });

  // console.log("check",filteredData)

  // Sử dụng hàm handleData khi nhận được dữ liệu từ API hoặc từ nguồn dữ liệu khác

  const openCamera = React.useCallback(() => {
    ImagePicker.launchCamera({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 400,
      cropping: true,
      includeBase64: false,
    }, response => {
      if (response.didCancel) {
        // Xử lý khi người dùng hủy chụp ảnh
      } else if (response.error) {
        // Xử lý khi xảy ra lỗi trong quá trình chụp ảnh
      } else {
        // Xử lý khi chụp ảnh thành công
      }
    });
  }, []);
  return (
    <View style={styles.topContainer}>
      {isLoading ? (<ActivityIndicator size="large" color="black" />) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {filteredData?.map((data, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() => {
                  data.id === 1
                    ? openCamera()
                    : navigation.navigate({
                      name: 'Story',
                      params: {
                        image: data?.img,
                        name: data?.user?.fullname,
                        pp: data?.user?.img,
                        timeStory: data?.updatedAt,
                      },
                    });
                }}
              >
                <View style={styles.top2}>
                  {data?._id === 1 ? (
                    <View style={styles.myStory}>
                      <View style={styles.plusIcon}>
                        <AntDesign name="pluscircle" size={16} color="#0195f7" />
                      </View>
                      <Image source={{ uri: data?.img }} style={styles.image2} />
                    </View>
                  ) : (
                    <View style={styles.circle}>
                      <Image source={{ uri: data?.img }} style={styles.image2} />
                    </View>
                  )}

                  <Text style={styles.textLabel}>{data.userPosting?.fullname}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )
      }

    </View >
  );
};

export default Stories;
