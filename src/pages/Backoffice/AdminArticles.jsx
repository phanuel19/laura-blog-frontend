import React, {useEffect, useState} from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import {
    Button,
    Box,
    IconButton,
    Dialog,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    LinearProgress,
    Alert,
    Paper
} from '@mui/material';
import {Add, Edit, Delete} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {article} from '../../services/ArticleServices.js';
import {teal} from '@mui/material/colors';

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{justifyContent: 'space-between'}}>
            <Box>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
                <GridToolbarDensitySelector/>
                <GridToolbarExport/>
            </Box>
        </GridToolbarContainer>
    );
}

export default function AdminArticles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await article.GetArticles();
                setArticles(response.datas);
            } catch (error) {
                setError("Erreur lors du chargement des articles");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const handleDelete = async () => {
        try {
            await article.deleteArticle(selectedId);
            setArticles(articles.filter(article => article._id !== selectedId));
            setDeleteDialogOpen(false);
        } catch (error) {
            setError("Erreur lors de la suppression");
            console.error(error);
        }
    };

    const columns = [
        {
            field: 'title',
            headerName: 'Titre',
            width: 250,
            renderCell: (params) => (
                <Box sx={{fontWeight: 500}}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'author',
            headerName: 'Auteur',
            width: 150
        },
        {
            field: 'createdAt',
            headerName: 'Date',
            width: 150,
            valueFormatter: (params) => new Date(params?.value).toLocaleDateString('fr-FR')
        },
        {
            field: 'categories',
            headerName: 'Catégories',
            width: 200,
            renderCell: (params) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                    {params.value?.map((cat, index) => (
                        <Box
                            key={index}
                            sx={{
                                px: 1,
                                py: 0.5,
                                bgcolor: teal[50],
                                color: teal[700],
                                borderRadius: 1,
                                fontSize: '0.75rem'
                            }}
                        >
                            {cat}
                        </Box>
                    ))}
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        onClick={() => navigate(`/admin/articles/edit/${params.row._id}`)}
                        size="small"
                        sx={{color: teal[700]}}
                    >
                        <Edit fontSize="small"/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            setSelectedId(params.row._id);
                            setDeleteDialogOpen(true);
                        }}
                        size="small"
                        color="error"
                    >
                        <Delete fontSize="small"/>
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Paper elevation={0} sx={{p: 3, borderRadius: 2}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}>
                <Typography variant="h5" sx={{fontWeight: 600}}>
                    Gestion des articles
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add/>}
                    onClick={() => navigate('/admin/articles/new')}
                    sx={{
                        backgroundColor: teal[700],
                        '&:hover': {backgroundColor: teal[800]}
                    }}
                >
                    Nouvel article
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            )}

            <Box sx={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={articles}
                    columns={columns}
                    loading={loading}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    getRowId={(row) => row.id}
                    components={{
                        Toolbar: CustomToolbar,
                        LoadingOverlay: LinearProgress
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: teal[50],
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: `1px solid ${teal[100]}`,
                        },
                    }}
                />
            </Box>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir supprimer cet article ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                    >
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}