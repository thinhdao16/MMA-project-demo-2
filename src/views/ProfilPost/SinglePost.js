import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";
import BottomSheet from "react-native-gesture-bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DoubleTap from "react-native-double-tap";
import Ionicons from "react-native-vector-icons/Ionicons";

import Container from "../../components/Container/Container";

import styles from "../../components/HomeComponents/HomeComponents.style";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SinglePost = () => {
    const navigation = useNavigation();
    const bottomSheet = React.useRef();
    const flatListRef = React.useRef(null);

    const {
        singlePage,
        allCmt,
        isLiked,
        setIsLiked,
        accessToken,
        fetchAllData,
        userProfile,
        postingPushPublished,
        setIsLoading,
    } = React.useContext(AuthContext);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [offerPost, setOfferPost] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isPendingUpdated, setIsPendingUpdated] = useState(null);
    const [dataOfferPost, setDataOfferPost] = useState("")
    React.useEffect(() => {
        if (offerPost) {
            setIsLoading(false)
            axios
                .get(
                    `https://trading-stuff-be-iphg.vercel.app/offer/post/${singlePage?._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken.accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    ToastAndroid.show("Đây là bài viết của bạn !", ToastAndroid.SHORT);
                    const pendingOffers = response.data.data.filter((item) => item.status === "pending");
                    setDataOfferPost(pendingOffers);
                })
                .catch((error) => {
                    console.log("error", error)
                    ToastAndroid.show("Nothing", ToastAndroid.SHORT);
                })
                .finally((loading) => {
                    setIsLoading(false)
                })
        }
    }, [singlePage, isPendingUpdated])

    const handleOpenBottomSheet = (data) => {
        bottomSheet.current.show();
        setOfferPost(data);
    };
    const handleApprovedOffer = async (id) => {
        const accessToken = await AsyncStorage.getItem('Access_Token');
        const dataToken = JSON.parse(accessToken);

        axios
            .put(
                `https://trading-stuff-be-iphg.vercel.app/offer/approve/${selectedItemId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${dataToken.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                ToastAndroid.show("Bạn tương tác thành công!", ToastAndroid.SHORT);
                setIsPendingUpdated((prev) => !prev);
                // fetchAllData(accessToken.accessToken);
            })
            .catch((error) => {
                ToastAndroid.show("Bạn không đủ điểm", ToastAndroid.SHORT);
            });
    };

    const handleRejectedOffer = async (id) => {
        const accessToken = await AsyncStorage.getItem('Access_Token');
        const dataToken = JSON.parse(accessToken);

        axios
            .put(
                `https://trading-stuff-be-iphg.vercel.app/offer/reject/${selectedItemId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${dataToken.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                ToastAndroid.show("Bạn tương tác thành công!", ToastAndroid.SHORT);
                setIsPendingUpdated((prev) => !prev);
                // fetchAllData(accessToken.accessToken);
            })
            .catch((error) => {
                ToastAndroid.show("Bạn không đủ điểm", ToastAndroid.SHORT);
            });
    };
    const handleLike = async (id) => {
        console.log(id);
        axios
            .post(
                "https://trading-stuff-be-iphg.vercel.app/favourite/create",
                { postId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken.accessToken}`,
                    },
                }
            )
            .then((response) => {
                console.log("like success");
                fetchAllData(accessToken.accessToken);
            })
            .catch((error) => {
                console.error("Failed to add like", error);
            });
    };
    const handleDisLike = async (event, id) => {
        const idLike = isLiked?.filter((like) => like?.post?._id === id)?.[0]._id;
        event.preventDefault();
        axios
            .delete(
                `https://trading-stuff-be-iphg.vercel.app/favourite/delete/${idLike}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken.accessToken}`,
                    },
                }
            )
            .then((response) => {
                console.log("dislike success");
                fetchAllData(accessToken.accessToken);
            })
            .catch((error) => {
                console.error("Failed to add Dislike", error);
            });
    };
    const timeDiff = moment().diff(singlePage?.updatedAt);
    const duration = moment.duration(timeDiff);

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedItemId(item?._id); // Update the selected item ID when clicked
                }}
                style={{
                    // flexDirection: selectedItemId === item?._id ? 'row' : "row",
                    justifyContent: selectedItemId === item?._id ? 'center' : "center",
                    // alignItems: selectedItemId === item?._id ? 'center' : "center",
                    borderWidth: selectedItemId === item?._id ? 1 : 0, // Numeric value, not a string
                    borderColor: selectedItemId === item?._id ? '#f7f7f8' : "#262626",
                    borderRadius: selectedItemId === item?._id ? 15 : 0, // Numeric value, not a string
                    backgroundColor: selectedItemId === item?._id ? "#262626" : "transparent", // Apply a different background color to the selected item
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: item?.user_id?.img }} style={styles.sheetImage} />
                    <View>
                        <Text style={styles.sheetLabel}>{item?.user_id?.fullname}</Text>
                        <Text style={{ color: "#a2a2a2" }}>{item?.point}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <Container insets={{ top: true, bottom: true }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 10,
                    marginTop: 10,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 22,
                            fontWeight: "bold",
                            marginBottom: 7,
                            marginRight: 25,
                        }}
                    >
                        Post
                    </Text>
                </View>
            </View>

            <View
                style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "grey",
                }}
            />
            <View style={{ marginBottom: 10 }}>
                {/* user */}
                <View style={{ marginBottom: 5 }}>
                    <View style={styles.top}>
                        <View style={styles.topleft}>
                            <Image
                                source={{ uri: singlePage?.user?.img }}
                                style={styles.profilImage}
                            />
                            <Text style={styles.title}>{singlePage?.user?.fullname}</Text>
                        </View>
                    </View>
                    <Text style={styles.pointPost}>{singlePage?.typePost}</Text>
                </View>

                {/*img post*/}
                <View style={{ height: 400 }}>
                    <DoubleTap doubleTap={() => handleLike(singlePage?._id)}>
                        <Image
                            source={{ uri: singlePage?.img }}
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
                                    ?.filter((f) => f?.post?._id === singlePage?._id)
                                    .filter((f) => f?.user?._id === accessToken?.user?.id)
                                    ?.length > 0
                                    ? handleDisLike(event, singlePage?._id)
                                    : handleLike(singlePage?._id)
                            }
                        >
                            <AntDesign
                                name={
                                    isLiked
                                        ?.filter((f) => f?.post?._id === singlePage?._id)
                                        .filter((f) => f?.user?._id === accessToken?.user?.id)
                                        ?.length > 0
                                        ? "heart"
                                        : "hearto"
                                }
                                size={24}
                                color={
                                    isLiked
                                        ?.filter((f) => f?.post?._id === singlePage?._id)
                                        .filter((f) => f?.user?._id === accessToken?.user?.id)
                                        ?.length > 0
                                        ? "red"
                                        : "white"
                                }
                            />
                        </TouchableOpacity>
                        {/* {allCmt?.filter?.((cmt) => cmt?.posting?._id === singlePage?.id)} */}
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate({
                                    name: "Comment",
                                    params: {
                                        allCmt: allCmt?.filter?.(
                                            (cmt) => cmt?.post?._id === singlePage?._id
                                        ),
                                        idPost: singlePage?._id,
                                        image: singlePage?.user?.img,
                                        user: singlePage?.user?.fullname,
                                        explanation: singlePage?.description,
                                    },
                                })
                            }
                        >
                            <Feather name="message-circle" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            key={singlePage?._id}
                            onPress={() => handleOpenBottomSheet(singlePage)}
                        >
                            <Feather name="send" size={24} color="white" />
                        </TouchableOpacity>
                        <BottomSheet
                            hasDraggableIcon
                            ref={bottomSheet}
                            height={300 + dataOfferPost?.length * 50}
                            sheetBackgroundColor="#262626"
                        >
                            <View>
                                <View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
                                            Trả giá
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Image source={{ uri: offerPost?.user?.img }} style={styles.sheetImage} />
                                            <View>
                                                <Text style={styles.sheetLabel}>{offerPost?.user?.fullname}</Text>
                                                <Text style={{ color: "#a2a2a2", fontWeight: "800" }}>
                                                    Point: {offerPost?.point}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.line} />
                                        <View style={{ maxHeight: 400, marginTop: 10 }}>
                                            <ScrollView>
                                                <FlatList
                                                    ref={flatListRef}
                                                    horizontal={false}
                                                    data={dataOfferPost}
                                                    keyExtractor={(_item, index) => index.toString()}
                                                    renderItem={renderItem}
                                                    numColumns={1}
                                                    showsVerticalScrollIndicator={false}
                                                    nestedScrollEnabled={true} // Set nestedScrollEnabled to true
                                                />
                                            </ScrollView>
                                        </View>
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginTop: 15,
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleApprovedOffer(offerPost?._id);
                                                }}
                                                style={styles.btnImagePost}
                                            >
                                                <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>Đồng ý</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleRejectedOffer(offerPost?._id);
                                                }}
                                                style={styles.btnImageReOf}
                                            >
                                                <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>Loại bỏ</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </BottomSheet>

                    </View>
                </View>

                <Text style={styles.likeText}>
                    {isLiked?.filter?.((like) => like?.post?._id === singlePage?._id)
                        ?.length === 0
                        ? "0"
                        : isLiked?.filter?.((like) => like?.post?._id === singlePage?._id)
                            ?.length}{" "}
                    lượt thích
                </Text>

                {/*description */}
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Text style={styles.postName}>{singlePage?.user?.fullname}</Text>
                    <Text style={{ color: "white", marginTop: 2 }}>
                        {" "}
                        {singlePage?.description}
                    </Text>
                </View>

                <Text
                    style={styles.comment}
                    onPress={() =>
                        navigation.navigate({
                            name: "Comment",
                            params: {
                                allCmt: allCmt?.filter?.(
                                    (cmt) => cmt?.posting?._id === singlePage?._id
                                ),
                                idPost: singlePage?._id,
                                image: singlePage?.user?.img,
                                user: singlePage?.user?.fullname,
                                explanation: singlePage?.description,
                            },
                        })
                    }
                >
                    Xem thêm{" "}
                    {allCmt?.filter?.((cmt) => cmt?.post?._id === singlePage?._id).length}{" "}
                    bình luận{" "}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={{ uri: singlePage?.user?.img }}
                        style={styles?.profilImageComment}
                    />
                    <Text
                        style={{ opacity: 0.8, color: "grey" }}
                        onPress={() =>
                            navigation.navigate({
                                name: "Comment",
                                params: {
                                    allCmt: allCmt?.filter?.(
                                        (cmt) => cmt?.posting?._id === singlePage?._id
                                    ),
                                    image: singlePage?.user?.img,
                                    user: singlePage?.user?.fullname,
                                    explanation: singlePage?.description,
                                },
                            })
                        }
                    >
                        Thêm bình luận...
                    </Text>
                </View>

                <Text
                    style={{
                        color: "white",
                        marginTop: 5,
                        marginLeft: 15,
                    }}
                >
                    {" "}
                    {days > 0
                        ? `${days} ngày trước`
                        : hours > 0
                            ? `${hours} giờ trước`
                            : minutes > 0
                                ? `${minutes} phút trước`
                                : `${seconds} giây trước`}
                </Text>
                {/** start modal */}

                {/*end modal */}
            </View>
        </Container>
    );
};
export default SinglePost;
