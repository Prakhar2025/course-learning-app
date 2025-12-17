import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../constants/theme';
import { logout } from '../../store/authSlice';

export const AdminDashboardScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();

    const stats = [
        { label: 'Total Users', value: '1,234', color: COLORS.primary },
        { label: 'Active Subs', value: '856', color: COLORS.success },
        { label: 'Revenue', value: '$12k', color: '#F59E0B' }, // Amber
        { label: 'Courses', value: '42', color: COLORS.secondary },
    ];

    const menuItems = [
        { title: 'Manage Users', screen: 'AdminUsers', icon: '👥' },
        { title: 'Manage Courses', screen: 'AdminCourses', icon: '📚' },
        { title: 'Create Course', screen: 'CourseCreate', icon: '✨' },
        { title: 'Transactions', screen: 'AdminPayments', icon: '💰' },
        { title: 'Enquiries', screen: 'AdminEnquiries', icon: '📫' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={[TYPOGRAPHY.h2, { color: COLORS.white }]}>Admin Dashboard</Text>
                <TouchableOpacity onPress={() => dispatch(logout())}>
                    <Text style={{ color: COLORS.white, fontWeight: '600' }}>Logout</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                <Text style={[TYPOGRAPHY.h3, styles.sectionTitle]}>Quick Actions</Text>
                <View style={styles.menuGrid}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuCard}
                            onPress={() => item.screen !== 'AdminDashboard' && navigation.navigate(item.screen)}
                        >
                            <Text style={styles.menuIcon}>{item.icon}</Text>
                            <Text style={styles.menuTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    header: {
        backgroundColor: COLORS.primary,
        padding: SPACING.l,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        padding: SPACING.m,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: SPACING.l,
    },
    statCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        borderRadius: 8,
        borderLeftWidth: 4,
        ...SHADOWS.small,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    statLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    sectionTitle: {
        marginBottom: SPACING.m,
        marginLeft: SPACING.xs,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    menuCard: {
        width: '31%',
        backgroundColor: COLORS.white,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        ...SHADOWS.small,
    },
    menuIcon: {
        fontSize: 24,
        marginBottom: SPACING.s,
    },
    menuTitle: {
        fontSize: 12,
        textAlign: 'center',
        color: COLORS.text,
        fontWeight: '500',
    },
});
