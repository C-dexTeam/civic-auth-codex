import { Box, Button, Card } from '@mui/material'
import { useEffect, useRef, useState } from 'react'


/**
 * 
 * @param {*} props 
 * @param {*} props.children // Card content
 * @param {*} props.description // Description text
 * @param {*} props.dpos // Description position
 * @param {*} props.btnText // Button text
 * @returns 
 */
const GradientCard = (props) => {

    const [btnWidth, setBtnWidth] = useState(null)
    const [btnHeight, setBtnHeight] = useState(null)

    const btnRef = useRef(null)

    useEffect(() => {
        if (btnRef.current) {
            setBtnWidth(btnRef.current.clientWidth || null)
            setBtnHeight(btnRef.current.clientHeight || null)
        }
    }
    ), [btnRef.current]

    return (
        <Box sx={{ position: "relative" }}>
            <Card {...props} variant='gradient' btnWidth={btnWidth} btnHeight={btnHeight}>
                {props.children}

                <Box
                    sx={{ // If you change there values, you must change the same values in frontend/src/theme/overrides/card.js
                        width: `calc(100% - ${btnWidth || 96}px - 2rem - 4px)`,
                        height: btnHeight + 4,
                        p: "0 1rem",
                        borderRadius: "0 0 0 calc(1rem - 1px)",
                        display: "flex",
                        justifyContent: props.dpos == "center" && "center",
                    }}
                >
                    {props.description}
                </Box>
            </Card>

            <Button
                ref={btnRef}
                variant='contained'
                disabled={props.disabled}
                onClick={props.onLocate}
                sx={{
                    position: "absolute",
                    right: "0px",
                    bottom: "0px",
                }}
            >
                {props.btnText || "Start"}
            </Button>
        </Box>
    )
}

export default GradientCard