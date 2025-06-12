import { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Autocomplete,
    TextField,
    Button
} from '@mui/material';

export default function AdminArticleVideo() {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleAddRelation = () => {
        // Logique pour ajouter la relation
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Relier des articles à des vidéos
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Autocomplete
                    options={articles}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Sélectionner un article" />
                    )}
                    onChange={(e, value) => setSelectedArticle(value)}
                />

                <Autocomplete
                    options={videos}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Sélectionner une vidéo" />
                    )}
                    onChange={(e, value) => setSelectedVideo(value)}
                />

                <Button
                    variant="contained"
                    onClick={handleAddRelation}
                    disabled={!selectedArticle || !selectedVideo}
                >
                    Relier
                </Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Article</TableCell>
                        <TableCell>Vidéo associée</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article._id}>
                            <TableCell>{article.title}</TableCell>
                            <TableCell>
                                {article.relatedVideo?.title || 'Aucune'}
                            </TableCell>
                            <TableCell>
                                <Button size="small">Modifier</Button>
                                <Button size="small" color="error">
                                    Supprimer
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}