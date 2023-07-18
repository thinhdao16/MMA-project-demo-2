import React from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import SearchBar from '../../components/SearchBar/SearchBar';
import data from '../../storage/database/search';
import { AuthContext } from '../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Search = () => {
  const navigation = useNavigation();
  const flatListRef = React.useRef(null);
  useScrollToTop(flatListRef);
  const { postingPush, setSinglePage } = React.useContext(AuthContext)
  const Tab = createBottomTabNavigator();
  const renderItem = ({ item, index }) => (
    <TouchableOpacity key={index} style={{ width: '33%', margin: 0.8 }} onPress={() => {
      setSinglePage(item);
      navigation.navigate('SingleSearch');
    }}>
      <Image
        source={{ uri: item.img }}
        style={{ width: '100%', height: 130, borderWidth: 1 }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <SearchBar ıconColor={true} />
      <FlatList
        ref={flatListRef}
        horizontal={false}
        data={postingPush}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
        showsVert
        icalScrollIndicator={false}
      />
      {/* <Tab.Navigator>
        <Tab.Screen name="SingleSearch" component={SingleSearch} />
      </Tab.Navigator> */}
    </SafeAreaView>
  );
};
export default Search;
