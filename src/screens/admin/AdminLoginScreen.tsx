import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';

export const AdminLoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (email === 'admin@admin.com' && password === 'admin123') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                // Dispatch admin user
                dispatch(loginSuccess({
                    user: {
                        id: 'admin_1',
                        email: 'admin@admin.com',
                        name: 'Admin User',
                        role: 'admin',
                        isSubscribed: true
                    },
                    token: 'admin-token'
                }));
            }, 1000);
        } else {
            Alert.alert('Error', 'Invalid Admin Credentials');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[TYPOGRAPHY.h1, styles.title]}>Admin Portal</Text>
                <Text style={styles.subtitle}>Secure Access</Text>

                <Input
                    label="Admin Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <Input
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Button title="Admin Login" onPress={handleLogin} loading={loading} style={{ marginTop: SPACING.m }} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: SPACING.xl, alignSelf: 'center' }}>
                    <Text style={{ color: COLORS.textSecondary }}>Back to User Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

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
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
    },
});
