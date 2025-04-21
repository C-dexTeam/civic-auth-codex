// ** React Imports
import { useEffect, useState } from 'react'
// ** MUI Imports
import {
    CircularProgress,
    Box,
    Pagination,
    Card
} from '@mui/material'
import {
    DataGrid
} from '@mui/x-data-grid'
// ** Custom Components
import CustomNoRowsOverlay from '@/components/tables/elements/CustomNoRowsOverlay'
import DefaultSearchToolbar from '@/components/tables/elements/DefaultSearchToolbar'
import TableHeader from './TableHeader'
import { hexToRGBA } from '@/utils/hex-to-rgba'

const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * @param {*} props 
 * @param rows {Array} - Data @required
 * @param columns {Array} - Columns @required
 * @param searchToolbar {Component} - Search Toolbar @optional
 * @param getRowId {Function} - @example (row) => row.id (if not provided, row.id will be used)
 * @param count {Number} - Total Count @optional
 * @param enableCheckbox {Boolean} - Enable Checkbox @optional
 */

const ClassicTable = (props) => {
    const {
        rows = [],
        columns,
        searchToolbar = null,
        getRowId,
        // count,
        enableCheckbox = false,
        enableToolbar = false,
        enableFooter = false,
        pageSizeProp,
        header = {
            title: null,
            search: null,
            btnText: null,
            handleSearch: null,
            btnClick: null,
            totalCount: null,
            totalMessage: null,
            child: null
        }, // {title, search, button}
        pagination = {
            page: 1,
            pageCount: 1,
            setPage: () => { },
        }
    } = props

    let Toolbar = enableToolbar ? (searchToolbar ?? DefaultSearchToolbar) : null

    // ** States
    const [data, setData] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [searchText, setSearchText] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const handleSearch = searchValue => {
        setSearchText(searchValue)

        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

        const filteredRows = data.filter(row => {
            return Object.keys(row).some(field => {
                // @ts-ignore
                return searchRegex.test(row[field]?.toString())
            })
        })

        if (searchValue.length) {
            setFilteredData(filteredRows)
        } else {
            setFilteredData([])
        }
    }

    useEffect(() => {
        if (rows) setData(rows)
    }, [rows])

    useEffect(() => {
        if (pageSizeProp) setPageSize(pageSizeProp)
    }, [pageSizeProp])

    return (
        <Box>
            <TableHeader
                title={header?.title}
                searchText={header?.search}
                handleSearch={header?.handleSearch}
                btnText={header?.btnText}
                btnClick={header?.btnClick}
                totalCount={header?.totalCount}
                totalMessage={header?.totalMessage}
                child={header?.child}
            />

            <Card>
                <DataGrid
                    autoHeight
                    pagination
                    disableSelectionOnClick
                    hideFooterPagination={!enableFooter}
                    hideFooterSelectedRowCount={!enableFooter}
                    checkboxSelection={enableCheckbox}
                    rows={filteredData.length ? filteredData : data}
                    columns={columns}
                    pageSize={pageSize}
                    // rowsPerPageOptions={HandleRowsPerPage(count)}
                    onPageChange={newPage => pagination.setPage(newPage)}
                    onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                    getRowId={getRowId ?? ((row) => row.id)}
                    componentsProps={{
                        toolbar: {
                            value: searchText,
                            clearSearch: () => handleSearch(''),
                            onChange: event => handleSearch(event.target.value),
                        },
                    }}
                    components={{
                        Toolbar: Toolbar,
                        LoadingOverlay: CircularProgress,
                        NoRowsOverlay: CustomNoRowsOverlay,
                        NoResultsOverlay: CustomNoRowsOverlay,
                    }}
                    getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 1 ? 'even' : 'odd'}
                    sx={{
                        "& .MuiDataGrid-columnHeaders": {
                            // backgroundColor: "unset",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                            textDecoration: "none",
                            textTransform: "unset",
                        },
                        // "& .MuiDataGrid-cell": {
                        //     maxHeight: "300px !important",
                        // },
                        // ".css-149d7vg-MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row": {
                        //     maxHeight: "unset !important",
                        // },
                        ".MuiDataGrid-virtualScroller": {
                            overflow: "auto !important",
                        },
                        ".MuiDataGrid-virtualScrollerContent": {
                            minHeight: "20rem !important",
                            maxHeight: "40rem !important",
                            height: 'auto'
                        },
                        '& .odd': {
                            // backgroundColor: 'rgba(190, 190, 190, 0.1)',
                            // backgroundColor: theme => theme.palette.tertiary.main,
                        },
                        '& .even': {
                            backgroundColor: theme => hexToRGBA(theme.palette.background.default, 0.5),
                        },
                        '& .MuiDataGrid-footerContainer': {
                            display: enableFooter ? 'undefined' : 'none',
                        }
                    }}
                />
            </Card>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: '20px',
                }}>
                <Pagination
                    count={pagination?.pageCount}
                    page={pagination?.page}
                    onChange={(e, val) => pagination.setPage(val)}
                    variant='outlined'
                    shape='circular'
                    color='primary'
                />
            </Box>
        </Box>
    )
}

export default ClassicTable
