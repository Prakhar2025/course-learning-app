import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { RootState } from '../../store';
import { loginSuccess } from '../../store/authSlice';

export const EditProfileScreen = ({ navigation }: any) => {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        if (!name || !email) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        // Simulate API update
        setTimeout(() => {
            setLoading(false);
            // Update local state
            if (user && token) {
                dispatch(loginSuccess({
                    user: { ...user, name, email },
                    token
                }));
            }
            Alert.alert('Success', 'Profile updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Input
                    label="Full Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                <Input
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Button title="Save Changes" onPress={handleSave} loading={loading} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.l,
    },
});
