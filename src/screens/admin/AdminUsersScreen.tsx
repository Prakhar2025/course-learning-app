import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../constants/theme';
import { Input } from '../../components/Input';

// Mock Data
const MOCK_USERS = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', sub: 'Pro' },
    { id: '2', name: 'Jane Smith', email: 'jane@test.com', role: 'user', status: 'active', sub: 'Free' },
    { id: '3', name: 'Bob Johnson', email: 'bob@gmail.com', role: 'user', status: 'expired', sub: 'Pro' },
    { id: '4', name: 'Alice Brown', email: 'alice@yahoo.com', role: 'user', status: 'inactive', sub: 'Free' },
];

export const AdminUsersScreen = () => {
    const [users, setUsers] = useState(MOCK_USERS);
    const [search, setSearch] = useState('');

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return COLORS.success;
            case 'inactive': return COLORS.textSecondary;
            case 'expired': return COLORS.error;
            default: return COLORS.text;
        }
    };

    const handleAction = (user: any) => {
        Alert.alert(
            'User Actions',
            `Manage ${user.name}`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Deactivate', style: 'destructive', onPress: () => console.log('Deactivate') },
                { text: 'View Details', onPress: () => console.log('View') },
            ]
        );
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleAction(item)}>
            <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
                </View>
            </View>

            <Text style={styles.email}>{item.email}</Text>

            <View style={styles.footer}>
                <Text style={styles.sub}>{item.sub} Plan</Text>
                <Text style={styles.action}>•••</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[TYPOGRAPHY.h2, styles.title]}>User Management</Text>

                <Input
                    label=""
                    placeholder="Search users..."
                    value={search}
                    onChangeText={setSearch}
                    style={{ marginBottom: SPACING.l }}
                />

                <FlatList
                    data={filteredUsers}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: SPACING.xl }}
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
    },
    title: {
        marginBottom: SPACING.m,
        color: COLORS.primary,
    },
    card: {
        backgroundColor: COLORS.white,
        padding: SPACING.m,
        borderRadius: 8,
        marginBottom: SPACING.m,
        ...SHADOWS.small,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    email: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: SPACING.s,
    },
    sub: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    action: {
        fontSize: 18,
        color: COLORS.textSecondary,
    },
});
