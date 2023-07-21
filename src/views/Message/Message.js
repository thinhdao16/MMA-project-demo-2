import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Container from '../../components/Container/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import message from '../../storage/database/message';

import styles from './styles';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import axios from 'axios';

const Message = ({ navigation }) => {
  const { transactions, accessToken, fetchAllData, isLoading } = React.useContext(AuthContext)
  const transactionChoose = transactions?.filter((status) => status?.status === "pending")?.filter((trans) => trans?.transaction_type === "auction")
  const handleFlowPress = (id) => {
    axios
      .put(
        `https://trading-stuff-be-iphg.vercel.app/transaction/confirm/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        ToastAndroid.show("Hóa đơn đã hoàn thành", ToastAndroid.SHORT);
        fetchAllData(accessToken.accessToken);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Hóa đơn chưa hoàn thành", ToastAndroid.SHORT);
      })
  };
  const handleDeleteTransaction = (id) => {
    axios
      .put(
        `https://trading-stuff-be-iphg.vercel.app/transaction/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        ToastAndroid.show("Hóa đơn đã hoàn thành", ToastAndroid.SHORT);
        fetchAllData(accessToken.accessToken);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Hóa đơn chưa hoàn thành", ToastAndroid.SHORT);
      })
  };
  return (
    <Container insets={{ bottom: true, top: true }}>
      <View style={styles.back}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableWithoutFeedback>
          <Text style={styles.userName}>Quay lại</Text>
        </View>
        <Feather
          name="edit"
          size={24}
          color="white"
          style={{ marginRight: 20 }}
        />
      </View>

      <ScrollView>
        <View style={{ marginTop: 10 }}>
          <SearchBar />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Gần đây</Text>
          <Text style={styles.title2}>Xem tất cả</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <View>
            {transactionChoose.map((data, index) => {
              const timeDiff = moment().diff(data?.updatedAt);
              const duration = moment.duration(timeDiff);

              const days = duration.days();
              const hours = duration.hours();
              const minutes = duration.minutes();
              const seconds = duration.seconds();
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate({
                      name: 'SingleMessage',
                      params: {
                        image: data.image,
                        name: data.user,
                        username: data.username,
                      },
                    });
                  }}>
                  <View style={styles.messageContainer}>
                    <Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />
                    <View style={{ marginLeft: 10, width: '42%', }}>
                      <Text style={styles.user}>{data?.transaction_category}</Text>
                      <Text style={{ fontSize: 1 }}>{data?.point}</Text>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        <Ionicons name="cash" size={15} color="white"/>
                        <Text style={{color:"white",marginRight:7, marginLeft:4}}>:</Text>
                        <Text style={styles.message}>{data?.point}</Text>
                        <Text style={{
                          marginHorizontal: 4,
                          color: '#a2a2a2',
                          fontSize:15,
                        }}>·</Text>
                        <Text style={styles.message}> {days > 0
                          ? `${days} ngày trước`
                          : hours > 0
                            ? `${hours} giờ trước`
                            : minutes > 0
                              ? `${minutes} phút trước`
                              : `${seconds} giây trước`}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          borderRadius: 10,
                          width: 60,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            '#0098fd',
                          marginLeft: 10,
                        }}
                        onPress={() => handleFlowPress(data?._id)}>
                        <Text style={styles.butonText}>Ok</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          borderRadius: 10,
                          width: 60,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            '#262626',
                          marginLeft: 10,
                        }}
                        onPress={() => handleDeleteTransaction(data?._id)}>
                        <Text style={styles.butonText}>Hủy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default Message;
