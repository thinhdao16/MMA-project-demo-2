import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

import Container from '../../components/Container/Container';
import Status from '../../components/Status/Status';

import styles from './Story.styles';
const Story = ({ route }) => {
  const timeDiff = moment().diff(route.params.timeStory);
  const duration = moment.duration(timeDiff);

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return (
    <Container insets={{ bottom: true }}>
      <Status />
      <View style={styles.top}>
        <Image style={styles.profil} source={{ uri: route.params.pp }} />
        <Text style={styles.user}>{route.params.name}</Text>
        <Text style={styles.time}>
          {days > 0
            ? `${days} ngày trước`
            : hours > 0
              ? `${hours} giờ trước`
              : minutes > 0
                ? `${minutes} phút trước`
                : `${seconds} giây trước`}
        </Text>
      </View>

      <Image style={styles.image} source={{ uri: route.params.image }} />
      <View style={styles.footer}>
        <TextInput
          placeholder="Send Message"
          placeholderTextColor="white"
          style={styles.input}
        />
        <View style={styles.ıcon}>
          <Icon name="heart" size={24} color="white" />
        </View>
      </View>
    </Container>
  );
};

export default Story;
