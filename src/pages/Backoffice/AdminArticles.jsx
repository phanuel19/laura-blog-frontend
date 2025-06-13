import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
import {
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Tooltip, Typography
} from '@mui/material';
import {useEffect, useState} from 'react';
import AdminArticleForm from './AdminArticleForm';
import {article} from "../../services/ArticleServices.js";

export default function AdminArticles() {
    const [articles, setArticles] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'title', headerName: 'Titre', width: 250 },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            renderCell: (params) => (
                <Tooltip title={params?.value}>
                    <span>{params?.value}...</span>
                </Tooltip>
            )
        },
        { field: 'author', headerName: 'Auteur', width: 150 },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <IconButton
                    onClick={() => {
                        setSelectedArticle(params.row);
                        setOpenForm(true);
                    }}
                    color="primary"
                >
                    <Edit />
                </IconButton>,
                <IconButton
                    onClick={() => handleDelete(params.id)}
                    color="error"
                >
                    <Delete />
                </IconButton>,
            ],
        },
    ];

    const handleDelete = async (id) => {
        // Logique de suppression
    };
    const fetchArticles = async () => {
        const results =  await article.GetArticles();
        setLoading(false);
        setArticles(results.datas);
    }
    useEffect(() => {
        fetchArticles()
    },[])
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Gestion des articles</Typography>
                <Button
                    startIcon={<Add />}
                    onClick={() => {
                        setSelectedArticle(null);
                        setOpenForm(true);
                    }}
                    variant="contained"
                >
                    Nouvel article
                </Button>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <DataGrid
                    rows={articles}
                    columns={columns}
                    loading={loading}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    getRowId={(row) => row.id}
                />
            </Box>

            <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedArticle ? 'Modifier l\'article' : 'Créer un nouvel article'}
                </DialogTitle>
                <DialogContent>
                    <AdminArticleForm
                        article={selectedArticle}
                        onClose={() => setOpenForm(false)}
                        onSubmit={(data) => {
                            // Logique de soumission
                            setOpenForm(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
}