import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const SupportScreen = ({ navigation }: any) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!subject || !message) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Your message has been sent. We will get back to you shortly.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[TYPOGRAPHY.h1, styles.title]}>Contact Support</Text>
                <Text style={[TYPOGRAPHY.body, styles.subtitle]}>We are here to help you 24/7</Text>

                <Input
                    label="Subject"
                    placeholder="What is this about?"
                    value={subject}
                    onChangeText={setSubject}
                />

                <View style={styles.messageContainer}>
                    <Text style={styles.label}>Message</Text>
                    <Input
                        label=""
                        placeholder="Type your message here..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        numberOfLines={5}
                        style={{ height: 120, textAlignVertical: 'top' }}
                    />
                </View>

                <Button title="Send Message" onPress={handleSubmit} loading={loading} />

                <View style={styles.faqContainer}>
                    <Text style={TYPOGRAPHY.h3}>Frequently Asked Questions</Text>

                    <View style={styles.faqItem}>
                        <Text style={styles.question}>• How do I reset my password?</Text>
                        <Text style={styles.answer}>Go to the login screen and click "Forgot Password".</Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.question}>• Can I download videos?</Text>
                        <Text style={styles.answer}>Yes, Pro plan users can download videos for offline viewing.</Text>
                    </View>
                </View>
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
    title: {
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
    },
    messageContainer: {
        marginBottom: SPACING.m,
    },
    label: {
        marginBottom: SPACING.xs,
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '500',
    },
    faqContainer: {
        marginTop: SPACING.xxl,
    },
    faqItem: {
        marginTop: SPACING.m,
    },
    question: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    answer: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
});
