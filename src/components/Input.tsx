import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor={COLORS.textSecondary}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m,
        width: '100%',
    },
    label: {
        marginBottom: SPACING.xs,
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: SPACING.m,
        fontSize: 16,
        color: COLORS.text,
        backgroundColor: COLORS.surface,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: SPACING.xs,
    },
});
