import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { CardContent, Box, Typography } from '@mui/material';
import GradientCard from "@/components/card/GradientCard";

const CourseCard = ({ course, disabled }) => {
    const router = useRouter();
    console.log("sdfsdfds", course);


    return (
        <GradientCard
            description={
                <Fragment>
                    <Typography variant="body1" color={"primary"}>
                        <Typography variant="subtitle1">
                            {course.chapterCount ?? 0}
                        </Typography>
                        Chapters
                    </Typography>
                </Fragment>
            }
            disabled={disabled}
            btnText="Explore"
            dpos="center"
            onLocate={() => {
                router.push(`/courses/${course.id}`);
            }}
        >
            <CardContent>
                <Box className="CardImage">
                    <img
                        src={"/api/" + course.imagePath}
                        alt={course.title}
                        width={80}
                        height={80}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "120px",
                            objectFit: "cover",
                            borderRadius: "1rem",
                        }}
                    />
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    {course.title}
                </Typography>
                <Typography variant="caption1" sx={{ mt: 1 }}>
                    {course.description}
                </Typography>
            </CardContent>
        </GradientCard>
    )
}

export default CourseCard