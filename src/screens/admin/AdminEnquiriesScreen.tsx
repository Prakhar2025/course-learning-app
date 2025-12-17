import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../constants/theme';
import { Button } from '../../components/Button';

// Mock Data
const MOCK_ENQUIRIES = [
    { id: '1', user: 'John Doe', subject: 'Payment Issue', message: 'I was charged twice for the Pro plan.', date: '2023-10-25', status: 'pending' },
    { id: '2', user: 'Jane Smith', subject: 'Course Content', message: 'Video 4 in React course is not playing.', date: '2023-10-24', status: 'resolved' },
    { id: '3', user: 'Mike Johnson', subject: 'Refund Request', message: 'I want a refund.', date: '2023-10-23', status: 'pending' },
];

export const AdminEnquiriesScreen = () => {
    const [enquiries, setEnquiries] = useState(MOCK_ENQUIRIES);
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
    const [replyText, setReplyText] = useState('');

    const handleReply = (item: any) => {
        setSelectedEnquiry(item);
        setReplyModalVisible(true);
    };

    const sendReply = () => {
        Alert.alert('Success', 'Reply sent to user.');
        setReplyModalVisible(false);
        setReplyText('');
        // Update status in mock data
        setEnquiries(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...e, status: 'resolved' } : e));
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.user}>{item.user}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.message} numberOfLines={2}>{item.message}</Text>

            <View style={styles.footer}>
                <View style={[styles.badge, { backgroundColor: item.status === 'resolved' ? COLORS.success : COLORS.error }]}>
                    <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
                </View>
                <TouchableOpacity onPress={() => handleReply(item)}>
                    <Text style={styles.replyAction}>Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={[TYPOGRAPHY.h2, styles.title]}>Customer Enquiries</Text>
                <FlatList
                    data={enquiries}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

            <Modal visible={replyModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={TYPOGRAPHY.h3}>Reply to {selectedEnquiry?.user}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your reply here..."
                            multiline
                            value={replyText}
                            onChangeText={setReplyText}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" variant="outline" onPress={() => setReplyModalVisible(false)} style={{ flex: 1, marginRight: SPACING.s }} />
                            <Button title="Send" onPress={sendReply} style={{ flex: 1, marginLeft: SPACING.s }} />
                        </View>
                    </View>
                </View>
            </Modal>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    user: {
        fontWeight: 'bold',
        color: COLORS.text,
    },
    date: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    subject: {
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 4,
    },
    message: {
        color: COLORS.textSecondary,
        marginBottom: SPACING.m,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    replyAction: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: SPACING.l,
    },
    modalContent: {
        backgroundColor: COLORS.white,
        padding: SPACING.l,
        borderRadius: 8,
        ...SHADOWS.medium,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: SPACING.m,
        height: 120,
        textAlignVertical: 'top',
        marginVertical: SPACING.m,
    },
    modalButtons: {
        flexDirection: 'row',
    }
});
