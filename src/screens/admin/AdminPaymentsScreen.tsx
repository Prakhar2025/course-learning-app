import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../constants/theme';

// Mock Data
const MOCK_PAYMENTS = [
    { id: 'TXN123456', user: 'John Doe', amount: '$19.00', plan: 'Pro Monthly', date: '2023-10-25', status: 'success' },
    { id: 'TXN123457', user: 'Mike Johnson', amount: '$99.00', plan: 'Enterprise', date: '2023-10-24', status: 'success' },
    { id: 'TXN123458', user: 'Alice Brown', amount: '$19.00', plan: 'Pro Monthly', date: '2023-10-24', status: 'failed' },
];

export const AdminPaymentsScreen = () => {
    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.row}>
            <View style={{ flex: 1 }}>
                <Text style={styles.id}>{item.id}</Text>
                <Text style={styles.meta}>{item.user} • {item.plan}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={[styles.status, { color: item.status === 'success' ? COLORS.success : COLORS.error }]}>
                    {item.status}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[TYPOGRAPHY.h2, styles.title]}>Transaction History</Text>

                <View style={styles.card}>
                    <FlatList
                        data={MOCK_PAYMENTS}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
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
        borderRadius: 8,
        padding: SPACING.m,
        ...SHADOWS.small,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.s,
    },
    id: {
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 2,
    },
    meta: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    amount: {
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 2,
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.xs,
    }
});
