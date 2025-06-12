import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Button, Box } from '@mui/material';
import { useState } from 'react';
import AdminVideoForm from './AdminVideoForm';

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const columns = [
    { field: 'title', headerName: 'Titre', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'categories', headerName: 'Catégories', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
            icon={<Edit />}
            label="Modifier"
            onClick={() => {
              setSelectedVideo(params.row);
              setOpenForm(true);
            }}
        />,
        <GridActionsCellItem
            icon={<Delete />}
            label="Supprimer"
            onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
      <Box>
        <Button
            startIcon={<Add />}
            onClick={() => {
              setSelectedVideo(null);
              setOpenForm(true);
            }}
            sx={{ mb: 2 }}
        >
          Ajouter une vidéo
        </Button>

        <DataGrid
            rows={videos}
            columns={columns}
            getRowId={(row) => row._id}
        />

        <AdminVideoForm
            open={openForm}
            onClose={() => setOpenForm(false)}
            video={selectedVideo}
        />
      </Box>
  );
}