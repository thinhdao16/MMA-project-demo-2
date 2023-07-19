import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Container from '../../components/Container/Container';
import data from '../../storage/database/comment';

import styles from './Comment.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const Comment = ({ navigation, route }) => {
  const { fetchAllData, userProfile, allCmt, isLoading } = React.useContext(AuthContext)

  const commentData = allCmt?.filter((cmt) => cmt?.post?._id === route.params.idPost)

  const [commentText, setCommentText] = useState('');
  const handleUploadImage = async () => {
    const accessToken = await AsyncStorage.getItem('Access_Token');
    const dataToken = JSON.parse(accessToken);
    const formData = new FormData();

    formData.append('description', commentText);
    formData.append('posting', route.params.idPost);
    try {
      const response = await axios.post(
        'https://trading-stuff-be-iphg.vercel.app/comment/create',
        {
          description: commentText,
          postId: route.params.idPost
        },
        {
          headers: {
            Authorization: `Bearer ${dataToken.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchAllData(dataToken.accessToken)
      console.log('Cmt lên server thành công:', response.data);
      setCommentText('')
    } catch (error) {
      console.error('Lỗi khi gửi ảnh lên server:', error);
    }
  };

  return (
    <Container insets={{ top: true, bottom: true }}>
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View style={styles.topContainer}>
          <View style={styles.top}>
            <View style={styles.left}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.label}> Bình luận</Text>
            </View>

            <View style={{ justifyContent: 'center', marginRight: 20 }}>
              <Feather name="send" size={24} color="white" />
            </View>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <ScrollView>
              <View style={styles.topComment}>
                <Image style={styles.image} source={{ uri: route.params.image }} alt='https://cdn-icons-png.flaticon.com/512/1088/1088537.png' />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {route.params.user}
                  </Text>
                  <Text style={{ color: 'white', marginTop: 7 }}>
                    {route.params.explanation}
                  </Text>
                </View>
              </View>

              <View style={styles.line} />
              {commentData.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={styles.comment}>
                      <Image style={styles.images} source={{ uri: data?.user?.img }} />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 13,
                          }}>
                          {data?.user?.fullname}
                        </Text>
                        <Text
                          style={{ color: 'white', marginTop: 5, fontSize: 15 }}>
                          {data?.description}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                          <Text style={styles.answer}>Trả lời</Text>
                          <Text style={styles.answer}>Gửi</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        alignItems: 'center',
                        marginRight: 20,
                      }}>
                      <EvilIcons name="heart" size={20} color="#aeaeae" />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={styles.bottom}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={styles.image}
              source={{ uri: userProfile?.img }}
            />
            <TextInput
              placeholder={`Comment under the name you want ...`}
              placeholderTextColor="#969696"
              style={styles.input}
              value={commentText}
              onChangeText={setCommentText}
            />

          </View>

          <View>
            {!commentText.length ? (
              <Text style={{ color: '#254253', marginRight: 15 }}>Chia sẻ</Text>
            ) : (
              <Text style={{ color: '#0096fd', marginRight: 15 }} onPress={handleUploadImage}>Chia sẻ</Text>
            )}
          </View>
        </View>
      </View>
    </Container>
  );
};
export default Comment;
