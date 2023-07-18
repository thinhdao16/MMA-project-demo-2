import React from 'react';
import { Modal, ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingOverlay = ({ isVisible }) => {
    return (
        <Modal transparent={true} visible={isVisible}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default LoadingOverlay;
