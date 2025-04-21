import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector from react-redux
import { fetchCourses, getCourses, getLoading } from '../../store/admin/courses'; // Import fetchCourses from the courses slice

const AdminDashboard = props => {
    const dispatch = useDispatch();
    const courses = useSelector(getCourses); // Use useSelector to get courses from the state
    const loading = useSelector(getLoading); // Use useSelector to get loading state

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Courses</h2>
            <ul>
                {courses?.lenght > 0 && courses?.map(course => (
                    <li key={course.id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

AdminDashboard.acl = {
    action: 'read',
    permission: 'admin'
}
AdminDashboard.admin = true
export default AdminDashboard;