import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../views/context/AuthContext';
const defaultImage = { uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' };
const ProfileHeader = ({ route }) => {
  const{userProfile,postingPushPublished} = React.useContext(AuthContext)
  return (
    <View style={styles.container3}>
      <View>
        <Image
          source={ { uri: userProfile?.img } }
          style={styles.image3}
        />
      </View>

      <View style={styles.numbers}>
        <View style={styles.left}>
          <Text style={styles.numberContainer}>{postingPushPublished?.filter((post) => post?.user?._id === userProfile?._id).length}</Text>
          <Text style={styles.text}>Bài viết</Text>
        </View>

        <View style={styles.mid}>
          <Text style={styles.numberContainer}>404</Text>
          <Text style={styles.text}>Người theo dõi</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.numberContainer}>387</Text>
          <Text style={styles.text}>Theo dõi</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 10,
  },
  image3: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  numbers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '73%',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  numberContainer: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 5,
  },

  text: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
});
export default ProfileHeader;
