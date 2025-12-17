import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface ForgotPasswordScreenProps {
    navigation: NativeStackNavigationProp<any>;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Check your email',
                'We have sent password reset instructions to your email.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[styles.title, TYPOGRAPHY.h1]}>Reset Password</Text>
                <Text style={[styles.subtitle, TYPOGRAPHY.body]}>
                    Enter your email address and we'll send you a link to reset your password.
                </Text>

                <Input
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Button title="Send Reset Link" onPress={handleReset} loading={loading} />

                <Button
                    title="Back to Login"
                    onPress={() => navigation.goBack()}
                    variant="secondary"
                    style={{ marginTop: SPACING.m }}
                />
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
        marginBottom: SPACING.s,
        color: COLORS.primary,
    },
    subtitle: {
        marginBottom: SPACING.xl,
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
});
