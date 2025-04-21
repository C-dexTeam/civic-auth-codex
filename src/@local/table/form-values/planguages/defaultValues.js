
// ** Other Imports
import * as yup from 'yup'

export const planguageValues = {
    description: '', // *
    fileExtention: '',
    imagePath: 'asdasd',
    languageID: '', // *
    monacoEditor: "",
    name: '',
}

// Schema
export const planguageSchema = yup.object().shape({
    description: yup.string(),
    fileExtention: yup.string(),
    languageID: yup.string(),
    monacoEditor: yup.string(),
    name: yup.string().required(),
})
// Schema
export const planguageEditSchema = yup.object().shape({
    description: yup.string(),
    fileExtention: yup.string(),
    languageID: yup.string(),
    monacoEditor: yup.string(),
    name: yup.string().required(),
})
