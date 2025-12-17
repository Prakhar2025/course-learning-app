# Course Learning App (Frontend)

This is the professional React Native frontend for the Course Learning Platform, built with Expo and TypeScript. It includes a complete suite of features for Users (Browsing, Subscriptions, Profile) and Admins (Dashboard, User Management, Course Creation).

## Features Implemented

### User Features
*   **Authentication:** Login, Registration, Forgot Password.
*   **Course Browsing:** Home screen with course list, search, and detailed Course View (`CourseDetailsScreen`).
*   **Profile Management:** Edit Profile, Change Password.
*   **Subscriptions:** View Plans (Free vs Pro), Mock Payment Gateway (`PaymentScreen`).
*   **Customer Support:** Contact form and FAQs (`SupportScreen`).
*   **State Management:** Redux Toolkit for Auth and Course state.

### Admin Features
*   **Admin Portal:** Secure login via the specific "Admin Portal" link on Login screen.
*   **Dashboard:** Overview of revenue, active subscriptions, and user stats.
*   **Management:**
    *   **User Management:** View/Search users, check subscription status.
    *   **Course Management:** List courses, Mock "Create Course" wizard with file upload UI.
    *   **Financials:** View transaction history (`AdminPaymentsScreen`).
    *   **Support:** View and reply to customer enquiries (`AdminEnquiriesScreen`).

## Prerequisites

*   **Node.js** (LTS version recommended)
*   **npm** or **yarn**
*   **Expo CLI** (optional, you can use `npx expo`)

## Tech Stack

*   **Framework:** React Native (Expo SDK 52+)
*   **Language:** TypeScript
*   **Navigation:** React Navigation (Native Stack + Bottom Tabs)
*   **State Management:** Redux Toolkit
*   **Styling:** Custom StyleSheet (Theme-based) + `@expo/vector-icons`

## Getting Started (For Backend Team)

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Prakhar2025/course-learning-app.git
    cd course-learning-app
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Project**
    ```bash
    npm start
    # OR
    npx expo start
    ```
    *   Press `a` to run on Android Emulator.
    *   Press `i` to run on iOS Simulator (Mac only).
    *   Press `w` to run in Web Browser.
    *   Scan the QR code with **Expo Go** app on your physical device.

## Project Structure

*   `src/components`: Reusable UI components (Button, Input, Cards).
*   `src/constants`: Theme colors, spacing, and typography.
*   `src/navigation`: `AppNavigator.tsx` handles all Stacks (Auth, Home, Admin, Profile).
*   `src/screens`:
    *   `auth/`: Login, Register, Forgot Password.
    *   `home/`: Main feed, Course Details.
    *   `profile/`: User settings, Subscription, Support.
    *   `admin/`: Dashboard, CMS, User Management, Analytics.
*   `src/store`: Redux slices for global state.

## Notes for Backend Integration
*   The app currently uses **mock data** in Redux slices and local component state.
*   **API Calls:** Replace the `setTimeout` mock calls in screens (e.g., `LoginScreen.tsx`, `RegisterScreen.tsx`) with actual API requests to your backend.
*   **Authentication:** The `authSlice.ts` handles the user session. Update this to store the JWT token received from your backend.

## Admin Credentials (Mock)
*   **Email:** `admin@admin.com`
*   **Password:** `admin123`
