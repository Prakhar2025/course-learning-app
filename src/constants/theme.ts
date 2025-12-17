export const COLORS = {
  primary: '#4F46E5', // Indigo 600
  secondary: '#10B981', // Emerald 500
  background: '#FFFFFF',
  surface: '#F3F4F6', // Gray 100
  text: '#1F2937', // Gray 800
  textSecondary: '#6B7280', // Gray 500
  error: '#EF4444',
  success: '#10B981',
  white: '#FFFFFF',
  border: '#E5E7EB',
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: 'bold' as const, color: COLORS.text },
  h2: { fontSize: 24, fontWeight: 'bold' as const, color: COLORS.text },
  h3: { fontSize: 20, fontWeight: '600' as const, color: COLORS.text },
  body: { fontSize: 16, color: COLORS.text },
  caption: { fontSize: 14, color: COLORS.textSecondary },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
};
