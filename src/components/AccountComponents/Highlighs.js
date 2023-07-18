import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../views/context/AuthContext';
import data from '../../storage/database/post';
import moment from 'moment';

const Highlighs = () => {
  const navigation = useNavigation();
  const { postingPush, userProfile } = React.useContext(AuthContext)
  const postProfileHeader = postingPush?.filter((post) => post?.user?._id === userProfile?._id)
  return (
    <View style={styles.body}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {postProfileHeader?.map((data, index) => {
          
          const timeDiff = moment().diff(data?.updatedAt);
          const duration = moment.duration(timeDiff);

          const days = duration.days();
          const hours = duration.hours();
          const minutes = duration.minutes();
          const seconds = duration.seconds();
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              key={index}
              style={styles.container}
              onPress={() => {
                navigation.navigate({
                  name: 'Story',
                  params: {
                    image: data?.img,
                    name: data?.user?.fullname,
                    pp: data?.user?.img,
                    timeStory: data?.updatedAt,
                  },
                });
              }}>
              <View style={styles.circle}>
                <Image
                  source={{ uri: data?.img }}
                  style={styles.image}
                />
              </View>

              <Text style={styles.label}> {days > 0
                ? `${days} ngày trước`
                : hours > 0
                  ? `${hours} giờ trước`
                  : minutes > 0
                    ? `${minutes} phút trước`
                    : `${seconds} giây trước`}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginBottom: 20,
  },
  container: {
    // width: 75,
    // height: 75,
    // backgroundColor: 'black',
    // borderWidth: 1.5,
    // borderRadius: 100,
    // borderColor: '#2E2E2E',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 15,
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: '#2E2E2E',
  },
  label: {
    color: 'white',
    marginTop: 5,
    marginLeft: 15,
  },
  circle: {
    width: 75,
    height: 75,
    backgroundColor: 'black',
    borderWidth: 1.5,
    borderRadius: 100,
    borderColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Highlighs;
