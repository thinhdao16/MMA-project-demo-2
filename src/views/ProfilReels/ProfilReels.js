import React from 'react';
import {Image, Text, View} from 'react-native';

import styles from './ProfilReels.style';
const ProfilReels = () => {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.image}
        />
      </View>

      <View style={styles.play}>
        <Image
          style={styles.icon}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
        />
        <Text style={styles.number}>691</Text>
      </View>
    </View>
  );
};

export default ProfilReels;
