import { coursesColumns } from '@/@local/table/columns/courses'
import { planguageColumns } from '@/@local/table/columns/planguages'
import ClassicTable from '@/components/tables/ClassicTable'
import { fetchCourses, getCourses } from '@/store/admin/courses'
import { fetchLanguages, getLanguages } from '@/store/admin/languages'
import { fetchPlanguages, getPlanguages } from '@/store/admin/planguages'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PlanguageAdminPage = () => {

    // ** States
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        name: "",
    })

    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** Data
    const planguages = useSelector(getPlanguages)
    

    useEffect(() => {
        dispatch(fetchPlanguages(filters))
    }, [filters])

    console.log(planguages)

    return (
        <div>
            <ClassicTable
                header={{
                    title: 'Languages',
                    btnText: "Create Programming Language",
                    btnClick: () => { router.push('/admin/planguages/create') },
                    search: filters?.title,
                    handleSearch: v => setFilters({ ...filters, title: v }),
                    // totalCount: courses?.totalCount,
                }}
                rows={planguages}
                columns={planguageColumns}
                getRowId={(row) => row._id || row.id || Math.random().toString(36).substr(2, 9)}
                pagination={{
                    page: filters?.page,
                    pageCount: Math.ceil(planguages?.totalCount / filters?.limit),
                    setPage: v => setFilters({ ...filters, page: v }),
                }}
            />
        </div>
    )
}


PlanguageAdminPage.acl = {
    action: 'read',
    permission: 'admin'
}
PlanguageAdminPage.admin = true
export default PlanguageAdminPage