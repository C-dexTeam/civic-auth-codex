import { attributeValues } from "@/@local/table/form-values/attributes/defaultValues"
import AttributeForm from "@/components/form/attribute/form"
import { createAttribute } from "@/store/admin/attributes"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"

const CreateAttributeView = () => {
    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** State
    const [values, setValues] = useState(attributeValues)

    // ** Handlers
    const handleSubmit = (data) => {
        dispatch(createAttribute({
            data,
            callback: () => router.replace('/admin/attributes')
        }))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Attributes', path: '/admin/attributes' },
                        { title: 'Create Attribute' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Create Attribute</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <AttributeForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={data => handleSubmit(data)}
                            isEdit={false}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default CreateAttributeView