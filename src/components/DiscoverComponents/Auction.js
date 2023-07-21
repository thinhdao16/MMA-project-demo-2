import React, { useRef, useState } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import send from "../../storage/database/message";
import data from '../../storage/database/reels';

import styles from './DiscoverComponents.style';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { AuthContext } from '../../views/context/AuthContext';


function Auction(props) {

    const ref = useRef(null);

    const bottomTabBarHeight = useBottomTabBarHeight();
    const insets = useSafeAreaInsets();
    const additionalHeight = 24;
    const height =
        Dimensions.get('window').height - bottomTabBarHeight - insets.top - additionalHeight;

    const [like, setLike] = useState(data.islike);
    const [commentText, setCommentText] = useState('');
    const [auctionPost, setAuctionPost] = useState("");
    const flatListRef = React.useRef(null);
    const handleOpenBottomSheet = (data) => {
        bottomSheet.current.show();
        setAuctionPost(data);
    };

    const bottomSheet = useRef();
    // const renderItem = ({ data }) => {
    //     console.log("item render", data)
    //     return (
    //         <View style={{ flex: 1 }}>
    //             <View style={{ flexDirection: "row", alignItems: "center" }}>
    //                 <Image source={data.image} style={styles.sheetImage} />
    //                 <View>
    //                     <Text style={styles.sheetLabel}>{data.user}</Text>
    //                     <Text style={{ color: "#a2a2a2" }}>{data.username}</Text>
    //                 </View>
    //             </View>
    //         </View>
    //     );
    // };
    const [follow, setFollow] = useState(data?.follow);
    const {auctionData} = React.useContext(AuthContext)
    console.log(auctionData[0])
    return (
        <View>
            <ScrollView>
                {
                    auctionData?.map((data) => (
                        <View
                            style={{
                                height: height,
                                justifyContent: 'flex-end',
                            }}>
                            <Image
                                videoRef={ref}
                                source={{uri : data?.img}}
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
                                {/**left */}
                                <View style={{ zIndex: 1, justifyContent: 'flex-end' }}>
                                    <View style={styles.footer}>
                                        <Image style={styles.image} source={{uri: data?.user?.img}} />
                                        <Text style={styles.user}>{data?.user?.fullname}</Text>
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
                                        <Text style={styles.explanation}>{data?.description}</Text>
                                    </View>
                                    <View style={styles.sound}>
                                        <AnimatedLottieView
                                            source={require('../../../assets/images/sound.json')}
                                            autoPlay
                                            style={{ width: 24, height: 24 }}
                                        />
                                        <Text style={styles.soundText}>{data?.user?.fullname}</Text>
                                        <Entypo name="dot-single" size={15} color="white" />
                                        <Text style={styles.soundText}>Nội dung âm thanh gốc</Text>
                                    </View>
                                </View>
                                {/**right */}
                                <View style={styles.right}>
                                    <TouchableOpacity onPress={() => setLike(!like)}>
                                        <AntDesign
                                            name={like ? 'heart' : 'hearto'}
                                            size={28}
                                            color={like ? 'red' : 'white'}
                                        />
                                    </TouchableOpacity>
                                    {/* <Text style={styles.number}>{like ? data?.likes + 1 : data?.likes}</Text> */}
                                    <TouchableOpacity
                                        // onPress={() => handleOpenBottomSheet(data)}
                                    >
                                        <Ionicons name="chatbubble-outline" size={32} color="white" />
                                        <Text style={styles.number}>{data?.user?.fullname}</Text>
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
                                                {/* <View>
                                                    <FlatList
                                                        data={data}
                                                        renderItem={renderItem}
                                                        keyExtractor={(_item, index) => index.toString()}
                                                        horizontal={false}
                                                        ref={flatListRef}
                                                        numColumns={1}
                                                        showsVerticalScrollIndicator={false}
                                                        nestedScrollEnabled={true} // Set nestedScrollEnabled to true
                                                    />
                                                </View> */}

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
                                                        />
                                                        {!commentText.length ? (
                                                            <Text style={{ color: '#254253', marginLeft: -60, marginRight: 10 }}>Đăng</Text>
                                                        ) : (
                                                            <Text style={{ color: '#0096fd', marginLeft: -60, marginRight: 10 }} >Đăng</Text>
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
                                    <Image source={{uri: data?.user?.img}} style={styles.imageBottom} />
                                </View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </View>

    )
}


export default Auction
