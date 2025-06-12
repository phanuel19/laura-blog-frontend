import { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox
} from '@mui/material';

export default function AdminCategoryAssignment() {
    const [tabValue, setTabValue] = useState(0);
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Assigner des catégories
            </Typography>

            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Aux articles" />
                <Tab label="Aux vidéos" />
            </Tabs>

            <Box sx={{ mt: 3 }}>
                {tabValue === 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Article</TableCell>
                                {categories.map((cat) => (
                                    <TableCell key={cat._id}>{cat.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {articles.map((article) => (
                                <TableRow key={article._id}>
                                    <TableCell>{article.title}</TableCell>
                                    {categories.map((cat) => (
                                        <TableCell key={cat._id}>
                                            <Checkbox
                                                checked={article.categories.includes(cat._id)}
                                                onChange={(e) => handleCategoryToggle(article._id, cat._id, e.target.checked)}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {tabValue === 1 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Vidéo</TableCell>
                                {categories.map((cat) => (
                                    <TableCell key={cat._id}>{cat.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {videos.map((video) => (
                                <TableRow key={video._id}>
                                    <TableCell>{video.title}</TableCell>
                                    {categories.map((cat) => (
                                        <TableCell key={cat._id}>
                                            <Checkbox
                                                checked={video.categories.includes(cat._id)}
                                                onChange={(e) => handleCategoryToggle(video._id, cat._id, e.target.checked, 'video')}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Box>
        </Box>
    );
}