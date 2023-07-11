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

import send from '../../storage/database/message';
import data from '../../storage/database/post';

import styles from './HomeComponents.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../views/context/AuthContext';

const Post = () => {
  const [like, setLike] = useState([]);
  const bottomSheet = useRef();
  //
  // const [token, setToken] = useState('');
  // const [data, setData] = useState([]);
  //
  const { postingPush, setPostingPush } = React.useContext(AuthContext)
  console.log("home component", postingPush[0])
  const checkLike = React.useCallback((currentLike, postName) => {
    return currentLike.find(item => item === postName);
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('Access_Token');
  //       const tokenParse = JSON.parse(storedToken);

  //       if (!tokenParse) {
  //         throw new Error('Token not found');
  //       }

  //       const response = await fetch('https://f-home-be.vercel.app/posts', {
  //         headers: {
  //           Authorization: `Bearer ${tokenParse.accessToken}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const responseData = await response?.json();
  //       setData(responseData);
  //     } catch (error) {
  //       console.log('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);



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
  const handleFlowPress = React.useCallback(
    postName => {
      setLike(currentFollow => {
        const isFollowed = checkLike(currentFollow, postName);

        if (isFollowed) {
          return currentFollow.filter(item => item !== postName);
        }

        return [...currentFollow, postName];
      });
    },
    [checkLike],
  );
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
  return (
    <View style={styles.line}>
      {postingPush.map((data, index) => {
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
              <Image
                source={{ uri: data?.img }}
                style={styles.ımage}
                alt="https://png.pngtree.com/png-clipart/20210128/ourmid/pngtree-nothing-no-variety-show-emoji-pack-png-image_2817567.jpg"
              />

            </View>

            <View style={styles.ıconContainer}>
              <View style={styles.leftIcon}>
                <TouchableOpacity
                  onPress={() => handleFlowPress(data?.postName)}>
                  <AntDesign
                    name={checkLike(like, data?.postName) ? 'heart' : 'hearto'}
                    size={24}
                    color={checkLike(like, data?.postName) ? 'red' : 'white'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate({
                      name: 'Comment',
                      params: {
                        image: data?.image,
                        user: data?.postName,
                        explanation: data?.explanation,
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
              {checkLike(like, data?.postName) ? data?.like + 1 : data?.like}{' '}
              lượt thích
            </Text>
            {/*description */}
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={styles.postName}>{data?.userPosting?.fullname}</Text>
              <Text style={{ color: 'white', marginTop: 2 }}>
                {' '}
                {data?.description}
              </Text>
            </View>
          
            <Text style={styles.comment}>Xem tất cả 19 bình luận</Text>

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
              <Text style={{ opacity: 0.8, color: 'grey' }}>Thêm bình luận...</Text>
            </View>

            <Text style={styles.time}>{data?.updatedAt}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Post;
