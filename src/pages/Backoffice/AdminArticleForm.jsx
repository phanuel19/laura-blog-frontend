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
    FormHelperText, styled
} from '@mui/material';
import { useState } from 'react';
import {CloudUploadIcon} from "lucide-react";

export default function AdminArticleForm({ article, onClose, onSubmit }) {
    const [formData, setFormData] = useState(article || {
        title: '',
        description: '',
        content: '',
        categories: [],
        author: '',

    });
    const [allCategories, setAllCategories] = useState([]);
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
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
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />

                </Button>
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