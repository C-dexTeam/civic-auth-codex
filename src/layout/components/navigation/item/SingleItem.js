import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router';

const SingleItem = (props) => {

    const {
        title = "",
        icon = null,
        path = null,
        inside = false
    } = props;

    const router = useRouter()
    const handleLocate = (p) => { if (p) return () => router.replace(p) }

    return (
        <ListItemButton 
            onClick={handleLocate(path)} 
            selected={router.asPath === path} 
            sx={{ 
                ml: inside * 2,
                ...(path === "/courses/solana" && {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    }
                })
            }}
        >
            {
                icon
                    ? <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    : null
            }

            <ListItemText primary={title} />
        </ListItemButton>
    )
}

export default SingleItem