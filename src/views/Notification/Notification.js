import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Container/Container';
import notification from '../../storage/database/notification';

import styles from './Notification.style';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color="white" />
      </TouchableWithoutFeedback>
      <Text style={styles.headerText}>Thông báo</Text>
    </View>
  );
};

const Notification = () => {

  const { transactions, accessToken, fetchAllData, isLoading } = React.useContext(AuthContext)
  const transactionChoose = transactions?.filter((status) => status?.status === "pending")?.filter((trans) => trans?.transaction_type === "give")
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
    <Container insets={{ top: true }}>
      <Header />
      <ScrollView>
        <View>
          <Text style={styles.time}>Tuần này</Text>
        </View>
        <View>
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
                  <View key={index}>
                    <View style={styles.container}>
                      <View>
                        <Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} />
                      </View>

                      <View
                        style={{
                          width: '26%',
                          marginLeft: 15,
                        }}>
                        <Text style={styles.user}>
                          {data?.transaction_category} | {' '}
                          <Text style={styles.message}>{data?.transaction_type}</Text>
                        </Text>
                        <Text style={styles.message}>Point: {data?.point}</Text>
                      </View>
                      <View
                        style={{
                          width: '15%',
                          marginLeft: 15,
                        }}>
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
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default Notification;
