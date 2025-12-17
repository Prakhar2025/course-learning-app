import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from '../../constants/theme';
import { Button } from '../../components/Button';

export const SubscriptionScreen = ({ navigation }: any) => {
    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: '$0',
            features: ['Access to free courses', 'Limited support', 'Community access'],
            recommended: false,
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '$19/mo',
            features: ['Access to ALL courses', 'Priority support', 'Certificate of completion', 'Offline downloads'],
            recommended: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '$99/mo',
            features: ['Team management', 'Dedicated account manager', 'Custom learning paths', 'API access'],
            recommended: false,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[TYPOGRAPHY.h1, styles.title]}>Choose Your Plan</Text>
                <Text style={[TYPOGRAPHY.body, styles.subtitle]}>Unlock your full potential with Pro</Text>

                {plans.map((plan) => (
                    <View key={plan.id} style={[styles.card, plan.recommended && styles.recommendedCard]}>
                        {plan.recommended && <View style={styles.badge}><Text style={styles.badgeText}>RECOMMENDED</Text></View>}
                        <Text style={styles.planName}>{plan.name}</Text>
                        <Text style={styles.planPrice}>{plan.price}</Text>

                        <View style={styles.featuresList}>
                            {plan.features.map((feature, index) => (
                                <Text key={index} style={styles.featureItem}>• {feature}</Text>
                            ))}
                        </View>

                        <Button
                            title={plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
                            onPress={() => plan.id !== 'free' && navigation.navigate('Payment', { plan })}
                            variant={plan.recommended ? 'primary' : 'outline'}
                            disabled={plan.id === 'free'}
                        />
                    </View>
                ))}
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
        textAlign: 'center',
        marginBottom: SPACING.s,
        color: COLORS.primary,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: SPACING.xl,
        color: COLORS.textSecondary,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: SPACING.l,
        marginBottom: SPACING.l,
        ...SHADOWS.medium,
        borderWidth: 1,
        borderColor: COLORS.border,
        position: 'relative',
    },
    recommendedCard: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    badge: {
        position: 'absolute',
        top: -12,
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.m,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    planName: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    planPrice: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    featuresList: {
        marginBottom: SPACING.l,
    },
    featureItem: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: SPACING.s,
    },
});
