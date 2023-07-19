import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './AccountComponents.style';
import { AuthContext } from '../../views/context/AuthContext';
import ScreenBill from './ScreenBill'
const Bio = ({ route }) => {
  const navigation = useNavigation();
  const { userProfile } = React.useContext(AuthContext)
  return (
    <SafeAreaView>
      <View style={styles.bioContainer}>
        <Text style={styles.userName}> {userProfile?.fullname}</Text>
        <Text style={styles.bio}>
          {route ? route.bio : 'Trang cá nhân'}
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.navigate('EditProfile')}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.editText}>Chỉnh sửa trang cá nhân</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          // onPress={handleIconPress}
          onPress={() => navigation.navigate('ScreenBill')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            style={{ width: 16, height: 16 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bio;
