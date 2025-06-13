import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Button, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useState } from 'react';
import AdminCategoryForm from './AdminCategoryForm';

export default function AdminCategory() {
    const [categories, setCategories] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const columns = [
        { field: 'name', headerName: 'Nom', width: 200 },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Edit />}
                    label="Modifier"
                    onClick={() => {
                        setSelectedCategory(params.row);
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

    const handleDelete = async (id) => {
        // Logique de suppression
    };

    return (
        <Box>
            <Button
                startIcon={<Add />}
                onClick={() => {
                    setSelectedCategory(null);
                    setOpenForm(true);
                }}
                sx={{ mb: 2 }}
            >
                Ajouter une catégorie
            </Button>

            <DataGrid
                rows={categories}
                columns={columns}
                getRowId={(row) => row._id}
            />

            <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                </DialogTitle>
                <DialogContent>
                    <AdminCategoryForm
                        category={selectedCategory}
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