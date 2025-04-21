import { Card, CardContent, Box, Typography, Divider } from '@mui/material'
import React from 'react'
import CourseCard from './CourseCard'

const CourseCardPreview = ({ values }) => {
    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Preview</Typography>
                    {values.createdAt && (
                        <Typography variant="caption">
                            Created: {new Date(values.createdAt).toLocaleDateString()}
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />
                <CourseCard course={values} disabled /> {/* Use CourseCard component for preview */}
                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" sx={{ mt: 1 }}>
                    Reward: {values.rewardID}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CourseCardPreview