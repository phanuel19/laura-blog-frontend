import { useEffect, useState, useMemo } from "react";
import {
  Autocomplete,
  Box,
  Pagination,

  Tab,
  Tabs,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ArticleCard from "../../components/Cards/Article/ArticleCard";
import ArticleView from "../../components/Cards/Article/ArticleView";
import { article } from "../../services/ArticleServices";
import { categoryArticle } from "../../services/CategoryArticleServices";
import {  ThemeProvider } from '@mui/material/styles';
import { teal} from '@mui/material/colors';

export default function Articles() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const articlesPerPage = isMobile ? 6 : isTablet ? 8 : 9;

  const fetchData = async () => {
    try {
      setLoading(true);
      const [articlesRes, categoriesRes] = await Promise.all([
        article.GetArticles(),
        categoryArticle.getCategoryArticle()
      ]);

      setArticles(articlesRes?.datas || []);
      setCategories(["Tous", ...(categoriesRes?.datas?.map(c => c.name) || [])]);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Échec du chargement des données. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0 });
  }, []);

  const filteredArticles = useMemo(() => {
    return articles?.filter(article => {
      const matchesCategory = selectedCategory === "Tous" ||
          (article.categories && article.categories.includes(selectedCategory));
      const matchesSearch = article.title?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, search]);

  const paginatedArticles = useMemo(() => {
    const startIdx = (currentPage - 1) * articlesPerPage;
    return filteredArticles.slice(startIdx, startIdx + articlesPerPage);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleCategoryChange = (_, newValue) => {
    setSelectedCategory(newValue);
    resetPagination();
  };

  const handleSearchChange = (_, newValue) => {
    setSearch(newValue);
    resetPagination();
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0 });
  };

  const resetPagination = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0 });
  };

  if (loading) return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: teal[700] }} />
      </Box>
  );

  if (error) return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Alert severity="error" sx={{ width: '80%', maxWidth: 600 }}>
          {error}
        </Alert>
      </Box>
  );

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{
          backgroundColor: 'background.default',
          px: isMobile ? 2 : isTablet ? 4 : 6,
          py: 5,
          minHeight: 'calc(100vh - 64px)'
        }}>
          {selectedArticle ? (
              <ArticleView
                  article={selectedArticle}
                  onClose={() => setSelectedArticle(null)}
              />
          ) : (
              <>
                <Typography variant="h4" component="h1" sx={{
                  mb: 4,
                  fontWeight: 700,
                  color: 'text.primary',
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  Ressources sur la santé mentale
                </Typography>

                {/* Filters section */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'stretch' : 'center',
                  justifyContent: 'space-between',
                  gap: 3,
                  mb: 4
                }}>
                  <Box sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                    '& .MuiTabs-scroller': {
                      paddingBottom: '4px'
                    }
                  }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        variant="scrollable"
                        scrollButtons={isMobile ? false : 'auto'}
                        allowScrollButtonsMobile
                        sx={{
                          minHeight: '48px',
                          '& .MuiTabs-indicator': {
                            backgroundColor: teal[700],
                            height: '3px'
                          }
                        }}
                    >
                      {categories.map((cat, idx) => (
                          <Tab
                              key={`cat-${idx}`}
                              label={cat}
                              value={cat}
                              sx={{
                                fontSize: isMobile ? '0.875rem' : '1rem',
                                minWidth: 'unset'
                              }}
                          />
                      ))}
                    </Tabs>
                  </Box>

                  <Autocomplete
                      freeSolo
                      options={[...new Set(articles.map(a => a.title))].sort()}
                      inputValue={search}
                      onInputChange={handleSearchChange}
                      sx={{
                        width: isMobile ? '100%' : 300,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px',
                          backgroundColor: 'white'
                        }
                      }}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label="Rechercher des articles"
                              size="small"
                          />
                      )}
                  />
                </Box>

                {/* Articles grid */}
                {filteredArticles.length === 0 ? (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 10,
                      textAlign: 'center'
                    }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Aucun article trouvé
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                        Aucun article ne correspond à vos critères de recherche.
                      </Typography>
                      <Button
                          variant="outlined"
                          onClick={() => {
                            setSelectedCategory("Tous");
                            setSearch("");
                          }}
                          sx={{
                            borderRadius: '50px',
                            textTransform: 'none',
                            px: 4
                          }}
                      >
                        Réinitialiser les filtres
                      </Button>
                    </Box>
                ) : (
                    <>
                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
                        gap: 3,
                        mb: 4
                      }}>
                        {paginatedArticles.map(article => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                onClick={() => setSelectedArticle(article)}
                            />
                        ))}
                      </Box>

                      {/* Pagination */}
                      {totalPages > 1 && (
                          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                                size={isMobile ? "small" : "medium"}
                            />
                          </Box>
                      )}
                    </>
                )}
              </>
          )}
        </Box>
      </ThemeProvider>
  );
}