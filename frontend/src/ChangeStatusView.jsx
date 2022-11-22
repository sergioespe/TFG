import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLoaderData } from "react-router-dom";
import http from './http';


export default function ChangeStatusView () {
    const {id, payload, status, url} = useLoaderData();
    

    const translate = async () => {
        await http.post("tasks/" + id + "/complete-translation");
    };

    const review = async () => {
        await http.post("tasks/" + id + "/validate-translation");
    }

    const handleChange = () => {
        if (status === "PENDING") {
            translate();
        }
        else if (status === "REVIEW") {
            review();
        }
        window.location.href = '/tasks';
    }

    const handleClose = () => {
        window.location.href = '/tasks';
    }

    return (
        <Box sx={{ minWidth: 275, textAlign: "center", display: "flex",
        alignItems: "center",
        justifyContent: "center"}}>
            <Card variant="outlined" sx={{ width: "70%" }}>

                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {payload}
                    </Typography>
                    <Typography variant="h5" component="div">
                        <a href={url}>{url}</a>
                    </Typography>
                    <Typography sx={{ mb: 1.2 }} color="text.secondary">
                        Pulsa para entrar
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center"}}>
                    <Button size="small" onClick={handleClose}>Cancelar</Button>
                    <Button size="small" onClick={handleChange}>Aceptar</Button>
                </CardActions> 

            </Card>
        </Box>
    )
}