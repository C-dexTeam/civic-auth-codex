
import { rewardsColumns } from '@/@local/table/columns/rewards'
import ClassicTable from '@/components/tables/ClassicTable'
import { fetchRewards, getRewards, getFilters, setFilters, getTotalCount } from '@/store/admin/rewards'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const RewardsAdminPage = () => {

    // ** Data
    const rewards = useSelector(getRewards)
    const totalCount = useSelector(getTotalCount)
    const filters = useSelector(getFilters)
    const _setFilters = v => dispatch(setFilters(v))

    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** Effects
    useEffect(() => {
        dispatch(fetchRewards())
    }, [filters])

    return (
        <div>
            <ClassicTable
                header={{
                    title: 'Rewards',
                    btnText: "Create Reward",
                    btnClick: () => { router.push('/admin/rewards/create') },
                    search: filters?.name,
                    handleSearch: v => _setFilters({ ...filters, name: v }),
                    totalCount: totalCount || 0,
                }}
                rows={rewards || []}
                columns={rewardsColumns}
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


RewardsAdminPage.acl = {
    action: 'read',
    permission: 'admin'
}
RewardsAdminPage.admin = true
export default RewardsAdminPage