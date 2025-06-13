import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Autocomplete,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';

export default function AdminArticleVideo() {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [relations, setRelations] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleAddRelation = () => {
        if (selectedArticle && selectedVideo) {
            setRelations([...relations, {
                article: selectedArticle,
                video: selectedVideo
            }]);
            setSelectedArticle(null);
            setSelectedVideo(null);
        }
    };

    const handleRemoveRelation = (id) => {
        setRelations(relations.filter(rel => rel.article._id !== id));
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Relations Articles-Vidéos
            </Typography>

            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <Autocomplete
                    options={articles}
                    getOptionLabel={(option) => option.title}
                    sx={{ flex: 1 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Sélectionner un article" />
                    )}
                    value={selectedArticle}
                    onChange={(e, value) => setSelectedArticle(value)}
                />

                <Autocomplete
                    options={videos}
                    getOptionLabel={(option) => option.title}
                    sx={{ flex: 1 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Sélectionner une vidéo" />
                    )}
                    value={selectedVideo}
                    onChange={(e, value) => setSelectedVideo(value)}
                />

                <Button
                    variant="contained"
                    onClick={handleAddRelation}
                    disabled={!selectedArticle || !selectedVideo}
                    sx={{ minWidth: 120 }}
                >
                    Ajouter
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Article</TableCell>
                            <TableCell>Vidéo associée</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {relations.map((relation) => (
                            <TableRow key={relation.article._id}>
                                <TableCell>{relation.article.title}</TableCell>
                                <TableCell>{relation.video.title}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleRemoveRelation(relation.article._id)}
                                        color="error"
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}