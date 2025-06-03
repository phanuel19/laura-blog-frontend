import {
  Business,
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  Email,
  Lock,
  Person,
  PersonAdd
} from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';

const UserForm = ({ user, onSave, onDelete, mode = 'create' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // États du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    company: '',
    birthDate: null,
    phone: '',
    status: 'active'
  });

  // États pour la UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [roles, setRoles] = useState([
    { value: 'admin', label: 'Administrateur' },
    { value: 'editor', label: 'Éditeur' },
    { value: 'author', label: 'Auteur' },
    { value: 'subscriber', label: 'Abonné' }
  ]);

  // Options de société (simulées)
  const companies = [
    { id: '1', name: 'Entreprise A' },
    { id: '2', name: 'Entreprise B' },
    { id: '3', name: 'Entreprise C' }
  ];

  // Initialiser les données si en mode édition
  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        role: user.role || '',
        company: user.company?.id || '',
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        phone: user.phone || '',
        status: user.status || 'active'
      });
      setRoles()
    }
  }, [user, mode]);

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (mode === 'create') {
      if (!formData.password) {
        newErrors.password = 'Le mot de passe est requis';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Minimum 8 caractères';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    
    if (!formData.role) newErrors.role = 'Le rôle est requis';
    if (!formData.company) newErrors.company = 'La société est requise';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion des changements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur corrige
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    try {
      // Préparer les données à envoyer
      const userData = {
        ...formData,
        // Ne pas envoyer le mot de passe de confirmation
        confirmPassword: undefined
      };
      
      await onSave(userData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: isMobile ? 2 : 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          {mode === 'create' ? (
            <>
              <PersonAdd sx={{ verticalAlign: 'middle', mr: 1 }} />
              Créer un nouvel utilisateur
            </>
          ) : (
            <>
              <Edit sx={{ verticalAlign: 'middle', mr: 1 }} />
              Modifier l'utilisateur
            </>
          )}
        </Typography>
        
        <Divider />
        
        {/* Section Informations personnelles */}
        <Typography variant="h6" color="text.secondary">
          Informations personnelles
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 3
          }}
        >
          <TextField
            label="Prénom"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <Person color="action" sx={{ mr: 1 }} />
              )
            }}
          />
          
          <TextField
            label="Nom"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
            fullWidth
          />
          
          <DatePicker
            label="Date de naissance"
            value={formData.birthDate}
            onChange={(date) => setFormData({ ...formData, birthDate: date })}
            slotProps={{
              textField: {
                fullWidth: true
              }
            }}
          />
          
          <TextField
            label="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        
        {/* Section Compte */}
        <Typography variant="h6" color="text.secondary">
          Informations du compte
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 3
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <Email color="action" sx={{ mr: 1 }} />
              )
            }}
          />
          
          {mode === 'create' && (
            <>
              <TextField
                label="Mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <Lock color="action" sx={{ mr: 1 }} />
                  )
                }}
              />
              
              <TextField
                label="Confirmer le mot de passe"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
                fullWidth
              />
            </>
          )}
          
          <FormControl fullWidth error={!!errors.role}>
            <InputLabel id="role-label">Rôle *</InputLabel>
            <Select
              labelId="role-label"
              label="Rôle *"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
            {errors.role && (
              <Typography variant="caption" color="error">
                {errors.role}
              </Typography>
            )}
          </FormControl>
          
          <FormControl fullWidth error={!!errors.company}>
            <InputLabel id="company-label">Société *</InputLabel>
            <Select
              labelId="company-label"
              label="Société *"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              startAdornment={
                <Business color="action" sx={{ mr: 1 }} />
              }
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
            {errors.company && (
              <Typography variant="caption" color="error">
                {errors.company}
              </Typography>
            )}
          </FormControl>
        </Box>
        
        {/* Section Statut */}
        <Typography variant="h6" color="text.secondary">
          Statut du compte
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip
            label="Actif"
            icon={<CheckCircle />}
            color={formData.status === 'active' ? 'primary' : 'default'}
            onClick={() => setFormData({ ...formData, status: 'active' })}
            variant={formData.status === 'active' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Inactif"
            icon={<Cancel />}
            color={formData.status === 'inactive' ? 'error' : 'default'}
            onClick={() => setFormData({ ...formData, status: 'inactive' })}
            variant={formData.status === 'inactive' ? 'filled' : 'outlined'}
          />
        </Box>
        
        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4,
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Box>
            {mode === 'edit' && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => setDeleteConfirm(true)}
              >
                Supprimer
              </Button>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => window.history.back()}
            >
              Annuler
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
            >
              {mode === 'create' ? 'Créer' : 'Mettre à jour'}
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Dialogue de confirmation de suppression */}
      <Dialog
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(false)}>Annuler</Button>
          <Button
            onClick={() => {
              onDelete();
              setDeleteConfirm(false);
            }}
            color="error"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default UserForm;