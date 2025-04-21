import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import DefaultTextField from '../form/components/DefaultTextField'
import DefaultSelect from '../form/components/DefaultSelect'

const ChapterFilter = ({ filters, setFilters, onClose }) => {
    const [localFilters, setLocalFilters] = useState(filters)

    const handleChange = (e) => {
        const { name, value } = e.target
        setLocalFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleApply = () => {
        setFilters(localFilters)
        onClose()
    }

    const handleReset = () => {
        setLocalFilters({
            page: 1,
            limit: 10,
            title: '',
            languageID: '',
            rewardID: '',
            grantsExperience: '',
            active: ''
        })
    }

    return (
        <Box sx={{ p: 2, minWidth: 300 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Filter Chapters</Typography>
            <Divider sx={{ mb: 2 }} />

            <DefaultTextField
                fullWidth
                label="Title"
                name="title"
                value={localFilters.title}
                onChange={handleChange}
            />

            <DefaultSelect
                label="Grants Experience"
                id='grantsExperience'
                firstSelect={"All"}
                value={localFilters.grantsExperience || ''}
                onChange={handleChange}
            />

            <DefaultSelect
                label="Active"
                id='active'
                firstSelect={"All"}
                value={localFilters.active || ''}
                onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={handleReset} variant="empty" color='secondary'>
                    Reset
                </Button>

                <Button onClick={handleApply} variant="outlined" color='primary'>
                    Apply
                </Button>
            </Box>
        </Box>
    )
}

export default ChapterFilter 