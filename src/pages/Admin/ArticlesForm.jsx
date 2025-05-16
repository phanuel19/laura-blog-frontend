// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
// import { storage } from '../firebaseConfig';

const ArticlesForm= () => {
  
  // États pour les articles

  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    image: null,
    author: '',
    date: new Date().toISOString().split('T')[0],
    categories: [],
    content: ''
  });
  const [articleCategoriesInput, setArticleCategoriesInput] = useState('');



  // Fonction pour ajouter un article
  // const addArticle = async (e) => {
  //   e.preventDefault();
  //   setVideos()
  //   try {
  //     // Upload image
  //     const imageRef = ref(storage, `article-images/${newArticle.image.name}`);
  //     await uploadBytes(imageRef, newArticle.image);
  //     const imageUrl = await getDownloadURL(imageRef);

  //     const articleToAdd = {
  //       ...newArticle,
  //       image: imageUrl,
  //       id: articles.length + 1,
  //       categories: newArticle.categories
  //     };

  //     setArticles([...articles, articleToAdd]);
  //     resetArticleForm();
  //   } catch (error) {
  //     console.error("Error uploading image: ", error);
  //   }
  // };



  // const resetArticleForm = () => {
  //   setNewArticle({
  //     title: '',
  //     description: '',
  //     image: null,
  //     author: '',
  //     date: new Date().toISOString().split('T')[0],
  //     categories: [],
  //     content: ''
  //   });
  //   setArticleCategoriesInput('');
  // };



  const handleArticleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };


  const handleArticleFileChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.files[0] });
  };



  const addArticleCategory = () => {
    if (articleCategoriesInput.trim() && !newArticle.categories.includes(articleCategoriesInput.trim())) {
      setNewArticle({
        ...newArticle,
        categories: [...newArticle.categories, articleCategoriesInput.trim()]
      });
      setArticleCategoriesInput('');
    }
  };



  const removeArticleCategory = (categoryToRemove) => {
    setNewArticle({
      ...newArticle,
      categories: newArticle.categories.filter(cat => cat !== categoryToRemove)
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Administration du contenu</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire pour les vidéos */}
       
        
        {/* Formulaire pour les articles */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ajouter un article</h2>
          {/* <form onSubmit={addArticle}> */}<form >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input
                type="text"
                name="title"
                value={newArticle.title}
                onChange={handleArticleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={newArticle.description}
                onChange={handleArticleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleArticleFileChange}
                className="w-full px-3 py-2 border rounded-md"
                accept="image/*"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Auteur</label>
              <input
                type="text"
                name="author"
                value={newArticle.author}
                onChange={handleArticleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={newArticle.date}
                onChange={handleArticleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Contenu</label>
              <textarea
                name="content"
                value={newArticle.content}
                onChange={handleArticleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="5"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Catégories</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={articleCategoriesInput}
                  onChange={(e) => setArticleCategoriesInput(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-md"
                  placeholder="Ajouter une catégorie"
                />
                <button
                  type="button"
                  onClick={addArticleCategory}
                  className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newArticle.categories.map((cat) => (
                  <span key={cat} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeArticleCategory(cat)}
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
              Ajouter l'article
            </button>
          </form>
        </div>
      </div>
      
    
    </div>
  );
};

export default ArticlesForm;