import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseState, Course } from '../types';

const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null,
    selectedCourse: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        fetchCoursesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
            state.loading = false;
            state.courses = action.payload;
        },
        fetchCoursesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        selectCourse: (state, action: PayloadAction<Course>) => {
            state.selectedCourse = action.payload;
        },
    },
});

export const { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure, selectCourse } = courseSlice.actions;
export default courseSlice.reducer;
