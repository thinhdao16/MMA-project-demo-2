import React from 'react';
import {FlatList, View} from 'react-native';

import data from '../../storage/database/reels';

import Reel from './ReelComponent';
import { AuthContext } from '../../views/context/AuthContext';
const Reels = () => {

  const {auctionData} = React.useContext(AuthContext)
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={auctionData}
        pagingEnabled={true}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item, index}) => <Reel item={item} />}
      />
    </View>
  );
};

export default Reels;
