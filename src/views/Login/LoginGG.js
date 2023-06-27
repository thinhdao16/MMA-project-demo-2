import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export default function LoginGG() {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [user, setUser] = useState([])
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
            const response = await axios.post("https://fhome2-be.vercel.app/login",
                { accessToken: token }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("Token posted successfully to the server", response?.data);
            setUser(response?.data?.data)
            // Handle the server response if needed
        } catch (error) {
            console.error("Failed to post token to the server:", error);
            // Handle the error if needed
        }
    };
    console.log(user)
    return (
        <View style={styles.container}>
            {!user ? (
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                />
            ) : (
                <View style={styles.card}>
                    {user?.img && (
                        <Image source={{ uri: user?.img }} style={styles.image} />
                    )}
                    <Text style={styles.text}>Email: {user?.user?.email}</Text>
                    <Text style={styles.text}>
                        Verified: {user.email ? "yes" : "no"}
                    </Text>
                    <Text style={styles.text}>Name: {user?.user?.fullname}</Text>
                    {/* <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text> */}
                </View>
            )}
            <Button
                title="remove local store"
                onPress={async () => await AsyncStorage.removeItem("@user")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
