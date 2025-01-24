import React, { useState } from 'react';
import { Button, TextInput, View, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRouter } from 'expo-router';

// Define your stack navigator types
type RootStackParamList = {
  Index: undefined;
  register: undefined;
  coba : undefined;
  tes : undefined;
};

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBm33UjQHf88HT7H0Ym6Ipz_mE7g2XVMBI',
  authDomain: 'coba-7629a.firebaseapp.com',
  projectId: 'coba-7629a',
  storageBucket: 'coba-7629a.appspot.com',
  messagingSenderId: '528328929295',
  appId: '1:528328929295:android:5c0d4b8a29bfa1688cb37a',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Index() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful'); // Log success to console
      Alert.alert('Success', 'Login successful')
      router.push('/coba');
    } catch (error) {
      console.log('Login failed', error); // Log error to console
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: '80%',
          paddingHorizontal: 10,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          width: '80%',
          paddingHorizontal: 10,
        }}
      />
      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Register"
        onPress={() => {
          router.push('/register'); // Navigate to register screen
        }}
      />
    </View>
  );
}
