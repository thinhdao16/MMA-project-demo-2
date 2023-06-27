/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Linking } from 'react-native';
import { TextInput } from 'react-native-paper';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';
import styles from './Login.styles';
import auth from '@react-native-firebase/auth';
import LoginGG from './LoginGG';


const trueEmail = 'E';
const truePassword = '1';

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);


  return (
    <Container insets={{ top: true, bottom: true }}>
      <Content>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', opacity: 0.6, fontSize: 14 }}>
                Ngôn ngữ (Tiếng việt)
              </Text>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                // style={{ width: 12, height: 12 }}
              />
            </View>
            <Image
              style={styles.logo}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            />
          </View>

          <View style={styles.keyboardView}>
            <TextInput
              theme={{ colors: { text: 'white' } }}
              placeholder="Phone number, username, or email"
              onChangeText={item => setName(item)}
              placeholderTextColor="grey"
              selectionColor="grey"
              style={styles.textInput}
              activeOutlineColor="grey"
              activeUnderlineColor="#3a3a3a"
            />

            <TextInput
              theme={{ colors: { text: 'white' } }}
              placeholder="Password"
              placeholderTextColor="grey"
              onChangeText={itemP => setPassword(itemP)}
              style={styles.textInput}
              selectionColor="grey"
              secureTextEntry={passwordVisible}
              activeUnderlineColor="#3a3a3a"
              activeOutlineColor="#3a3a3a"
              right={
                <TextInput.Icon
                  color={'grey'}
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />

            <TouchableOpacity
              onPress={() => {
                trueEmail === name && truePassword === password
                  ? navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTab' }],
                  })
                  : Alert.alert('Hatalı şifre veya kullanıcı adı');
              }}
              style={styles.login}
              disabled={name === null && password === null ? true : false}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', padding: 10 }}>
              <View style={styles.text}>
                <Text style={{ fontSize: 12, color: 'grey' }}>
                  Forgot your login details?{' '}
                </Text>
                <Text style={styles.help}> Get help sigining in.</Text>
              </View>

              <View style={styles.seperatorStyle}>
                <View style={styles.seperator} />
                <Text style={{ color: 'grey' }}> OR </Text>
                <View style={styles.seperator} />
              </View>

              <View style={styles.facebook}>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                />
                <LoginGG />
              </View>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.bottom}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, color: 'grey', marginTop: 15 }}>
                  Don't have an account?{' '}
                </Text>
                <Text style={{ ...styles.help, marginTop: 15 }}> Sign Up.</Text>
              </View>

              <View style={styles.line} />
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default Login;
