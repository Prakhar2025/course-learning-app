export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    isSubscribed: boolean;
    avatar?: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    instructor: string;
    price: number;
    duration: string;
    category: string;
    rating: number;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
    selectedCourse: Course | null;
}
