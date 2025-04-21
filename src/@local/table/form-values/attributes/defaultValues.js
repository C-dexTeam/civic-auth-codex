export const defaultValues = {
    rewardID: '',
    traitType: '',
    value: ''
}

export const attributeSchema = {
    rewardID: {
        required: true,
        message: 'Reward ID is required'
    },
    traitType: {
        required: true,
        message: 'Trait Type is required'
    },
    value: {
        required: true,
        message: 'Value is required'
    }
}

export const attributeEditSchema = {
    rewardID: {
        required: true,
        message: 'Reward ID is required'
    },
    traitType: {
        required: true,
        message: 'Trait Type is required'
    },
    value: {
        required: true,
        message: 'Value is required'
    }
} 