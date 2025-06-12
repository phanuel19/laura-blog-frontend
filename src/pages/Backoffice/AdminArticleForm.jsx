import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Chip,
    Typography,
    Paper,
    IconButton,
    Avatar,
    LinearProgress,
    Alert
} from '@mui/material';
import { AddPhotoAlternate, Delete, Save } from '@mui/icons-material';
import { teal } from '@mui/material/colors';

export default function AdminArticleForm({ initialData, onSubmit, loading, error }) {
    const [article, setArticle] = useState(initialData || {
        title: '',
        description: '',
        content: '',
        categories: [],
        author: ''
    });
    const [categoryInput, setCategoryInput] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(initialData?.thumbnail || null);

    const handleChange = (e) => {
        setArticle({...article, [e.target.name]: e.target.value});
    };

    const handleAddCategory = () => {
        if (categoryInput && !article.categories.includes(categoryInput)) {
            setArticle({
                ...article,
                categories: [...article.categories, categoryInput]
            });
            setCategoryInput('');
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        setThumbnailPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', article.title);
        formData.append('description', article.description);
        formData.append('content', article.content);
        formData.append('author', article.author);
        formData.append('categories', article.categories.join(','));
        if (thumbnail) formData.append('thumbnail', thumbnail);

        onSubmit(formData);
    };

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                {initialData ? 'Modifier l\'article' : 'Créer un nouvel article'}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {loading && <LinearProgress sx={{ mb: 3 }} />}

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Titre *"
                    name="title"
                    value={article.title}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Description *"
                    name="description"
                    value={article.description}
                    onChange={handleChange}
                    margin="normal"
                    required
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Contenu *"
                    name="content"
                    value={article.content}
                    onChange={handleChange}
                    margin="normal"
                    required
                    multiline
                    rows={6}
                    sx={{ mb: 2 }}
                />

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Image de couverture
                    </Typography>
                    {thumbnailPreview ? (
                        <Box sx={{ position: 'relative', width: 'fit-content' }}>
                            <Avatar
                                src={thumbnailPreview}
                                variant="rounded"
                                sx={{ width: 200, height: 120 }}
                            />
                            <IconButton
                                onClick={handleRemoveThumbnail}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.9)'
                                    }
                                }}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Box>
                    ) : (
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<AddPhotoAlternate />}
                            sx={{ mr: 2 }}
                        >
                            Ajouter une image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleThumbnailChange}
                            />
                        </Button>
                    )}
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Catégories
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TextField
                            label="Ajouter une catégorie"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                            size="small"
                            sx={{ mr: 1 }}
                        />
                        <Button
                            onClick={handleAddCategory}
                            variant="outlined"
                            size="small"
                        >
                            Ajouter
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {article.categories.map((cat, index) => (
                            <Chip
                                key={index}
                                label={cat}
                                onDelete={() => setArticle({
                                    ...article,
                                    categories: article.categories.filter(c => c !== cat)
                                })}
                                sx={{
                                    backgroundColor: teal[50],
                                    color: teal[700]
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <TextField
                    fullWidth
                    label="Auteur *"
                    name="author"
                    value={article.author}
                    onChange={handleChange}
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    sx={{
                        backgroundColor: teal[700],
                        '&:hover': { backgroundColor: teal[800] }
                    }}
                >
                    {initialData ? 'Mettre à jour' : 'Créer'}
                </Button>
            </Box>
        </Paper>
    );
}