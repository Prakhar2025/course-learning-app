import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

// Mock Data (in real app, fetch from Redux/API)
const MOCK_COURSES = [
    { id: '1', title: 'Complete React Native Guide', instructor: 'John Doe', price: 99.99, students: 1205 },
    { id: '2', title: 'UI/UX Design Masterclass', instructor: 'Jane Smith', price: 79.99, students: 850 },
    { id: '3', title: 'Python for Beginners', instructor: 'Mike Johnson', price: 49.99, students: 2340 },
];

export const AdminCoursesScreen = ({ navigation }: any) => {
    const [courses, setCourses] = useState(MOCK_COURSES);

    const handleCreate = () => {
        Alert.alert('Create Course', 'Opening course creation wizard...');
        // navigation.navigate('CourseCreate');
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.meta}>{item.instructor} • ${item.price}</Text>
                <Text style={styles.students}>👥 {item.students} students</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => Alert.alert('Edit', `Edit ${item.title}`)}>
                    <Text style={styles.editAction}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={TYPOGRAPHY.h2}>Courses</Text>
                    <Button
                        title="+ New Course"
                        onPress={handleCreate}
                        style={{ width: 120, paddingVertical: 8, paddingHorizontal: 10 }}
                    />
                </View>

                <FlatList
                    data={courses}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    card: {
        backgroundColor: COLORS.white,
        padding: SPACING.m,
        borderRadius: 8,
        marginBottom: SPACING.m,
        ...SHADOWS.small,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    meta: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    students: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '500',
    },
    editAction: {
        color: COLORS.primary,
        fontWeight: '600',
        padding: SPACING.s,
    },
});
