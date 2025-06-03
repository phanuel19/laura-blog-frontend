// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
// import { storage } from '../firebaseConfig';

const VideoForm= () => {
  // États pour les vidéos

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    thumbnail: null,
    videoFile: null,
    author: '',
    date: new Date().toISOString().split('T')[0],
    categories: []
  });
  const [videoCategoriesInput, setVideoCategoriesInput] = useState('');

 

  // Fonction pour ajouter une vidéo
  // const addVideo = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     // Upload thumbnail
  //     const thumbnailRef = ref(storage, `thumbnails/${newVideo.thumbnail.name}`);
  //     await uploadBytes(thumbnailRef, newVideo.thumbnail);
  //     const thumbnailUrl = await getDownloadURL(thumbnailRef);

  //     // Upload video
  //     const videoRef = ref(storage, `videos/${newVideo.videoFile.name}`);
  //     await uploadBytes(videoRef, newVideo.videoFile);
  //     const videoUrl = await getDownloadURL(videoRef);

  //     const videoToAdd = {
  //       ...newVideo,
  //       thumbnail: thumbnailUrl,
  //       url: videoUrl,
  //       id: videos.length + 1,
  //       categories: newVideo.categories
  //     };

  //     setVideos([...videos, videoToAdd]);
  //     resetVideoForm();
  //   } catch (error) {
  //     console.error("Error uploading files: ", error);
  //   }
  // };





  // const resetVideoForm = () => {
  //   setNewVideo({
  //     title: '',
  //     description: '',
  //     thumbnail: null,
  //     videoFile: null,
  //     author: '',
  //     date: new Date().toISOString().split('T')[0],
  //     categories: []
  //   });
  //   setVideoCategoriesInput('');
  // };



  const handleVideoInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };



  const handleVideoFileChange = (e) => {
    setNewVideo({ ...newVideo, [e.target.name]: e.target.files[0] });
  };



  const addVideoCategory = () => {
    if (videoCategoriesInput.trim() && !newVideo.categories.includes(videoCategoriesInput.trim())) {
      setNewVideo({
        ...newVideo,
        categories: [...newVideo.categories, videoCategoriesInput.trim()]
      });
      setVideoCategoriesInput('');
    }
  };


  const removeVideoCategory = (categoryToRemove) => {
    setNewVideo({
      ...newVideo,
      categories: newVideo.categories.filter(cat => cat !== categoryToRemove)
    });
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Administration du contenu</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire pour les vidéos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ajouter une vidéo</h2>
          {/* <form onSubmit={addVideo}> */}<form >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input
                type="text"
                name="title"
                value={newVideo.title}
                onChange={handleVideoInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={newVideo.description}
                onChange={handleVideoInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Miniature</label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleVideoFileChange}
                className="w-full px-3 py-2 border rounded-md"
                accept="image/*"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Fichier vidéo (MP4)</label>
              <input
                type="file"
                name="videoFile"
                onChange={handleVideoFileChange}
                className="w-full px-3 py-2 border rounded-md"
                accept="video/mp4"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Auteur</label>
              <input
                type="text"
                name="author"
                value={newVideo.author}
                onChange={handleVideoInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={newVideo.date}
                onChange={handleVideoInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Catégories</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={videoCategoriesInput}
                  onChange={(e) => setVideoCategoriesInput(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-md"
                  placeholder="Ajouter une catégorie"
                />
                <button
                  type="button"
                  onClick={addVideoCategory}
                  className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newVideo.categories.map((cat) => (
                  <span key={cat} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeVideoCategory(cat)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Ajouter la vidéo
            </button>
          </form>
        </div>
        
        
            
            
      </div>
      
      {/* Liste des vidéos existantes */}
      
    </div>
  );
};

export default VideoForm;