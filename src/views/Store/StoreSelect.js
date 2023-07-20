import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';

function StoreSelect() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Store');
                }}
            >
                <Ionicons name="add-circle-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Store</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('StoreAuction');
                }}
            >
                <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Store Auction</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginVertical: 10,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#0099ff',
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default StoreSelect;
