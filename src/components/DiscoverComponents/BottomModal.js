import React, { useRef, useEffect } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const BottomModal = ({ visible, onClose, children }) => {
    const slideUpValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideUpValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideUpValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideUpValue]);

    return (
        <Modal transparent visible={visible} animationType="none">
            <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={onClose}>
                <Animated.View
                    style={[
                        styles.modalContent,
                        {
                            transform: [
                                {
                                    translateY: slideUpValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [400, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    {children}
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#262626',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default BottomModal;
