import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store';

export const ProfileScreen = (props: any) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[TYPOGRAPHY.h1, { marginBottom: SPACING.m }]}>My Profile</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{user?.name || 'User'}</Text>

                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{user?.email || 'email@example.com'}</Text>

                    <Text style={styles.label}>Role:</Text>
                    <Text style={styles.value}>{user?.role || 'user'}</Text>
                </View>

                <Button
                    title="Edit Profile"
                    onPress={() => (props.navigation as any).navigate('EditProfile')}
                    variant="secondary"
                    style={{ marginBottom: SPACING.s }}
                />

                <Button
                    title="Change Password"
                    onPress={() => (props.navigation as any).navigate('ChangePassword')}
                    variant="outline"
                    style={{ marginBottom: SPACING.m }}
                />

                <Button
                    title="Subscription Plans"
                    onPress={() => (props.navigation as any).navigate('Subscription')}
                    variant="primary"
                    style={{ marginBottom: SPACING.s, marginTop: SPACING.m }}
                />

                <Button
                    title="Contact Support"
                    onPress={() => (props.navigation as any).navigate('Support')}
                    variant="outline"
                    style={{ marginBottom: SPACING.m }}
                />

                <Button
                    title="Logout"
                    onPress={() => dispatch(logout())}
                    variant="outline"
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
        padding: SPACING.l,
        flex: 1,
    },
    infoContainer: {
        marginVertical: SPACING.xl,
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginBottom: SPACING.xs,
    },
    value: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '500',
        marginBottom: SPACING.m,
    },
});
