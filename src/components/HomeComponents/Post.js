import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import DoubleTap from 'react-native-double-tap';

import send from '../../storage/database/message';
import data from '../../storage/database/post';

import styles from './HomeComponents.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../views/context/AuthContext';
import axios from 'axios';

const Post = () => {
  const [like, setLike] = useState([]);
  const bottomSheet = useRef();
  const { postingPush, setPostingPush, allCmt, isLiked, setIsLiked, accessToken, fetchAllData } = React.useContext(AuthContext)
console.log(postingPush[0])
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={item.image} style={styles.sheetImage} />
          <View>
            <Text style={styles.sheetLabel}>{item.user}</Text>
            <Text style={{ color: '#a2a2a2' }}>{item.username}</Text>
          </View>
        </View>
      </View>
    );
  };
  const navigation = useNavigation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handlePress = () => {
    if (isConfirmed) {
      // Gửi dữ liệu lên server
      sendDataToServer();
    } else {
      Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn gửi dữ liệu lên server?', [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xác nhận', onPress: () => setIsConfirmed(true) },
      ]);
    }
  };

  const sendDataToServer = () => {
    // Gửi dữ liệu lên server
    // Code xử lý gửi dữ liệu
    console.log('Gửi dữ liệu lên server');
  };
  const handleLike = async ( id) => {
    console.log(id)
    axios
      .post(
        "https://trading-stuff-be-iphg.vercel.app/comment/create",
        { postId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        }
      )
      .then((response) => {
        fetchAllData(accessToken.accessToken)
      })
      .catch((error) => {
        console.error("Failed to add like", error);
      });
  };
  const handleDisLike = async (event, id) => {
    const idLike = isLiked?.filter((like) => like?.post?._id === id)?.[0]._id;
    event.preventDefault();
    axios
      .delete(`https://trading-stuff-be-iphg.vercel.app/deleteFavouritePost/${idLike}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      })
      .then((response) => {
        fetchAllData(accessToken.accessToken)
      })
      .catch((error) => {
        console.error("Failed to add Dislike", error);
      });
  };
  return (
    <View style={styles.line}>
      {Array.isArray(postingPush) &&
        postingPush
          .sort((a, b) => {
            return (
              new Date(b?.updatedAt).getTime() -
              new Date(a?.updatedAt).getTime()
            );
          })
          ?.map((data, index) => {
            return (
              <View key={index} style={{ marginBottom: 10 }}>
                {/* user */}
                <View style={styles.top}>
                  <View style={styles.topleft}>
                    <Image source={{ uri: data?.userPosting?.img }} style={styles.profilImage} />
                    <Text style={styles.title}>{data?.userPosting?.fullname}</Text>
                  </View>

                  <TouchableOpacity style={{ alignSelf: 'center', marginRight: 15 }}>
                    <Feather name="more-vertical" size={20} color="#F5F5F5" />
                  </TouchableOpacity>
                </View>
                {/*img post*/}
                <View style={{ height: 400 }}>
                  <DoubleTap doubleTap={() => handleLike(data?._id)}>
                    <Image
                      source={{ uri: data?.img }}
                      style={styles.ımage}
                      alt="https://png.pngtree.com/png-clipart/20210128/ourmid/pngtree-nothing-no-variety-show-emoji-pack-png-image_2817567.jpg"
                    />
                  </DoubleTap>
                </View>

                <View style={styles.ıconContainer}>
                  <View style={styles.leftIcon}>
                    <TouchableOpacity
                      onPress={(event) =>
                        isLiked
                          ?.filter((f) => f?.post?._id === data?._id)
                          .filter(
                            (f) => f?.user?._id === accessToken?.user?.id
                          )?.length > 0
                          ? handleDisLike(event, data?._id)
                          : handleLike( data?._id)
                      }>
                      <AntDesign
                        name={isLiked
                          ?.filter((f) => f?.post?._id === data?._id)
                          .filter(
                            (f) => f?.user?._id === accessToken?.user?.id
                          )?.length > 0 ? 'heart' : 'hearto'}
                        size={24}
                        color={isLiked
                          ?.filter((f) => f?.post?._id === data?._id)
                          .filter(
                            (f) => f?.user?._id === accessToken?.user?.id
                          )?.length > 0 ? 'red' : 'white'}
                      />
                    </TouchableOpacity>
                    {/* {allCmt?.filter?.((cmt) => cmt?.posting?._id === data?.id)} */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate({
                          name: 'Comment',
                          params:
                          {
                            allCmt: allCmt?.filter?.((cmt) => cmt?.posting?._id === data?._id),
                            idPost: data?._id,
                            image: data?.userPosting?.img,
                            user: data?.userPosting?.fullname,
                            explanation: data?.description,
                          },
                        })
                      }>
                      <Feather name="message-circle" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                      <Feather name="send" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                  <BottomSheet
                    hasDraggableIcon
                    ref={bottomSheet}
                    height={400}
                    sheetBackgroundColor="#262626">
                    <View>
                      <View>
                        <TextInput
                          placeholder="Tìm kiếm"
                          placeholderTextColor={'#a7a7a7'}
                          style={styles.input}
                        />
                        <Feather
                          name="search"
                          size={20}
                          color={'#4d4d4d'}
                          style={{
                            position: 'absolute',
                            margin: 15,
                            paddingLeft: 10,
                          }}
                        />
                      </View>
                      <View>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              style={styles.sheetImage}
                              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                            />
                            <Text style={styles.sheetLabel}>
                              Thêm bài viết vào tin của bạn
                            </Text>
                          </View>
                          <View style={{ justifyContent: 'center' }}>
                            <AntDesign
                              name="right"
                              size={18}
                              color="#a4a4a4"
                              style={{
                                margin: 10,
                                alignItems: 'center',
                                marginRight: 20,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                      <View>
                        <FlatList
                          data={send}
                          keyExtractor={item => item.id}
                          renderItem={renderItem}
                        />
                      </View>
                    </View>
                  </BottomSheet>
                  <View>
                    <TouchableOpacity onPress={handlePress}>
                      <View style={{ marginRight: 20 }}>
                        <FontAwesome name="bookmark-o" size={24} color="white" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.likeText}>
                  {isLiked?.filter?.((like) => like?.post?._id === data?._id)?.length} lượt thích
                </Text>
                {/*description */}
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text style={styles.postName}>{data?.userPosting?.fullname}</Text>
                  <Text style={{ color: 'white', marginTop: 2 }}>
                    {' '}
                    {data?.description}
                  </Text>
                </View>

                <Text style={styles.comment} onPress={() =>
                  navigation.navigate({
                    name: 'Comment',
                    params:
                    {
                      allCmt: allCmt?.filter?.((cmt) => cmt?.posting?._id === data?._id),
                      image: data?.userPosting?.img,
                      user: data?.userPosting?.fullname,
                      explanation: data?.description,
                    },
                  })
                }>Xem thêm {allCmt?.filter?.((cmt) => cmt?.posting?._id === data?._id).length} bình luận </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    margin: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: data?.userPosting?.img }}
                    style={styles?.profilImageComment}
                  />
                  <Text style={{ opacity: 0.8, color: 'grey' }} onPress={() =>
                    navigation.navigate({
                      name: 'Comment',
                      params:
                      {
                        allCmt: allCmt?.filter?.((cmt) => cmt?.posting?._id === data?._id),
                        image: data?.userPosting?.img,
                        user: data?.userPosting?.fullname,
                        explanation: data?.description,
                      },
                    })
                  }>Thêm bình luận...</Text>
                </View>

                <Text style={styles.time}>{data?.updatedAt}</Text>
              </View>
            );
          })}
    </View>
  );
};

export default Post;
