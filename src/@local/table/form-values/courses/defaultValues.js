
// ** Other Imports
import * as yup from 'yup'

export const courseValues = {
    imageFile: null, // *
    title: '', // *
    description: '',
    languageID: '',
    programmingLanguageID: '', // *
    rewardAmount: 1,
    rewardID: '',
}

// Schema
export const courseSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    languageID: yup.string(),
    programmingLanguageID: yup.string().required(),
    rewardAmount: yup.number(),
    rewardID: yup.string(),
    imageFile: yup.mixed().required(),
})
// Schema
export const courseEditSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    languageID: yup.string(),
    programmingLanguageID: yup.string(),
    rewardAmount: yup.number(),
    rewardID: yup.string(),
    imageFile: yup.mixed(),
})
