import {
    TextField,
    Button,
    Box,
    Chip,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';
import { useState } from 'react';

export default function AdminArticleForm({ article, onClose, onSubmit }) {
    const [formData, setFormData] = useState(article || {
        title: '',
        description: '',
        content: '',
        categories: [],
        author: '',
        status: 'draft'
    });
    const [allCategories, setAllCategories] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Titre *"
                fullWidth
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                sx={{ mb: 3 }}
            />

            <TextField
                label="Description *"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                sx={{ mb: 3 }}
            />

            <TextField
                label="Contenu *"
                fullWidth
                multiline
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                sx={{ mb: 3 }}
            />

            <Autocomplete
                multiple
                freeSolo
                options={allCategories}
                getOptionLabel={(option) => option.name || option}
                value={formData.categories}
                onChange={(e, newValue) => setFormData({...formData, categories: newValue})}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={typeof option === 'string' ? option : option.name}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} label="Catégories" />
                )}
                sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <TextField
                    label="Auteur *"
                    fullWidth
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                />

                <FormControl fullWidth>
                    <InputLabel>Statut *</InputLabel>
                    <Select
                        value={formData.status}
                        label="Statut"
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                        <MenuItem value="draft">Brouillon</MenuItem>
                        <MenuItem value="published">Publié</MenuItem>
                        <MenuItem value="archived">Archivé</MenuItem>
                    </Select>
                    <FormHelperText>Choisir le statut de l'article</FormHelperText>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Annuler
                </Button>
                <Button type="submit" variant="contained">
                    {article ? 'Mettre à jour' : 'Créer'}
                </Button>
            </Box>
        </Box>
    );
}