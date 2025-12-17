import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import { RootState } from '../../store';

interface LoginScreenProps {
    navigation: NativeStackNavigationProp<any>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('password');
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            dispatch(loginStart());
            // Simulate API call
            setTimeout(() => {
                if (email === 'test@test.com' && password === 'password') {
                    dispatch(
                        loginSuccess({
                            user: {
                                id: '1',
                                email: 'test@test.com',
                                name: 'Test User',
                                role: 'user',
                                isSubscribed: false,
                            },
                            token: 'fake-jwt-token',
                        })
                    );
                } else {
                    dispatch(loginFailure('Invalid credentials'));
                    Alert.alert('Error', 'Invalid credentials');
                }
            }, 1500);
        } catch (error) {
            dispatch(loginFailure('An error occurred'));
            Alert.alert('Error', 'An error occurred');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[styles.title, TYPOGRAPHY.h1]}>Welcome Back!</Text>
                <Text style={[styles.subtitle, TYPOGRAPHY.body]}>Sign in to continue learning</Text>
                <Text style={{ color: COLORS.primary, marginBottom: SPACING.m }}>Demo Account Pre-filled</Text>

                <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginBottom: SPACING.m }}>
                    <Text style={{ color: COLORS.primary, fontSize: 14 }}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button title="Login" onPress={handleLogin} loading={loading} />

                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
                    <Text style={styles.linkText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')} style={{ marginTop: SPACING.l, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>Admin Portal</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: SPACING.l,
        justifyContent: 'center',
    },
    title: {
        marginBottom: SPACING.s,
        color: COLORS.primary,
    },
    subtitle: {
        marginBottom: SPACING.xl,
        color: COLORS.textSecondary,
    },
    linkContainer: {
        marginTop: SPACING.m,
        alignItems: 'center',
    },
    linkText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});
