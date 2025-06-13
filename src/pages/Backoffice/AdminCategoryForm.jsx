import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

export default function AdminCategoryForm({ category, onClose, onSubmit }) {
    const [formData, setFormData] = useState(category || {
        name: '',
        description: '',
        color: '#1976d2'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Nom de la catégorie"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                sx={{ mb: 2 }}
            />

            <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={onClose}>Annuler</Button>
                <Button type="submit" variant="contained">
                    Enregistrer
                </Button>
            </Box>
        </Box>
    );
}