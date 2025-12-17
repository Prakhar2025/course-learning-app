import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import { Course } from '../types';

interface CourseCardProps {
    course: Course;
    onPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: course.thumbnail }} style={styles.image} resizeMode="cover" />
            <View style={styles.content}>
                <Text style={styles.category}>{course.category}</Text>
                <Text style={styles.title} numberOfLines={2}>{course.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.instructor}>{course.instructor}</Text>
                    <Text style={styles.price}>${course.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginVertical: SPACING.s,
        marginHorizontal: SPACING.s,
        ...SHADOWS.small,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
    },
    content: {
        padding: SPACING.m,
    },
    category: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '600',
        marginBottom: SPACING.xs,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    instructor: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.success,
    },
});
