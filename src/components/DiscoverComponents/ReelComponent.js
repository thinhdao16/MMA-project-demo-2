import React, { useContext, useRef, useState } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
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
import { AuthContext } from '../../views/context/AuthContext';
import axios from 'axios';




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
        source={{ uri: item?.img }}
        resizeMode="contain"
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
  const itemArray = [item]
  const { setIsLoading, accessToken, fetchAllData ,userProfile} = useContext(AuthContext)
  const [isPendingUpdated, setIsPendingUpdated] = useState(null);
  const [like, setLike] = useState(item.islike);
  const [commentText, setCommentText] = useState('');
  const [auctionPost, setAuctionPost] = useState("");
  const flatListRef = React.useRef(null);
  const [dataAuctionInPost, setDataAuctionInPost] = useState("")

  const bidders = dataAuctionInPost[0]?.bidders;
  const maxBidAmount = bidders?.reduce((max, bidder) => {
    return bidder.bidAmount > max ? bidder.bidAmount : max;
  }, 0);
  const maxBidAmountUser = bidders?.reduce((max, bidder) => {
    if (bidder.user?._id === userProfile?._id) {
      return bidder.bidAmount > max ? bidder.bidAmount : max;
    }
    return max;
  }, 0);
  const plusBid = dataAuctionInPost[0]?.bidStep + dataAuctionInPost[0]?.minPoint + maxBidAmount - maxBidAmountUser 

  console.log(plusBid); 
  const handleOpenBottomSheet = (data) => {
    bottomSheet.current.show();
    setAuctionPost(data);
  };
  const bottomSheet = useRef();

  React.useEffect(() => {
    if (auctionPost) {
      setIsLoading(false)
      axios
        .get(
          `https://trading-stuff-be-iphg.vercel.app/auction/post/${auctionPost[0]?._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === 'done') {
            // Hiển thị thông báo phiên đấu giá đã kết thúc
            ToastAndroid.show('Phiên đấu giá đã kết thúc', ToastAndroid.SHORT);
          } else {
            setDataAuctionInPost(response.data)
          }

        })
        .catch((error) => {
          // console.log("error", error)
          // ToastAndroid.show("Không có phiên đấu giá", ToastAndroid.SHORT);
        })
        .finally((loading) => {
          setIsLoading(false)
        })
    }
  }, [auctionPost, isPendingUpdated])

  const handleUploadImage = async () => {
    try {
      const response = await axios.post(
        'https://trading-stuff-be-iphg.vercel.app/auction/create',
        {
          bidAmount: commentText,
          postId: auctionPost[0]?._id
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchAllData(accessToken.accessToken)
      ToastAndroid.show('Đấu giá thành công !', ToastAndroid.SHORT);
      setCommentText('')
    } catch (error) {
      console.log(error)
      ToastAndroid.show('Đấu giá thất bại !', ToastAndroid.SHORT);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: item?.user?.img }} style={styles.sheetImage} />
          <View>
            <Text style={styles.sheetLabel}>{item?.user?.fullname}</Text>
            <Text style={{ color: '#a2a2a2' }}>{item?.bidAmount}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.right}>
      <TouchableOpacity onPress={() => setLike(!like)}>
        <AntDesign
          name={like ? 'heart' : 'hearto'}
          size={28}
          color={like ? 'red' : 'white'}
        />
      </TouchableOpacity>
      <Text style={styles.number}>56</Text>
      <TouchableOpacity
        onPress={() => handleOpenBottomSheet(itemArray)}
        style={{ alignItems: 'center' }}
      >
        <Ionicons name="chatbubble-outline" size={32} color="white" />
        <Text style={styles.number}>Vô</Text>
      </TouchableOpacity>
      {/** cmt */}
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={90 + send.length * 75}
        sheetBackgroundColor="#272727"
      >
        <View>
          <View>
            <View>
              <View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Đấu giá</Text>
                </View>
              </View>
            </View>
            <View>
              <FlatList
                data={dataAuctionInPost[0]?.bidders}
                renderItem={renderItem}
                keyExtractor={(_item, index) => index.toString()}
                horizontal={false}
                ref={flatListRef}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true} // Set nestedScrollEnabled to true
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
                width: 350,
              }}>

                <TextInput
                  placeholder={`Comment under the name you want ...`}
                  placeholderTextColor="#969696"
                  style={styles.input}
                  value={commentText}
                  multiline
                  onChangeText={setCommentText}
                  keyboardType="numeric"
                />
                {!commentText.length ? (
                  <Text style={{ color: '#254253', marginLeft: -60, marginRight: 10 }}>Đăng</Text>
                ) : (
                  <Text style={{ color: '#0096fd', marginLeft: -60, marginRight: 10 }} onPress={handleUploadImage} >Đăng</Text>
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
      <Image source={{ uri: item?.img }} style={styles.imageBottom} />
    </View>
  );
};

const Left = ({ item }) => {
  const [follow, setFollow] = useState(item.follow);
  return (
    <View style={{ zIndex: 1, justifyContent: 'flex-end' }}>
      <View style={styles.footer}>
        <Image style={styles.image} source={{ uri: item?.user?.img }} />
        <Text style={styles.user}>{item?.user?.fullname}</Text>
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
        <Text style={styles.explanation}>{item?.description}</Text>
      </View>
      <View style={styles.sound}>
        <AnimatedLottieView
          source={require('../../../assets/images/sound.json')}
          autoPlay
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.soundText}>Bắt đầu {item?.minPoint}</Text>
        <Entypo name="dot-single" size={15} color="white" />
        <Text style={styles.soundText}>Bước nhảy {item?.bidStep}</Text>
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