import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CourseDetailsScreen } from '../screens/home/CourseDetailsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { ChangePasswordScreen } from '../screens/profile/ChangePasswordScreen';
import { SubscriptionScreen } from '../screens/subscription/SubscriptionScreen';
import { PaymentScreen } from '../screens/subscription/PaymentScreen';
import { SupportScreen } from '../screens/support/SupportScreen';

// Admin Screens
import { AdminLoginScreen } from '../screens/admin/AdminLoginScreen';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AdminUsersScreen } from '../screens/admin/AdminUsersScreen';
import { AdminCoursesScreen } from '../screens/admin/AdminCoursesScreen';
import { CourseCreateScreen } from '../screens/admin/CourseCreateScreen';
import { AdminEnquiriesScreen } from '../screens/admin/AdminEnquiriesScreen';
import { AdminPaymentsScreen } from '../screens/admin/AdminPaymentsScreen';

import { RootState } from '../store';
import { COLORS } from '../constants/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

// --- Auth Stack ---
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        </Stack.Navigator>
    );
};

// --- Home Stack (User) ---
const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeMain" component={HomeScreen} />
            <HomeStack.Screen name="CourseDetails" component={CourseDetailsScreen as any} />
        </HomeStack.Navigator>
    );
};

// --- Profile Stack (User) ---
const ProfileStackNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
            <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
            <ProfileStack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'Subscription Plans' }} />
            <ProfileStack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
            <ProfileStack.Screen name="Support" component={SupportScreen} options={{ title: 'Customer Support' }} />
        </ProfileStack.Navigator>
    );
};

// --- Main Tabs (User) ---
const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'alert';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: {
                    display: getRouteName(route) === 'CourseDetails' ? 'none' : 'flex'
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
};

// --- Admin Stack ---
const AdminStackNavigator = () => {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ headerShown: false }} />
            <AdminStack.Screen name="AdminUsers" component={AdminUsersScreen} options={{ title: 'Manage Users' }} />
            <AdminStack.Screen name="AdminCourses" component={AdminCoursesScreen} options={{ title: 'Manage Courses' }} />
            <AdminStack.Screen name="CourseCreate" component={CourseCreateScreen} options={{ title: 'Create Course' }} />
            <AdminStack.Screen name="AdminPayments" component={AdminPaymentsScreen} options={{ title: 'Transactions' }} />
            <AdminStack.Screen name="AdminEnquiries" component={AdminEnquiriesScreen} options={{ title: 'Customer Enquiries' }} />
        </AdminStack.Navigator>
    );
};

// --- Helper ---
const getRouteName = (route: any) => {
    return getFocusedRouteNameFromRoute(route);
};

export const AppNavigator = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                user?.role === 'admin' ? <AdminStackNavigator /> : <MainTabs />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
};
