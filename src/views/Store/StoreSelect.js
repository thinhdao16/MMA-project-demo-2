import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native-animatable'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core';

function StoreSelect(props) {
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity  style={{ width: '33%', margin: 0.8 }} onPress={() => {
                navigation.navigate('StoreAuction');
            }}>
                <Text>Store Auction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', margin: 0.8 }} onPress={() => {
                navigation.navigate('Store');
            }}>
                <Text>Store </Text>
            </TouchableOpacity>
        </View>
    )
}

StoreSelect.propTypes = {}

export default StoreSelect
