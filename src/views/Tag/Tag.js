import React from 'react';
import {Image, View} from 'react-native';

import styles from './Tag.style';

const Tag = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
      />
      <Image
        style={styles.image}
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
      />
    </View>
  );
};

export default Tag;
