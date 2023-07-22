import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import BottomSheet from "react-native-gesture-bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DoubleTap from "react-native-double-tap";
import AwesomeAlert from 'react-native-awesome-alerts';


import styles from "./HomeComponents.style";
import { AuthContext } from "../../views/context/AuthContext";
import axios from "axios";
import moment from "moment";

const Post = () => {



  const bottomSheet = useRef();
  const {
    postingPushPublished,
    allCmt,
    isLiked,
    setIsLiked,
    accessToken,
    fetchAllData,
    userProfile,
    isLoading, setIsLoading
  } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [isConfirmedPost, setIsConfirmedPost] = useState(false);
  const [reportPostText, setReportPostText] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [dataReportPost, setDataReportPost] = useState("");
  const [offerPost, setOfferPost] = useState("")
  const [offerPostText, setOfferPostText] = useState("")

  const [showReportAlert, setShowReportAlert] = useState(false);
  const [reportConfirmation, setReportConfirmation] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);


  const updateOfferPostText = (text) => {
    if (text === "") {
      setOfferPostText("");
    } else {
      const numericText = parseFloat(text);

      if (!isNaN(numericText) && numericText > 0 && numericText < offerPost.point) {
        setOfferPostText(text);
      } else {
        if (!isNaN(numericText) && numericText >= offerPost.point) {
          setOfferPostText((offerPost.point - 1).toString());
        } else {
          console.log("Invalid input. Please enter a number greater than 0 and less than the point value.");
        }
      }
    }
  };
  const toggleModalReport = (data) => {
    setModalVisible(!isModalVisible);
    setDataReportPost(data)
  };
  const handleOpenBottomSheet = (data) => {
    bottomSheet.current.show();
    setOfferPost(data)
  };

  const handlePress = (id) => {
    if (isConfirmedPost) {
      // Gửi dữ liệu lên server
      sendDataToServerPost(id);
    } else {
      setShowConfirmationAlert(true); // Show the AwesomeAlert for post confirmation
    }
  };


  const sendDataToServerPost = (id) => {
    axios
      .post(
        "https://trading-stuff-be-iphg.vercel.app/post/exchange",
        {
          postId: id,
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
        console.log(error)
        ToastAndroid.show("Bạn không đủ điểm", ToastAndroid.SHORT);
      })
  };

  const handleReport = (id) => {
    setReportConfirmation(false);
    setShowReportAlert(true);
  };

  const sendDataToServerReport = async (id) => {
    console.log("Gửi dữ liệu lên ", id);
    setIsLoading(false)
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
        setModalVisible(!isModalVisible);
        setReportPostText("")
      })
      .catch((error) => {
        console.log("error", error)
        ToastAndroid.show("Bạn đã báo cáo bài này", ToastAndroid.SHORT);
        setReportPostText("")
      })
      .finally((loading) => {
        setIsLoading(false)
      })
  };



  const handleDisLike = async (event, id) => {
    const idLike = isLiked?.find((like) => like?.post?._id === id && like?.user?._id === accessToken?.user?.id)?._id;
    event.preventDefault();
    setIsLoading(false);

    if (idLike) {

      axios
        .delete(`https://trading-stuff-be-iphg.vercel.app/favourite/delete/${idLike}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        })
        .then((response) => {
          console.log("dislike success");


          setIsLiked((prevIsLiked) => prevIsLiked.filter((like) => like?._id !== idLike));
        })
        .catch((error) => {
          console.error("Failed to add Dislike", error);
          fetchAllData(accessToken.accessToken);
          setIsLiked((prevIsLiked) => prevIsLiked.filter((like) => like?._id !== idLike));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {

      console.log("dont have idLike")
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
    console.log("first")

  }, []);
  const [likeLength, setLikeLength] = useState(null)

  const sendOffer = async (id) => {
    console.log("Gửi dữ liệu lên ", id);
    setIsLoading(false)
    axios
      .post(
        "https://trading-stuff-be-iphg.vercel.app/offer/create",
        {
          postId: id,
          description: offerPostText,
          point: offerPostText
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        ToastAndroid.show("Trả giá đã được gửi!", ToastAndroid.SHORT);
        fetchAllData(accessToken.accessToken);
        setOfferPostText("")
      })
      .catch((error) => {
        console.log("error", error)
        ToastAndroid.show("Trả chưa được gửi", ToastAndroid.SHORT);
        setOfferPostText("")
      })
      .finally((loading) => {
        setIsLoading(false)
      })
  };
  return (
    <View>

      {isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.line}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {Array.isArray(postingPushPublished) &&
              postingPushPublished
                .sort((a, b) => {
                  return (
                    new Date(b?.updatedAt).getTime() -
                    new Date(a?.updatedAt).getTime()
                  );
                })
                ?.map((data, index) => {
                  const timeDiff = moment().diff(data?.updatedAt);
                  const duration = moment.duration(timeDiff);

                  const days = duration.days();
                  const hours = duration.hours();
                  const minutes = duration.minutes();
                  const seconds = duration.seconds();

                  const likeLengthSV = isLiked?.filter((f) => f?.post?._id === data?._id).filter((f) => f?.user?._id === accessToken?.user?.id)?.length

                  const handleLike = async (id) => {
                    const idLike = isLiked?.find((like) => like?.post?._id === id && like?.user?._id === accessToken?.user?.id)?._id;


                    if (idLike) {

                      setIsLiked((prevIsLiked) => prevIsLiked.filter((like) => like?._id !== idLike));
                      setLikeLength((prevLikeLength) => Math.max(0, prevLikeLength - 1));
                    } else {

                      setIsLiked((prevIsLiked) => [...prevIsLiked, { post: { _id: id }, user: { _id: accessToken?.user?.id } }]);
                      setLikeLength((prevLikeLength) => prevLikeLength + 1);
                    }

                    setIsLoading(false);
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
                      })
                      .finally(() => {
                        setIsLoading(false);
                      });
                  };

                  return (
                    <View key={index} style={{ marginBottom: 10 }}>
                      {/* user */}
                      <View style={{ marginBottom: 5 }}>
                        <View style={styles.top}>
                          <View style={styles.topleft}>
                            <Image
                              source={{ uri: data?.user?.img }}
                              style={styles.profilImage}
                            />
                            <Text style={styles.title}>{data?.user?.fullname}</Text>
                          </View>
                          <TouchableOpacity
                            key={data?._id}
                            onPress={() => { toggleModalReport(data) }}
                            style={{ alignSelf: "center", marginRight: 15 }}
                          >
                            <Feather name="more-vertical" size={20} color="#F5F5F5" />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.pointPost}>{data?.typePost}</Text>
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
                              likeLengthSV && likeLengthSV > 0
                                ? handleDisLike(event, data?._id)
                                : handleLike(data?._id)
                            }
                          >
                            <AntDesign
                              name={
                                likeLengthSV && likeLengthSV > 0
                                  ? "heart"
                                  : isLiked
                                    ?.filter((f) => f?.post?._id === data?._id)
                                    .filter((f) => f?.user?._id === accessToken?.user?.id)?.length
                                    ? "heart"
                                    : "hearto"
                              }
                              size={24}
                              color={
                                likeLengthSV && likeLengthSV > 0
                                  ? "red"
                                  : isLiked
                                    ?.filter((f) => f?.post?._id === data?._id)
                                    .filter((f) => f?.user?._id === accessToken?.user?.id)?.length
                                    ? "red"
                                    : "white"
                              }
                            />
                          </TouchableOpacity>
                          {/* {allCmt?.filter?.((cmt) => cmt?.posting?._id === data?.id)} */}
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate({
                                name: "Comment",
                                params: {
                                  allCmt: allCmt?.filter?.(
                                    (cmt) => cmt?.post?._id === data?._id
                                  ),
                                  idPost: data?._id,
                                  image: data?.user?.img,
                                  user: data?.user?.fullname,
                                  explanation: data?.description,
                                },
                              })
                            }
                          >
                            <Feather name="message-circle" size={24} color="white" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            key={data?._id}
                            onPress={() => handleOpenBottomSheet(data)}
                          >
                            <Feather name="send" size={24} color="white" />
                          </TouchableOpacity>
                        </View>


                        <BottomSheet
                          hasDraggableIcon
                          ref={bottomSheet}
                          height={660}
                          sheetBackgroundColor="#262626"
                        >

                          <View>
                            <View>
                              <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Trả giá</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                  <Image source={{ uri: offerPost?.user?.img }} style={styles.sheetImage} />
                                  <View>
                                    <Text style={styles.sheetLabel}>{offerPost?.user?.fullname}</Text>
                                    <Text style={{ color: "#a2a2a2", fontWeight: 800 }}>Point: {offerPost?.point}</Text>
                                  </View>
                                </View>
                                <ScrollView>
                                  <View
                                    style={{ justifyContent: "center", alignItems: "center", }}
                                  >
                                    <Image
                                      style={{
                                        height: 350,
                                        width: 370,
                                        resizeMode: 'contain',
                                        margin: 5,
                                        alignItems: 'center',
                                        borderRadius: 20,
                                      }}
                                      source={{ uri: offerPost?.img }}
                                    />
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginTop: 5,
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Text style={styles.postName}>
                                      {offerPost?.user?.fullname}
                                    </Text>
                                    <Text style={{ color: "white", marginTop: 2 }}>
                                      {" "}
                                      {offerPost?.description}
                                    </Text>
                                  </View>

                                  <Text
                                    style={{ color: "#393949", fontSize: 18, marginLeft: 14 }}
                                  >
                                    Trả giá (gốc : {offerPost?.point})
                                  </Text>
                                  <View>
                                    <TextInput
                                      value={offerPostText}
                                      onChangeText={(text) => updateOfferPostText(text)}
                                      keyboardType="numeric"
                                      placeholder="Input report"
                                      placeholderTextColor="grey"
                                      style={styles.textInputReport}
                                    />
                                    <Feather
                                      name="flag"
                                      size={20}
                                      color="white"
                                      style={styles.iconInput}
                                    />
                                  </View>
                                </ScrollView>
                                <View
                                  style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // marginTop: 15,
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      sendOffer(offerPost?._id);
                                    }}
                                    style={styles.btnImagePostOffer}
                                  >
                                    <Text
                                      style={{
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 17,
                                      }}
                                    >
                                      Trả giá
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        </BottomSheet>
                        <View>
                          {data?.user._id === userProfile._id ? null : (
                            <TouchableOpacity
                              onPress={() => {
                                handlePress(data?._id);
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginRight: 20,
                                }}
                              >
                                <Text style={{ color: "white" }}>{data?.point}</Text>
                                {data?.typePost === "receive" && (
                                  <AntDesign name="plus" color="#48cb61" size={18} />
                                )}
                                {data?.typePost === "give" && (
                                  <AntDesign name="minus" color="#ff0000" size={18} />
                                )}
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>

                      <Text style={styles.likeText}>
                        {isLiked?.filter?.((like) => like?.post?._id === data?._id)
                          ?.length === 0
                          ? "0"
                          : isLiked?.filter?.((like) => like?.post?._id === data?._id)
                            ?.length}{" "}
                        lượt thích
                      </Text>

                      {/*description */}
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={styles.postName}>
                          {data?.user?.fullname}
                        </Text>
                        <Text style={{ color: "white", marginTop: 2 }}>
                          {" "}
                          {data?.description}
                        </Text>
                      </View>

                      <Text
                        style={styles.comment}
                        onPress={() =>
                          navigation.navigate({
                            name: "Comment",
                            params: {
                              allCmt: allCmt?.filter?.(
                                (cmt) => cmt?.posting?._id === data?._id
                              ),
                              image: data?.user?.img,
                              user: data?.user?.fullname,
                              explanation: data?.description,
                            },
                          })
                        }
                      >
                        Xem thêm{" "}
                        {
                          allCmt?.filter?.((cmt) => cmt?.post?._id === data?._id)
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
                          source={{ uri: data?.user?.img }}
                          style={styles?.profilImageComment}
                        />
                        <Text
                          style={{ opacity: 0.8, color: "grey" }}
                          onPress={() =>
                            navigation.navigate({
                              name: "Comment",
                              params: {
                                allCmt: allCmt?.filter?.(
                                  (cmt) => cmt?.posting?._id === data?._id
                                ),
                                image: data?.user?.img,
                                user: data?.user?.fullname,
                                explanation: data?.description,
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

                  );
                })}
          </ScrollView>
          <Modal isVisible={isModalVisible} style={{ maxHeight: 900 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{
                flex: 1,
                backgroundColor: "#1c1c24",
                borderRadius: 28,
                ...Platform.select({
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                  },
                  android: {
                    elevation: 5,
                  }
                })
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
                  <FontAwesome name="times-circle" size={40} color="white" onPress={toggleModalReport} />
                </View>

                <View style={{ flex: 1, }}>
                  <View style={{ marginBottom: 5 }}>
                    <View style={styles.top}>
                      <View style={styles.topleft}>
                        <Image
                          source={{ uri: dataReportPost?.user?.img }}
                          style={styles.profilImage}
                        />
                        <Text style={styles.title}>{dataReportPost?.user?.fullname}</Text>
                      </View>
                    </View>
                    <Text style={styles.pointPost}>{dataReportPost?.typePost}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={styles.image_bank} source={{ uri: dataReportPost?.img }} />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 10 }}>
                    <Text style={styles.postName}>
                      {dataReportPost?.user?.fullname}
                    </Text>
                    <Text style={{ color: "white", marginTop: 2 }}>
                      {" "}
                      {dataReportPost?.description}
                    </Text>
                  </View>

                  <Text style={{ color: "#393949", fontSize: 18, marginLeft: 14 }}>Description report:</Text>
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
                  <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                    <TouchableOpacity onPress={() => { handleReport(dataReportPost?._id) }} style={styles.btnImagePost}>
                      <Text style={{ color: "white", fontWeight: 700, fontSize: 17 }}>
                        Báo cáo
                      </Text>
                    </TouchableOpacity>
                  </View>


                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      )}
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
          setIsConfirmedPost(true);
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
    </View>


  );
};

export default Post;
