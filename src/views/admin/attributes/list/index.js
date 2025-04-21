import { attributesColumns } from '@/@local/table/columns/attributes'
import ClassicTable from '@/components/tables/ClassicTable'
import { fetchAttributes, setFilters, getAttributes, getFilters, getTotalCount } from '@/store/admin/attributes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AttributesView = () => {

    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** Data
    const attributes = useSelector(getAttributes)
    const totalCount = useSelector(getTotalCount)
    const filters = useSelector(getFilters)
    const _setFilters = v => dispatch(setFilters(v))

    useEffect(() => {
        dispatch(fetchAttributes())
    }, [filters])

    return (
        <div>
            <ClassicTable
                header={{
                    title: 'Attributes',
                    btnText: "Create Attribute",
                    btnClick: () => { router.push('/admin/attributes/create') },
                    totalCount: totalCount || 0,
                }}
                rows={attributes || []}
                columns={attributesColumns}
                getRowId={(row) => row._id || row.id || Math.random().toString(36).substr(2, 9)}
                pagination={{
                    page: filters?.page,
                    pageCount: Math.ceil((totalCount || 0) / filters?.limit),
                    setPage: v => _setFilters({ ...filters, page: v }),
                }}
            />
        </div>
    )
}

AttributesView.acl = {
    action: 'read',
    permission: 'admin'
}
AttributesView.admin = true
export default AttributesView