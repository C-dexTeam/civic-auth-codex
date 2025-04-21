// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
// ** Reducers
import coursesSlice from './courses/coursesSlice'
import planguagesSlice from './planguages/planguagesSlice'
import profileSlice from './profile/profileSlice'
import chaptersSlice from './chapters/chaptersSlice'
import admin from './admin'
import coursesReducer from './admin/courses'
import chaptersReducer from './admin/chapters'
import languagesReducer from './admin/languages'

export const store = configureStore({
  reducer: {
    courses : coursesSlice,
    planguages : planguagesSlice,
    profile : profileSlice,
    chapters : chaptersSlice,
    admin,
    courses: coursesReducer,
    chapters: chaptersReducer,
    languages: languagesReducer
  },
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
