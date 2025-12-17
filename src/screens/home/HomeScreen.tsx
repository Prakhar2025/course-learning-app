import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { CourseCard } from '../../components/CourseCard';
import { fetchCoursesStart, fetchCoursesSuccess } from '../../store/courseSlice';
import { RootState } from '../../store';
import { Course } from '../../types';

interface HomeScreenProps {
    navigation: NativeStackNavigationProp<any>;
}

// Mock Data
const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Complete React Native Guide',
        description: 'Learn React Native from scratch to advanced',
        thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
        instructor: 'John Doe',
        price: 99.99,
        duration: '20h',
        category: 'Development',
        rating: 4.8,
    },
    {
        id: '2',
        title: 'UI/UX Design Masterclass',
        description: 'Master mobile app design principles',
        thumbnail: 'https://img-c.udemycdn.com/course/480x270/437398_46c3_10.jpg',
        instructor: 'Jane Smith',
        price: 79.99,
        duration: '15h',
        category: 'Design',
        rating: 4.9,
    },
    {
        id: '3',
        title: 'Python for Beginners',
        description: 'Start your programming journey with Python',
        thumbnail: 'https://img-c.udemycdn.com/course/480x270/692188_9da7_21.jpg',
        instructor: 'Mike Johnson',
        price: 49.99,
        duration: '12h',
        category: 'Programming',
        rating: 4.7,
    },
    // Add more mock data as needed
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { courses } = useSelector((state: RootState) => state.course);

    useEffect(() => {
        dispatch(fetchCoursesStart());
        // Simulate API call
        setTimeout(() => {
            dispatch(fetchCoursesSuccess(MOCK_COURSES));
        }, 1000);
    }, [dispatch]);

    const renderItem = ({ item }: { item: Course }) => (
        <CourseCard
            course={item}
            onPress={() => navigation.navigate('CourseDetails', { course: item })}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={TYPOGRAPHY.h2}>Featured Courses</Text>
                <Text style={TYPOGRAPHY.caption}>Expand your skills today</Text>
            </View>
            <FlatList
                data={courses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.m,
        paddingTop: SPACING.l,
        backgroundColor: COLORS.background,
    },
    listContent: {
        padding: SPACING.s,
        paddingBottom: SPACING.xl,
    },
});
