import React, { useRef, useState } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import send from "../../storage/database/message";

import styles from './DiscoverComponents.style';
import BottomModal from './BottomModal';
import BottomSheet from 'react-native-gesture-bottom-sheet';

const Reel = ({ item }) => {
  const ref = useRef(null);

  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const additionalHeight = 24;

  const height =
    Dimensions.get('window').height - bottomTabBarHeight - insets.top - additionalHeight;
  return (
    <View
      style={{
        height: height,
        justifyContent: 'flex-end',
      }}>
      <Image
        videoRef={ref}
        source={item.image}
        resizeMode="cover"
        repeat={true}
        style={{ ...styles.video, height: height }}
        muted={true}
      />

      <View
        style={{
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 20,
        }}>
        <Left item={item} />
        <Right item={item} />
      </View>
    </View>
  );
};
const Right = ({ item }) => {
  const [like, setLike] = useState(item.islike);
  const [commentText, setCommentText] = useState('');


  const bottomSheet = useRef();
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={item.image} style={styles.sheetImage} />
          <View>
            <Text style={styles.sheetLabel}>{item.user}</Text>
            <Text style={{ color: "#a2a2a2" }}>{item.username}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.right}>
      <TouchableOpacity onPress={() => setLike(!like)}>
        <AntDesign
          name={like ? 'heart' : 'hearto'}
          size={28}
          color={like ? 'red' : 'white'}
        />
      </TouchableOpacity>
      <Text style={styles.number}>{like ? item.likes + 1 : item.likes}</Text>
        <TouchableOpacity
          onPress={() => bottomSheet.current.show()}
        >
          <Ionicons name="chatbubble-outline" size={32} color="white" />
          <Text style={styles.number}>{item.comment}</Text>
        </TouchableOpacity>
        {/** cmt */}
        <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={90 + send.length*75}
        sheetBackgroundColor="#272727"
      >
        <View>
          <View>
            <View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={styles.sheetImage}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    }}
                  />
                  <Text style={styles.sheetLabel}>
                    Thêm bài viết vào tin của bạn
                  </Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <AntDesign
                    name="right"
                    size={18}
                    color="#a4a4a4"
                    style={{
                      margin: 10,
                      alignItems: "center",
                      marginRight: 20,
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <FlatList
                data={send}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </View>

          </View>
          <View style={styles.line} />

          <View style={styles.bottom}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles.imageUser}
                source={{ uri: "https://static.vecteezy.com/system/resources/previews/007/296/443/original/user-icon-person-icon-client-symbol-profile-icon-vector.jpg" }}
              />
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1, 
                borderColor: '#3a3a3a', 
                borderRadius: 50, 
                padding: 5, 
                width:350,
                }}>

                <TextInput
                  placeholder={`Comment under the name you want ...`}
                  placeholderTextColor="#969696"
                  style={styles.input}
                  value={commentText}
                  multiline 
                  onChangeText={setCommentText}
                />
                {!commentText.length ? (
                  <Text style={{ color: '#254253', marginLeft: -60, marginRight:10 }}>Đăng</Text>
                ) : (
                  <Text style={{ color: '#0096fd', marginLeft: -60 , marginRight:10 }} >Đăng</Text>
                )}
              </View>

            </View>
          </View>
        </View>

      </BottomSheet>
      {/**end */}
      <Feather name="send" size={28} color="white" style={styles.icons} />
      <Entypo
        name="dots-three-vertical"
        size={20}
        color="white"
        style={styles.icons}
      />
      <Image source={item.image} style={styles.imageBottom} />
    </View>
  );
};

const Left = ({ item }) => {
  const [follow, setFollow] = useState(item.follow);
  return (
    <View style={{ zIndex: 1, justifyContent: 'flex-end' }}>
      <View style={styles.footer}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.user}>{item.user}</Text>
        <TouchableOpacity
          onPress={() => setFollow(!follow)}
          style={{
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            width: follow ? 90 : 70,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Text style={styles.buttonText}>
            {follow ? 'Theo dõi ' : 'Takip'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.explanation}>{item.explanation}</Text>
      </View>
      <View style={styles.sound}>
        <AnimatedLottieView
          source={require('../../../assets/images/sound.json')}
          autoPlay
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.soundText}>{item.user}</Text>
        <Entypo name="dot-single" size={15} color="white" />
        <Text style={styles.soundText}>Nội dung âm thanh gốc</Text>
      </View>
    </View>
  );
};
export default Reel;

{/* <BottomModal visible={modalVisible} >
<ScrollView>
  <TouchableOpacity activeOpacity={1} onPress={hideModal}>
    <Text style={styless.modalText}>Close Modal</Text>
  </TouchableOpacity>
  <Text style={styless.modalText}>Hello, this is a modal content!</Text>
</ScrollView>
</BottomModal> */}
{/* <View style={styless.container}>
<TouchableOpacity onPress={showModal}>
 
</TouchableOpacity>



</View> */}
// const showModal = () => {
//   setModalVisible(true);
// };

// const hideModal = () => {
//   setModalVisible(false);
// };
// const styless = StyleSheet.create({
//   container: {
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   modalText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: "white"
//   },
// });