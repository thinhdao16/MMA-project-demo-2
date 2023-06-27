import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import data from '../../storage/database/post';

import styles from './HomeComponents.style';

const Stories = () => {
  const navigation = useNavigation();

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
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((data, index) => {
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
                        image: data.postImage,
                        name: data.name,
                        pp: data.image,
                        timeStory: data.timeStory,
                      },
                    });
              }}
              >
              <View style={styles.top2}>
                {data.id === 1 ? (
                  <View style={styles.myStory}>
                    <View style={styles.plusIcon}>
                      <AntDesign name="pluscircle" size={16} color="#0195f7" />
                    </View>
                    <Image source={data.image} style={styles.image2} />
                  </View>
                ) : (
                  <View style={styles.circle}>
                    <Image source={data.image} style={styles.image2} />
                  </View>
                )}

                <Text style={styles.textLabel}>{data.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Stories;
