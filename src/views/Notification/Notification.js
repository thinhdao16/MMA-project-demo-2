import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
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
  const [follow, setFollow] = useState([]);

  const checkFollow = React.useCallback((currentFollow, user) => {
    return currentFollow.find(item => item === user);
  }, []);

  const handleFlowPress = React.useCallback(
    user => {
      setFollow(currentFollow => {
        const isFollowed = checkFollow(currentFollow, user);

        if (isFollowed) {
          return currentFollow.filter(item => item !== user);
        }

        return [...currentFollow, user];
      });
    },
    [checkFollow],
  );

const {transactions} = React.useContext(AuthContext)
console.log(transactions[0])
  return (
    <Container insets={{ top: true }}>
      <Header />
      <ScrollView>
        <View>
          <Text style={styles.time}>Tuần này</Text>
        </View>
        <View>
          {transactions.map((data, index) => {
            return (
              <View key={index}>
                <View style={styles.container}>
                  <View>
                    <Image style={styles.image} source={{uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}} />
                  </View>

                  <View
                    style={{
                      width: '46%',
                      marginLeft: 15,
                    }}>
                    <Text style={styles.user}>
                    {data?.transaction_category}{' '}
                      <Text style={styles.message}>{data?.point}</Text>
                    </Text>
                    <Text style={styles.message}>{data?.point}</Text>

                  </View>

                  <View style={{ alignContent: 'center' }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        borderRadius: 10,
                        width: 120,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: checkFollow(follow, data.user)
                          ? '#262626'
                          : '#0098fd',
                        marginLeft: 10,
                      }}
                      onPress={() => handleFlowPress(data.user)}>
                      {checkFollow(follow, data.user) ? (
                        <Text style={styles.butonText}>Hủy theo dõi</Text>
                      ) : (
                        <Text style={styles.butonText}>Theo dõi</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>
            );
          })}
          <View style={styles.line} />
          <Text style={styles.time}>Tháng này</Text>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={styles.image}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.user}>
                Xuân Thiệp <Text style={styles.message}>đã thích câu chuyện của bạn · 3 giờ</Text>
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image
              style={styles.story}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Notification;
