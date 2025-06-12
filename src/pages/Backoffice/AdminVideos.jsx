import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {Edit, Delete, Add} from '@mui/icons-material';
import {Button, Box, Alert} from '@mui/material';
import React, {useEffect, useState} from 'react';
import AdminVideoForm from './AdminVideoForm';
import {video} from "../../services/VideoServices.js";

export default function AdminVideos() {
    const [videos, setVideos] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await video.GetVideos();
                setVideos(response.datas);
            } catch (error) {
                setError("Erreur lors du chargement des articles");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);
    const columns = [
        {field: 'title', headerName: 'Titre', width: 200 , editable: true},
        {field: 'description', headerName: 'Description', width: 300, editable: true},
        {field: 'url', headerName: 'Image', width: 200, editable: false },
        {field: 'createdAt', headerName: 'Date de Création', width: 200, editable: false },
        {field: 'categories', headerName: 'Catégories', width: 200, editable: true},
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Edit/>}
                    label="Modifier"
                    onClick={() => {
                        setSelectedVideo(params.row);                        log
                        setOpenForm(true);
                    }}
                />,
                <GridActionsCellItem
                    icon={<Delete/>}
                    label="Supprimer"
                    onClick={() => handleDelete(params.id)}
                />,
            ],
        },
    ];

    return (
        <Box>
            <Button
                startIcon={<Add/>}
                onClick={() => {
                    setSelectedVideo(null);
                    setOpenForm(true);
                }}
                sx={{mb: 2}}
            >
                Ajouter une vidéo
            </Button>
            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}
            <DataGrid
                rows={videos}
                columns={columns}
                loading={loading}
                pageSize={10}
                rowHeight={30}
                editMode={"row"}
                rowsPerPageOptions={[10, 25, 50]}
                getRowId={(row) => row.id}

            />

            <AdminVideoForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                videoselected={selectedVideo}
            />
        </Box>
    );
}