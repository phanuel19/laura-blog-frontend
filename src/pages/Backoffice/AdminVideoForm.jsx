
import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,

    Box,
   } from '@mui/material';
import {video} from "../../services/VideoServices.js";

export default function AdminVideoForm({ open, onClose, videoselected }) {
    const [formData, setFormData] = useState(videoselected || {
        title:'',
        description: '',
        thumbnail: '',
        url: '',
        author: ''

    });


    const handleSubmit = async () => {
        await video.AddVideo(formData)
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {videoselected ? 'Modifier la vidéo' : 'Ajouter une nouvelle vidéo'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="Titre"
                        fullWidth
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Thumbnail"
                        fullWidth
                        value={formData.thumbnail}
                        onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="URL de la vidéo"
                        fullWidth
                        value={formData.url}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Auteur"
                        fullWidth
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        sx={{ mb: 2 }}
                    />

                    {/*  <Autocomplete
                        multiple
                        options={allCategories}
                        value={formData.categories}
                        onChange={(e, newValue) => setFormData({...formData, categories: newValue})}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip label={option.name} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} label="Catégories" />
                        )}
                        sx={{ mb: 2 }}
                    /> */}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button onClick={onClose}>Annuler</Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            Enregistrer
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}