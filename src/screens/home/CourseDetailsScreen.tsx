import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Course } from '../../types';

// Define the params list for navigation
type RootStackParamList = {
    HomeMain: undefined;
    CourseDetails: { course: Course };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetails'>;

export const CourseDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const { course } = route.params;

    const handleEnroll = () => {
        Alert.alert('Enrollment', `Enrolling in ${course.title}...`);
        // Connect to payment logic here later
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={{ uri: course.thumbnail }} style={styles.image} resizeMode="cover" />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.category}>{course.category}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>★ {course.rating}</Text>
                        </View>
                    </View>

                    <Text style={[TYPOGRAPHY.h2, styles.title]}>{course.title}</Text>
                    <Text style={styles.instructor}>by {course.instructor}</Text>

                    <View style={styles.metaContainer}>
                        <Text style={styles.metaItem}>🕒 {course.duration}</Text>
                        <Text style={styles.price}>${course.price}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={[TYPOGRAPHY.h3, styles.sectionTitle]}>About this course</Text>
                    <Text style={styles.description}>{course.description}</Text>

                    <Text style={styles.description}>
                        This comprehensive course covers everything you need to know about {course.category}.
                        Suitable for beginners and advanced learners alike.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button title="Enroll Now" onPress={handleEnroll} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: SPACING.l,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    category: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    ratingContainer: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.s,
        paddingVertical: SPACING.xs,
        borderRadius: 4,
    },
    rating: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        marginBottom: SPACING.s,
    },
    instructor: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: SPACING.m,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    metaItem: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.success,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        marginBottom: SPACING.s,
    },
    description: {
        fontSize: 16,
        color: COLORS.textSecondary,
        lineHeight: 24,
        marginBottom: SPACING.m,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.l,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
});
