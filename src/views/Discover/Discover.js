import React, { useState } from 'react';
import {  Text, TouchableOpacity, View } from 'react-native';
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
              style={{ alignSelf: "center", marginRight: 15 }}
            >
              <FontAwesome name="more-vertical" size={20} color="#F5F5F5" />
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
          </View>

          <View>
            {/* Nội dung của Modal */}
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Discover;
