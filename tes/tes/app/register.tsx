import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import Index from './index';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBm33UjQHf88HT7H0Ym6Ipz_mE7g2XVMBI",
    authDomain: "coba-7629a.firebaseapp.com",
    projectId: "coba-7629a",
    storageBucket: "coba-7629a.appspot.com",
    messagingSenderId: "528328929295",
    appId: "1:528328929295:android:5c0d4b8a29bfa1688cb37a",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'User registered successfully!');
            router.push('/coba');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Register</Text>
            <View style={styles.inputContainer}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
});

export default Register;