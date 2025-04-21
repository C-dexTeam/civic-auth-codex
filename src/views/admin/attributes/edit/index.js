import { attributeValues } from "@/@local/table/form-values/attributes/defaultValues"
import AttributeForm from "@/components/form/attribute/form"
import { fetchAttribute, getCurrentAttribute, setCurrentAttribute, updateAttribute } from "@/store/admin/attributes"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"

const EditAttributeView = () => {
    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** Params
    const { id } = router.query

    // ** State
    const attribute = useSelector(getCurrentAttribute)
    const setAttribute = v => dispatch(setCurrentAttribute(v))

    // ** Handlers
    const handleSubmit = () => {
        dispatch(updateAttribute({
            callback: () => router.replace('/admin/attributes')
        }))
    }

    // ** Effects
    useEffect(() => {
        dispatch(fetchAttribute(id))
    }, [dispatch])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Attributes', path: '/admin/attributes' },
                        { title: 'Edit Attribute' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Edit Attribute</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <AttributeForm
                            values={attribute}
                            setValues={setAttribute}
                            handleSubmit={handleSubmit}
                            isEdit={true}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default EditAttributeView