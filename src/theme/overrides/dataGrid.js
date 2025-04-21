import { hexToRGBA } from "@/utils/hex-to-rgba"

const DataGrid = theme => {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          width: "100%",
          border: 0,
          color: theme.palette.text.primary,

          "& .MuiDataGrid-main": {
            width: "100%",
          },

          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
          },

          "& .MuiDataGrid-sortIcon": {
            color: `${theme.palette.text.primary} !important`
          },
        },
        toolbarContainer: {
          paddingRight: `${theme.spacing(5)} !important`,
          paddingLeft: `${theme.spacing(3.25)} !important`
        },
        columnHeaders: {
          maxHeight: '54px !important',
          minHeight: '54px !important',
          lineHeight: '24px !important',
          backgroundColor: theme.palette.secondary.main,
        },
        columnHeader: {
          padding: "0.5rem 1rem !important",
          fontSize: "2rem !important",
          height: '54px',
          borderColor: `${theme.palette.border.secondary} !important`,

          '&:not(.MuiDataGrid-columnHeaderCheckbox)': {
            padding: theme.spacing(4),
            '&:first-of-type': {
              paddingLeft: theme.spacing(5)
            }
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(5)
          }
        },
        columnHeaderCheckbox: {
          // maxWidth: '58px !important',
          // minWidth: '58px !important'
        },
        columnHeaderTitleContainer: {
          padding: 0
        },
        columnHeaderTitle: {
          fontWeight: 600,
          fontSize: '1rem',
          letterSpacing: '0.17px',
          textTransform: 'uppercase'
        },
        columnSeparator: {
          color: theme.palette.divider
        },
        virtualScroller: {
        },
        virtualScrollerRenderZone: {
          '& .MuiDataGrid-row': {
            maxHeight: 'unset !important',
            // minHeight: '50px !important',
            "&:hover": {
              backgroundColor: hexToRGBA(theme.palette.border.secondary, 1),
            }
          }
        },
        row: {
          '& .MuiDataGrid-cell': {
            height: "auto"
          },
          '&:last-child': {
            '& .MuiDataGrid-cell': {
              borderBottom: 0,
            }
          }
        },
        cell: {
          // minHeight: '50px !important',
          lineHeight: '20px !important',
          display: "flex",
          alignItems: "center",
          borderColor: theme.palette.border.secondary,
          '&:not(.MuiDataGrid-cellCheckbox)': {
            padding: "0.5rem 1rem",

            '&:first-of-type': {
              paddingLeft: theme.spacing(5)
            }
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(5)
          },
          '&:focus, &:focus-within': {
            outline: 'none'
          }
        },
        cellCheckbox: {
          // maxWidth: '58px !important',
          // minWidth: '58px !important'
        },
        editInputCell: {
          padding: 0,
          color: theme.palette.text.primary,
          '& .MuiInputBase-input': {
            padding: 0
          }
        },
        footerContainer: {
          // minHeight: '50px !important',
          borderTop: `1px solid ${theme.palette.border.secondary}`,
          '& .MuiTablePagination-toolbar': {
            // minHeight: '50px !important'
          },
          '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel': {
            color: theme.palette.text.primary
          }
        }
      },
      defaultProps: {
        // rowHeight: 50,
        headerHeight: 54
      }
    }
  }
}

export default DataGrid
