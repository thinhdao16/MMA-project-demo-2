import React from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import Container from '../../components/Container/Container';
import { AuthContext } from '../context/AuthContext';

const ProfilPost = ({ navigation }) => {
  const { postingPushPublished, setSinglePage, userProfile } = React.useContext(AuthContext)
  const flatListRef = React.useRef(null);


  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{ width: '33%', margin: 0.8 }}
      onPress={() => {
        setSinglePage(item);
        navigation.navigate('SinglePost');
      }}
    >
      <Image
        source={{ uri: item.img }}
        style={{ width: '100%', height: 130, borderWidth: 1 }}
      />
      <Text style={{
        color: 'white',
        fontSize: 12,
        paddingLeft: 5,
      }}>691</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <FlatList
        ref={flatListRef}
        horizontal={false}
        data={postingPushPublished?.filter((post) => post?.user?._id === userProfile?._id)}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
    // <Container>
    //   {Array.isArray(postingPush) &&
    //     postingPush
    //       .sort((a, b) => {
    //         return (
    //           new Date(b?.updatedAt).getTime() -
    //           new Date(a?.updatedAt).getTime()
    //         );
    //       })
    //       .map((data, index) => {
    //         return (
    //           <TouchableOpacity onPress={handleImagePress}>
    //             <Image
    //               source={{ uri: data?.img }}
    //               style={{
    //                 width: '33%',
    //                 height: 135,
    //                 marginTop: 5,
    //               }}
    //             />
    //           </TouchableOpacity>
    //         )
    //       })}
    //   {isImagePressed && navigation.navigate('SinglePost')}
    // </Container>
  );
};
export default ProfilPost;
