import { combineReducers } from '@reduxjs/toolkit';
import adminCoursesReducer from './courses';
import rewardsReducer from './rewards';
import chaptersReducer from './chapters';
import languagesReducer from './languages';
import attributesReducer from './attributes';
import planguagesReducer from './planguages';
import compilerReducer from './compiler';

const adminReducer = combineReducers({
    adminCourses: adminCoursesReducer,
    rewards: rewardsReducer,
    chapters: chaptersReducer,
    languages: languagesReducer,
    attributes: attributesReducer,
    planguages : planguagesReducer,
    compiler : compilerReducer
});

export default adminReducer;
