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
    Checkbox
} from '@mui/material';
import { useState } from 'react';

export default function AdminCategoryAssignment() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
       <>
           <Box>
               <Typography variant="h5" gutterBottom>
                   Assignation des catégories aux articles
               </Typography>

               <Box sx={{ mb: 4 }}>
                   <Autocomplete
                       options={articles}
                       getOptionLabel={(option) => option.title}
                       sx={{ width: 400 }}
                       renderInput={(params) => (
                           <TextField {...params} label="Rechercher un article" />
                       )}
                       onChange={(e, value) => setSelectedArticle(value)}
                   />
               </Box>

               {selectedArticle && (
                   <TableContainer component={Paper}>
                       <Table>
                           <TableHead>
                               <TableRow>
                                   <TableCell>Catégorie</TableCell>
                                   <TableCell>Assignée</TableCell>
                               </TableRow>
                           </TableHead>
                           <TableBody>
                               {categories.map((category) => (
                                   <TableRow key={category._id}>
                                       <TableCell>{category.name}</TableCell>
                                       <TableCell>
                                           <Checkbox
                                               checked={selectedArticle.categories.includes(category._id)}
                                               onChange={(e) => {
                                                   // Logique pour mettre à jour l'assignation
                                               }}
                                           />
                                       </TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                   </TableContainer>
               )}

               <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                   <Button variant="contained">
                       Enregistrer les modifications
                   </Button>
               </Box>
           </Box>
           <Box>
               <Typography variant="h5" gutterBottom>
                   Assignation des catégories aux vidéos
               </Typography>

               <Box sx={{ mb: 4 }}>
                   <Autocomplete
                       options={videos}
                       getOptionLabel={(option) => option.title}
                       sx={{ width: 400 }}
                       renderInput={(params) => (
                           <TextField {...params} label="Rechercher une vidéo" />
                       )}
                       onChange={(e, value) => setSelectedVideo(value)}
                   />
               </Box>

               {selectedVideo && (
                   <TableContainer component={Paper}>
                       <Table>
                           <TableHead>
                               <TableRow>
                                   <TableCell>Catégorie</TableCell>
                                   <TableCell>Assignée</TableCell>
                               </TableRow>
                           </TableHead>
                           <TableBody>
                               {categories.map((category) => (
                                   <TableRow key={category._id}>
                                       <TableCell>{category.name}</TableCell>
                                       <TableCell>
                                           <Checkbox
                                               checked={selectedVideo.categories.includes(category._id)}
                                               onChange={(e) => {
                                                   // Logique pour mettre à jour l'assignation
                                               }}
                                           />
                                       </TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                   </TableContainer>
               )}

               <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                   <Button variant="contained">
                       Enregistrer les modifications
                   </Button>
               </Box>
           </Box></>
    );
}

