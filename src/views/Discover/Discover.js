import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";

import Container from '../../components/Container/Container';
import Reels from '../../components/DiscoverComponents/Reels';
import Auction from '../../components/DiscoverComponents/Auction';

import styles from './Discover.style';

const Discover = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModalReport = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Container insets={{ top: true }}>
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Reels />
        <View style={styles.container}>
          <Text style={styles.label}>Đấu Giá</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
            <TouchableOpacity
              onPress={toggleModalReport}
              style={{ alignSelf: "center", marginRight: 15, marginTop: -8 }}
            >
              <Feather
                name="question"
                size={30}
                color="white"

              />
            </TouchableOpacity>
          </View>

        </View>

      </View>

      <Modal isVisible={isModalVisible} style={{ justifyContent: 'center' }}>
        <View style={{
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
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>

            {/* Nội dung của Modal */}
            <View style={{ alignItems: 'center', marginTop: -50, marginBottom: 30 }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
                Quy tắc
              </Text>
            </View>

            <Image
              source={{ uri: 'https://cdn.thuvienphapluat.vn/phap-luat/2022/%C4%90%E1%BB%89nh%20Kh%C3%B4i/nguyen-tac-dau-gia-tai-san.png' }}
              style={{ width: '100%', height: 200, resizeMode: 'contain', marginBottom: 30, borderRadius: 15, marginTop: 1 }}
            />

            <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>
              Quy tắc tham gia:
            </Text>
            <Text style={{ color: 'white', fontSize: 16 }}>
              1. Quy tắc thứ nhất:  Có tiền
            </Text>
            <Text style={{ color: 'white', fontSize: 16 }}>
              2. Quy tắc thứ hai:     Có tiền
            </Text>
            {/* Thêm các quy tắc khác nếu cần */}

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'blue',
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                  width: 100,
                }}
                onPress={toggleModalReport}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>
                  Tôi đã hiểu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Discover;
