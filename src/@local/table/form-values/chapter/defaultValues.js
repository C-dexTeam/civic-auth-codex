import * as yup from 'yup'

export const chapterValues = {
    title: '',
    description: '',
    content: '',
    courseID: '',
    languageID: '',
    rewardID: '',
    funcName: '',
    frontendTemplate: '',
    dockerTemplate: '',
    order: 0
}

export const chapterFilters = {
    page: 1,
    limit: 10,
    title: '',
}

export const chapterSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    content: yup.string().required(),
    courseID: yup.string().required(),
    languageID: yup.string(),
    funcName: yup.string().required(),
    order: yup.number().required()
})