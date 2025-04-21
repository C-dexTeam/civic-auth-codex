import { coursesColumns } from '@/@local/table/columns/courses'
import ClassicTable from '@/components/tables/ClassicTable'
import { fetchCourses, getCourses, getFilters, setFilters, getTotalCount } from '@/store/admin/courses'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminCourseView = () => {

    // ** Data
    const filters = useSelector(getFilters)
    const _setFilters = v => dispatch(setFilters(v))

    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** Data
    const courses = useSelector(getCourses)
    const totalCount = useSelector(getTotalCount)

    useEffect(() => {
        dispatch(fetchCourses())
    }, [filters])

    return (
        <div>
            <ClassicTable
                header={{
                    title: 'Courses',
                    btnText: "Create Course",
                    btnClick: () => { router.push('/admin/courses/create') },
                    search: filters?.title,
                    handleSearch: v => _setFilters({ ...filters, title: v }),
                    totalCount: totalCount,
                }}
                rows={courses || []}
                columns={coursesColumns}
                getRowId={(row) => row._id || row.id || Math.random().toString(36).substr(2, 9)}
                pagination={{
                    page: filters?.page,
                    pageCount: Math.ceil(totalCount / filters?.limit),
                    setPage: v => _setFilters({ ...filters, page: v }),
                }}
            />
        </div>
    )
}

export default AdminCourseView