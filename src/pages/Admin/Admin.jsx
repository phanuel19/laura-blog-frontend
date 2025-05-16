import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  FiEdit2,
  FiFileText,
  FiMenu,
  FiPlus,
  FiSettings,
  FiShare2,
  FiTrash2,
  FiUsers,
  FiVideo
} from 'react-icons/fi';
import Testimonials from '../Testimonials/Testimonials';
import ArticlesForm from './ArticlesForm';
import VideoForm from './VideoForm';

const Admin = () => {
  // États pour les onglets
  const [tabValue, setTabValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // États pour les différents contenus
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });

  // États pour les formulaires
  const [articleForm, setArticleForm] = useState({ title: '', content: '' });
  const [videoForm, setVideoForm] = useState({ title: '', url: '' });
  const [editMode, setEditMode] = useState({ type: '', id: null });

  // États pour les modales
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Charger les données initiales
  useEffect(() => {
    // Simuler un chargement d'API
    const loadInitialData = async () => {
      // Articles simulés
      setArticles([
        { id: 1, title: 'Premier article', content: 'Contenu du premier article...', date: '2023-01-15' },
        { id: 2, title: 'Deuxième article', content: 'Contenu du deuxième article...', date: '2023-02-20' }
      ]);

      // Vidéos simulées
      setVideos([
        { id: 1, title: 'Tutoriel vidéo', url: 'https://youtube.com/embed/abc123', date: '2023-03-10' },
        { id: 2, title: 'Présentation', url: 'https://youtube.com/embed/def456', date: '2023-04-05' }
      ]);

      // Liens sociaux simulés
      setSocialLinks({
        facebook: 'https://facebook.com/monblog',
        twitter: 'https://twitter.com/monblog',
        instagram: 'https://instagram.com/monblog',
        linkedin: 'https://linkedin.com/company/monblog'
      });
    };

    loadInitialData();
  }, []);

  // Gestion des onglets
  // const handleTabChange = (event, newValue) => {
  //   setTabValue(newValue);
  // };

  // Gestion des formulaires
  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (editMode.type === 'article') {
      // Mise à jour d'un article existant
      setArticles(articles.map(art => 
        art.id === editMode.id ? { ...articleForm, id: editMode.id, date: new Date().toISOString() } : art
      ));
    } else {
      // Création d'un nouvel article
      const newArticle = {
        id: Date.now(),
        ...articleForm,
        date: new Date().toISOString()
      };
      setArticles([...articles, newArticle]);
    }
    setArticleForm({ title: '', content: '' });
    setEditMode({ type: '', id: null });
    setOpenModal(false);
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (editMode.type === 'video') {
      // Mise à jour d'une vidéo existante
      setVideos(videos.map(vid => 
        vid.id === editMode.id ? { ...videoForm, id: editMode.id, date: new Date().toISOString() } : vid
      ));
    } else {
      // Création d'une nouvelle vidéo
      const newVideo = {
        id: Date.now(),
        ...videoForm,
        date: new Date().toISOString()
      };
      setVideos([...videos, newVideo]);
    }
    setVideoForm({ title: '', url: '' });
    setEditMode({ type: '', id: null });
    setOpenModal(false);
  };

  const handleSocialLinksSubmit = (e) => {
    e.preventDefault();
    // Ici, vous enverriez normalement les données à votre API
    alert('Réseaux sociaux mis à jour !');
  };

  // Gestion des actions (éditer/supprimer)
  const handleEdit = (type, id) => {
    setEditMode({ type, id });
    if (type === 'article') {
      const article = articles.find(art => art.id === id);
      setArticleForm({ title: article.title, content: article.content });
      setModalContent(
        <form onSubmit={handleArticleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Titre de l'article"
            value={articleForm.title}
            onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
            required
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Contenu"
            value={articleForm.content}
            onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {editMode.id ? 'Mettre à jour' : 'Publier'}
          </Button>
        </form>
      );
    } else if (type === 'video') {
      const video = videos.find(vid => vid.id === id);
      setVideoForm({ title: video.title, url: video.url });
      setModalContent(
        <form onSubmit={handleVideoSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Titre de la vidéo"
            value={videoForm.title}
            onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
            required
          />
          <TextField
            fullWidth
            label="URL de la vidéo (embed)"
            value={videoForm.url}
            onChange={(e) => setVideoForm({...videoForm, url: e.target.value})}
            required
            placeholder="https://youtube.com/embed/..."
          />
          <Button type="submit" variant="contained" color="primary">
            {editMode.id ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </form>
      );
    }
    setOpenModal(true);
  };

  const handleDelete = (type, id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      if (type === 'article') {
        setArticles(articles.filter(art => art.id !== id));
      } else if (type === 'video') {
        setVideos(videos.filter(vid => vid.id !== id));
      }
    }
  };

  // Styles pour le responsive
  // const drawerWidth = 240;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setTabValue(0)}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 0 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <FiUsers className="mr-3" />
              Utilisateurs
            </button>
            <button
              onClick={() => setTabValue(1)}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 1 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <FiFileText className="mr-3" />
              Articles
            </button>
            <button
              onClick={() => setTabValue(2)}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 2 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <FiVideo className="mr-3" />
              Vidéos
            </button>
            <button
              onClick={() => setTabValue(3)}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 3 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <FiShare2 className="mr-3" />
              Réseaux sociaux
            </button>
            <button
              onClick={() => setTabValue(4)}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 4 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <FiSettings className="mr-3" />
              Paramètres
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar - Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-gray-500 focus:outline-none"
        >
          <FiMenu className="h-6 w-6" />
        </button>
        {mobileOpen && (
          <div className="fixed inset-0 z-40">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileOpen(false)}></div>
            <div className="relative flex flex-col w-72 max-w-xs bg-white h-full">
              <nav className="flex-1 p-4 space-y-2">
                <button
                  onClick={() => { setTabValue(0); setMobileOpen(false); }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 0 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiUsers className="mr-3" />
                  Utilisateurs
                </button>
                <button
                  onClick={() => { setTabValue(1); setMobileOpen(false); }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 1 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiFileText className="mr-3" />
                  Articles
                </button>
                <button
                  onClick={() => { setTabValue(2); setMobileOpen(false); }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 2 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiVideo className="mr-3" />
                  Vidéos
                </button>
                <button
                  onClick={() => { setTabValue(3); setMobileOpen(false); }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 3 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiShare2 className="mr-3" />
                  Réseaux sociaux
                </button>
                <button
                  onClick={() => { setTabValue(4); setMobileOpen(false); }}
                  className={`flex items-center w-full px-4 py-2 rounded-lg ${tabValue === 4 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <FiSettings className="mr-3" />
                  Paramètres
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {/* Onglet Utilisateurs */}
          {tabValue === 0 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des utilisateurs</h2>
                {/* <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    setEditMode({ type: 'user', id: null });
                    setModalContent(<UserForm onCreateDone={() => setOpenModal(false)}  onSave={async (userData) => {
    // Envoyer les données à votre API
    console.log('Création:', userData);
  }}/>);
                    setOpenModal(true);
                  }}
                >
                  <FiPlus className="mr-2" /> Ajouter un utilisateur
                </Button> */}
              </div>
              <Testimonials />
            </div>
          )}

          {/* Onglet Articles */}
          {tabValue === 1 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des articles</h2>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    setArticleForm({ title: '', content: '' });
                    setEditMode({ type: 'article', id: null });
                    setModalContent(
                      <ArticlesForm/>
                    );
                    setOpenModal(true);
                  }}
                >
                  <FiPlus className="mr-2" /> Nouvel article
                </Button>
              </div>
              
              <div className="space-y-4">
                {articles.length === 0 ? (
                  <p className="text-gray-500">Aucun article pour le moment.</p>
                ) : (
                  articles.map(article => (
                    <div key={article.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <div className="flex space-x-2">
                          <Button 
                            size="small" 
                            startIcon={<FiEdit2 />}
                            onClick={() => handleEdit('article', article.id)}
                          >
                            Modifier
                          </Button>
                          <Button 
                            size="small" 
                            startIcon={<FiTrash2 />} 
                            color="error"
                            onClick={() => handleDelete('article', article.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{article.content.substring(0, 150)}...</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Publié le {new Date(article.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Onglet Vidéos */}
          {tabValue === 2 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion des vidéos</h2>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    setVideoForm({ title: '', url: '' });
                    setEditMode({ type: 'video', id: null });
                    setModalContent(
                     <VideoForm/>
                    );
                    setOpenModal(true);
                  }}
                >
                  <FiPlus className="mr-2" /> Ajouter une vidéo
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.length === 0 ? (
                  <p className="text-gray-500">Aucune vidéo pour le moment.</p>
                ) : (
                  videos.map(video => (
                    <div key={video.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{video.title}</h3>
                        <div className="flex space-x-2">
                          <Button 
                            size="small" 
                            startIcon={<FiEdit2 />}
                            onClick={() => handleEdit('video', video.id)}
                          >
                            Modifier
                          </Button>
                          <Button 
                            size="small" 
                            startIcon={<FiTrash2 />} 
                            color="error"
                            onClick={() => handleDelete('video', video.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </div>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={video.url}
                          title={video.title}
                          className="w-full h-48 md:h-64"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Ajoutée le {new Date(video.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Onglet Réseaux sociaux */}
          {tabValue === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des réseaux sociaux</h2>
              
              <form onSubmit={handleSocialLinksSubmit} className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    label="Facebook"
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Twitter"
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Instagram"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="LinkedIn"
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                    fullWidth
                  />
                </div>
                <div className="mt-6">
                  <Button type="submit" variant="contained" color="primary">
                    Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Onglet Paramètres */}
          {tabValue === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres du blog</h2>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Configuration générale</h3>
                
                <form className="space-y-4">
                  <TextField
                    label="Titre du blog"
                    defaultValue="Mon Blog"
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    defaultValue="Un blog passionnant sur divers sujets"
                    fullWidth
                  />
                  <TextField
                    label="Email de contact"
                    type="email"
                    defaultValue="contact@monblog.com"
                    fullWidth
                  />
                  
                  <div className="pt-4">
                    <Button type="submit" variant="contained" color="primary">
                      Enregistrer les paramètres
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal pour les formulaires */}
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditMode({ type: '', id: null });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '600px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            {editMode.type === 'article' && (editMode.id ? 'Modifier un article' : 'Nouvel article')}
            {editMode.type === 'video' && (editMode.id ? 'Modifier une vidéo' : 'Ajouter une vidéo')}
            {editMode.type === 'user' && 'Ajouter un utilisateur'}
          </Typography>
          {modalContent}
        </Box>
      </Modal>
      {/* <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Vidéos existantes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-white p-4 rounded-lg shadow">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="font-medium">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {video.categories.map((cat) => (
                  <span key={cat} className="text-xs bg-gray-100 px-2 py-1 rounded">{cat}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      Liste des articles existants 
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Articles existants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-4 rounded-lg shadow">
              <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-md mb-2" />
              <h3 className="font-medium">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {article.categories.map((cat) => (
                  <span key={cat} className="text-xs bg-gray-100 px-2 py-1 rounded">{cat}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Admin;