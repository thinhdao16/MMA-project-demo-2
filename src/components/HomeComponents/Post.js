import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
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

import send from "../../storage/database/message";
import data from "../../storage/database/post";

import styles from "./HomeComponents.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const navigation = useNavigation();
  const [isConfirmed , setIsConfirmed] = useState(false)
  const [isConfirmedPost, setIsConfirmedPost] = useState(false);
  const [reportPostText, setReportPostText] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [dataReportPost, setDataReportPost] = useState('')
  const toggleModalReport = (data) => {
    setModalVisible(!isModalVisible);
    setDataReportPost(data)
  };
  const handlePress = (id) => {
    if (isConfirmedPost) {
      // Gửi dữ liệu lên server
      sendDataToServerPost(id);
    } else {
      Alert.alert("Xác nhận", "Bạn có chắc chắn muốn không", [
        { text: "Hủy", style: "cancel" },
        { text: "Xác nhận", onPress: () => setIsConfirmedPost(true) },
      ]);
    }
  };
  const sendDataToServerPost = (id) => {
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
      })
  };

  const handleReport = (id) => {
    if (isConfirmed) {
      // Gửi dữ liệu lên server
      sendDataToServerReport(id);
    } else {
      Alert.alert("Xác nhận", "Bạn có chắc chắn muốn không", [
        { text: "Hủy", style: "cancel" },
        { text: "Xác nhận", onPress: () => setIsConfirmed(true) },
      ]);
    }
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
        console.log("error", error)
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
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
    console.log("first")

  }, []);
  return (
    <View>
      {/* Kiểm tra trạng thái isLoading */}
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
                              isLiked
                                ?.filter((f) => f?.post?._id === data?._id)
                                .filter((f) => f?.user?._id === accessToken?.user?.id)
                                ?.length > 0
                                ? handleDisLike(event, data?._id)
                                : handleLike(data?._id)
                            }
                          >
                            <AntDesign
                              name={
                                isLiked
                                  ?.filter((f) => f?.post?._id === data?._id)
                                  .filter(
                                    (f) => f?.user?._id === accessToken?.user?.id
                                  )?.length > 0
                                  ? "heart"
                                  : "hearto"
                              }
                              size={24}
                              color={
                                isLiked
                                  ?.filter((f) => f?.post?._id === data?._id)
                                  .filter(
                                    (f) => f?.user?._id === accessToken?.user?.id
                                  )?.length > 0
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
                            onPress={() => bottomSheet.current.show()}
                          >
                            <Feather name="send" size={24} color="white" />
                          </TouchableOpacity>
                        </View>
                        <BottomSheet
                          hasDraggableIcon
                          ref={bottomSheet}
                          height={400}
                          sheetBackgroundColor="#262626"
                        >
                          <View>
                            <View>
                              <TextInput
                                placeholder="Tìm kiếm"
                                placeholderTextColor={"#a7a7a7"}
                                style={styles.input}
                              />
                              <Feather
                                name="search"
                                size={20}
                                color={"#4d4d4d"}
                                style={{
                                  position: "absolute",
                                  margin: 15,
                                  paddingLeft: 10,
                                }}
                              />
                            </View>
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
    </View>


  );
};

export default Post;
