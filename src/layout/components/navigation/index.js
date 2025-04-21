import List from '@mui/material/List';
import navigation from '@/navigation';
import adminNavigation from '@/navigation/admin';
import NavItem from './item/NavItem';

const NavigationList = ({ admin }) => {
    return (
        <List
            sx={{
                display: 'flex',
                gap: '0.5rem',
                // flexDirection: 'column',
                pt: 0
            }}
            component="nav"
        >
            {
                (admin ? adminNavigation : navigation).map((item, index) => <NavItem key={index} {...item} />)
            }
        </List >
    );
}

export default NavigationList;