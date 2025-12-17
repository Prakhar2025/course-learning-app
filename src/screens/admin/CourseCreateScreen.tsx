import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const CourseCreateScreen = ({ navigation }: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [videos, setVideos] = useState<string[]>([]);
    const [notes, setNotes] = useState<string[]>([]);

    const handleUploadVideo = () => {
        Alert.alert('Upload Video', 'Opening file picker for video...');
        setVideos([...videos, `Video_${videos.length + 1}.mp4`]);
    };

    const handleUploadNotes = () => {
        Alert.alert('Upload Notes', 'Opening file picker for PDF...');
        setNotes([...notes, `Notes_${notes.length + 1}.pdf`]);
    };

    const handleSubmit = () => {
        if (!title || !price) {
            Alert.alert('Error', 'Please fill basic details');
            return;
        }
        Alert.alert('Success', 'Course created successfully!');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[TYPOGRAPHY.h2, styles.title]}>Create New Course</Text>

                <Input label="Course Title" value={title} onChangeText={setTitle} placeholder="e.g. Advanced React patterns" />
                <Input label="Description" value={description} onChangeText={setDescription} multiline style={{ height: 100 }} />
                <Input label="Price ($)" value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="99.99" />

                <Text style={styles.sectionHeader}>Course Content</Text>

                <View style={styles.uploadSection}>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
                        <Text style={styles.uploadText}>+ Upload Video</Text>
                    </TouchableOpacity>
                    {videos.map((v, i) => <Text key={i} style={styles.fileItem}>🎥 {v}</Text>)}
                </View>

                <View style={styles.uploadSection}>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleUploadNotes}>
                        <Text style={styles.uploadText}>+ Upload PDF Notes</Text>
                    </TouchableOpacity>
                    {notes.map((n, i) => <Text key={i} style={styles.fileItem}>📄 {n}</Text>)}
                </View>

                <Button title="Publish Course" onPress={handleSubmit} style={{ marginTop: SPACING.l }} />
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
        paddingBottom: SPACING.xxl,
    },
    title: {
        marginBottom: SPACING.l,
        color: COLORS.primary,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: SPACING.m,
        marginBottom: SPACING.s,
    },
    uploadSection: {
        marginBottom: SPACING.m,
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: SPACING.m,
        alignItems: 'center',
        marginBottom: SPACING.s,
    },
    uploadText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    fileItem: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginLeft: SPACING.s,
        marginBottom: 4,
    },
});
