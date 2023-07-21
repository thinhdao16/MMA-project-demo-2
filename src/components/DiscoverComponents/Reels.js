import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import data from '../../storage/database/reels';

import Reel from './ReelComponent';
import { AuthContext } from '../../views/context/AuthContext';
const Reels = () => {

  const { auctionData, isLoading } = React.useContext(AuthContext)
  const auctionIng = auctionData?.filter((au) => au.status !== 'done')
  auctionIng.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={auctionIng}
        pagingEnabled={true}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item, index }) => <Reel item={item} />}
      />
    </View>
  );
};

export default Reels;
