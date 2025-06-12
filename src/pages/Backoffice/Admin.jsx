import { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import AdminArticles from "./AdminArticles.jsx";
import AdminVideos from "./AdminVideos.jsx";
import AdminArticleVideo from "./AdminArticleVideo.jsx";
import AdminCategory from "./AdminCategory.jsx";
import AdminCategoryAssignment from "./AdminCategoryAssignment.jsx";

export default function AdminDashboard() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '80%' ,marginX : '10%', marginY :'2%' }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
                <Tab label="Articles" />
                <Tab label="Vidéos" />
                <Tab label="Catégories" />
                <Tab label="Assigner Catégories" />
                <Tab label="Relier Articles/Vidéos" />
            </Tabs>

            <Box sx={{ pt: 3 }}>
                {tabValue === 0 && <AdminArticles />}
                {tabValue === 1 && <AdminVideos />}
                {tabValue === 2 && <AdminCategory />}
                {tabValue === 3 && <AdminCategoryAssignment />}
                {tabValue === 4 && <AdminArticleVideo />}
            </Box>
        </Box>
    );
}