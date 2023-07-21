import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DoubleTap from "react-native-double-tap";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeAlert from 'react-native-awesome-alerts';


import Container from "../../components/Container/Container";

import styles from "../../components/HomeComponents/HomeComponents.style";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";

const SingleSearch = () => {
    const navigation = useNavigation();
    const bottomSheet = React.useRef();


    const {
        singlePage,
        allCmt,
        isLiked,
        accessToken,
        fetchAllData,
        userProfile,
    } = React.useContext(AuthContext);
    console.log("singlesearch", singlePage);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [reportPostText, setReportPostText] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [dataReportPost, setDataReportPost] = useState("");


    const [showReportAlert, setShowReportAlert] = useState(false);
    const [reportConfirmation, setReportConfirmation] = useState(false);
    const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

    const toggleModalReport = (data) => {
        setModalVisible(!isModalVisible);
        setDataReportPost(data);
    };
    const handlePress = (id) => {
        if (isConfirmed) {
            // Gửi dữ liệu lên server
            sendDataToServerPost(id);
        } else {
            setShowConfirmationAlert(true);
        }
    };
    const sendDataToServerPost = async (id) => {
        console.log("Gửi dữ liệu lên ", id);
        axios
            .post(
                "https://trading-stuff-be-iphg.vercel.app/post/exchange",
                {
                    id: id,
                    message: "app qua hoan hoa",
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                ToastAndroid.show("Bạn tương tác thành công!", ToastAndroid.SHORT);
                fetchAllData(accessToken.accessToken);
            })
            .catch((error) => {
                ToastAndroid.show("Bạn không đủ điểm", ToastAndroid.SHORT);
            });
    };
    const handleReport = (id) => {
        setReportConfirmation(false);
        setShowReportAlert(true);
    };
    const sendDataToServerReport = async (id) => {
        console.log("Gửi dữ liệu lên ", id);
        axios
            .post(
                "https://trading-stuff-be-iphg.vercel.app/report/create",
                {
                    postId: id,
                    description: reportPostText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                ToastAndroid.show("Bạn báo cáo thành công!", ToastAndroid.SHORT);
                fetchAllData(accessToken.accessToken);
            })
            .catch((error) => {
                console.log("error", error);
                ToastAndroid.show("Bạn không được báo cáo", ToastAndroid.SHORT);
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
    return (
        <Container insets={{ top: true, bottom: true }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginBottom: 7,
                        marginRight: 25,
                    }}>Post</Text>
                </View>
            </View>
            <View
                style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "grey",
                }}
            />
            <View style={{ marginBottom: 10, }}>
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
                        <TouchableOpacity
                            key={singlePage?._id}
                            onPress={() => { toggleModalReport(singlePage) }}
                            style={{ alignSelf: "center", marginRight: 15 }}
                        >
                            <Feather name="more-vertical" size={20} color="#F5F5F5" />
                        </TouchableOpacity>
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
                                        .filter(
                                            (f) => f?.user?._id === accessToken?.user?.id
                                        )?.length > 0
                                        ? "heart"
                                        : "hearto"
                                }
                                size={24}
                                color={
                                    isLiked
                                        ?.filter((f) => f?.post?._id === singlePage?._id)
                                        .filter(
                                            (f) => f?.user?._id === accessToken?.user?.id
                                        )?.length > 0
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
                            onPress={() => bottomSheet.current.show()}
                        >
                            <Feather name="send" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        {singlePage?.user._id === userProfile._id ? null : (
                            <TouchableOpacity
                                onPress={() => {
                                    handlePress(singlePage?._id);
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginRight: 20,
                                    }}
                                >
                                    <Text style={{ color: "white" }}>{singlePage?.point}</Text>
                                    {singlePage?.typePost === "receive" && (
                                        <AntDesign name="plus" color="#48cb61" size={18} />
                                    )}
                                    {singlePage?.typePost === "give" && (
                                        <AntDesign name="minus" color="#ff0000" size={18} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
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
                    <Text style={styles.postName}>
                        {singlePage?.user?.fullname}
                    </Text>
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
                                image: singlePage?.user?.img,
                                user: singlePage?.user?.fullname,
                                explanation: singlePage?.description,
                            },
                        })
                    }
                >
                    Xem thêm{" "}
                    {
                        allCmt?.filter?.((cmt) => cmt?.post?._id === singlePage?._id)
                            .length
                    }{" "}
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

                <Text style={{
                    color: 'white',
                    marginTop: 5,
                    marginLeft: 15,
                }}> {days > 0
                    ? `${days} ngày trước`
                    : hours > 0
                        ? `${hours} giờ trước`
                        : minutes > 0
                            ? `${minutes} phút trước`
                            : `${seconds} giây trước`}</Text>
                {/** start modal */}

                {/*end modal */}
            </View>

            <Modal isVisible={isModalVisible} style={{ maxHeight: 900 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#1c1c24",
                            borderRadius: 28,
                            ...Platform.select({
                                ios: {
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                },
                                android: {
                                    elevation: 5,
                                },
                            }),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                padding: 10,
                            }}
                        >
                            <FontAwesome
                                name="times-circle"
                                size={40}
                                color="white"
                                onPress={toggleModalReport}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={{ marginBottom: 5 }}>
                                <View style={styles.top}>
                                    <View style={styles.topleft}>
                                        <Image
                                            source={{ uri: dataReportPost?.user?.img }}
                                            style={styles.profilImage}
                                        />
                                        <Text style={styles.title}>
                                            {dataReportPost?.user?.fullname}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.pointPost}>{dataReportPost?.typePost}</Text>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    style={styles.image_bank}
                                    source={{ uri: dataReportPost?.img }}
                                />
                            </View>
                            <View
                                style={{ flexDirection: "row", marginTop: 5, marginBottom: 10 }}
                            >
                                <Text style={styles.postName}>
                                    {dataReportPost?.user?.fullname}
                                </Text>
                                <Text style={{ color: "white", marginTop: 2 }}>
                                    {" "}
                                    {dataReportPost?.description}
                                </Text>
                            </View>

                            <Text style={{ color: "#393949", fontSize: 18, marginLeft: 14 }}>
                                Description report:
                            </Text>
                            <View>
                                <TextInput
                                    value={reportPostText}
                                    onChangeText={setReportPostText}
                                    placeholder="Input report"
                                    placeholderTextColor="grey"
                                    style={styles.textInput}
                                />
                                <Feather
                                    name="flag"
                                    size={20}
                                    color="white"
                                    style={styles.iconInput}
                                />
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
                                        handleReport(dataReportPost?._id);
                                    }}
                                    style={styles.btnImagePost}
                                >
                                    <Text
                                        style={{ color: "white", fontWeight: 700, fontSize: 17 }}
                                    >
                                        Báo cáo
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>

            <AwesomeAlert

                show={showReportAlert}
                showProgress={false}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn không?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Hủy"
                confirmText="Xác nhận"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => setShowReportAlert(false)}
                onConfirmPressed={() => {
                    sendDataToServerReport(dataReportPost?._id);
                    setReportConfirmation(true);
                    setShowReportAlert(false);
                }}
                alertContainerStyle={{
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                }}
                titleStyle={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'bold',
                }}
                messageStyle={{
                    color: 'black',
                    fontSize: 18,
                }}

            />


            <AwesomeAlert
                title="Xác nhận"
                showProgress={false}
                message="Bạn có chắc chắn muốn không?"
                cancelText="Hủy"
                confirmText="Xác nhận"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                confirmButtonColor="#DD6B55"
                show={showConfirmationAlert}
                onCancelPressed={() => setShowConfirmationAlert(false)}
                onConfirmPressed={() => {
                    sendDataToServerPost(dataReportPost?._id);
                    setIsConfirmed(true);
                    setShowConfirmationAlert(false);
                }}
                alertContainerStyle={{
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                }}
                titleStyle={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'bold',
                }}
                messageStyle={{
                    color: 'black',
                    fontSize: 18,
                }}
            />
        </Container>
    );
};
export default SingleSearch;
