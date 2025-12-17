import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Text } from 'react-native';

export const PaymentScreen = ({ route, navigation }: any) => {
    const { plan } = route.params;
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handlePayment = () => {
        if (!cardNumber || !expiry || !cvc) {
            Alert.alert('Error', 'Please fill in all payment details');
            return;
        }

        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', `Successfully subscribed to ${plan.name} plan!`, [
                { text: 'OK', onPress: () => navigation.navigate('Profile') }
            ]);
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[TYPOGRAPHY.h2, styles.title]}>Secure Checkout</Text>
                <Text style={styles.summary}>Complete your subscription to {plan.name} ({plan.price})</Text>

                <View style={styles.form}>
                    <Input
                        label="Card Number"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                        maxLength={19}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: SPACING.s }}>
                            <Input
                                label="Expiry Date"
                                placeholder="MM/YY"
                                value={expiry}
                                onChangeText={setExpiry}
                                maxLength={5}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: SPACING.s }}>
                            <Input
                                label="CVC"
                                placeholder="123"
                                value={cvc}
                                onChangeText={setCvc}
                                keyboardType="numeric"
                                maxLength={3}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <Input
                        label="Cardholder Name"
                        placeholder="Name on card"
                    />

                    <Button
                        title={`Pay ${plan.price}`}
                        onPress={handlePayment}
                        loading={loading}
                        style={{ marginTop: SPACING.l }}
                    />
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
        marginBottom: SPACING.xs,
    },
    summary: {
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
        fontSize: 16,
    },
    form: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
});
