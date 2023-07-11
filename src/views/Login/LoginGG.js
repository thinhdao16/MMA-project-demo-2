import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import styles from './Login.styles';
import { AuthContext } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function LoginGG() {
    const navigation = useNavigation();
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [user, setUser] = useState([])
    const {setPostingPush}  = useContext(AuthContext)
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId:
            "475648005655-j0mocu3071hhudacuhfrsn2kqe13mocn.apps.googleusercontent.com",
        iosClientId:
            "475648005655-6v6tttv23avqohvc3sri7jffr98dlhe0.apps.googleusercontent.com",
        webClientId:
            "475648005655-d7beajj7umpfat7d98dqcnpr81u7n0j5.apps.googleusercontent.com",
        expoClientId:
            "475648005655-367ond2k2itjeh8b3esdstm8lgl7feth.apps.googleusercontent.com",
    });
    useEffect(() => {
        handleEffect();
    }, [response, token]);
    async function handleEffect() {
        const user = await getLocalUser();
        if (!user) {
            if (response?.type === "success") {
                const token = response.params.id_token;
                setToken(token);
                postTokenToServer(token);
            }
        } else {
            setUserInfo(user);
            console.log("loaded locally");
        }
    }
    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user");
        if (!data) return null;
        return JSON.parse(data);
    };

    const postTokenToServer = async (token) => {
        try {
            const response = await axios.post(
                "https://fhome2-be.vercel.app/login",
                { accessToken: token },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Save the response to local storage
            await AsyncStorage.setItem('Access_Token', JSON.stringify(response.data.data));
            const storedData = await AsyncStorage.getItem('Access_Token');
            if (JSON.parse(storedData)) {
                // Navigate to 'BottomTab' screen
                const tokenData = JSON.parse(storedData)
                const response = await fetch('https://f-home-be.vercel.app/posts', {
                    headers: {
                        Authorization: `Bearer ${tokenData.accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                // setData(responseData);
                // console.log(responseData.data)
                setPostingPush(responseData.data.postings)
                navigation.navigate('BottomTab');
            }
        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };
    return (
        <View style={styless.container}>
            <TouchableOpacity
                onPress={() => {
                    promptAsync();
                }}
                style={styles.login}
                disabled={!request}>
                <Text style={styles.loginText}>Log In with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styless = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    card: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 15,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
