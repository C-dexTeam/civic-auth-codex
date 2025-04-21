export const rewardValues = {
    id: '',
    name: '',
    symbol: '',
    description: '',
    imagePath: '',
    uri: '',
    active: true,
    sellerFee: 0
}

export const rewardSchema = {
    name: {
        required: true,
        minLength: 3,
        maxLength: 30
    },
    symbol: {
        required: true,
        minLength: 2,
        maxLength: 8
    },
    description: {
        required: true
    },
    uri: {
        required: true
    }
} 