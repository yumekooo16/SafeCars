'use client';

import React, { useState, useEffect } from "react";
// ✅ Import supabaseClient pour gérer les images
import { supabaseClient } from '@/lib/supabaseClient';

function ManageVehicules() {
  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    prix: '',
    kilometrage: '',
    carburant: 'Essence',
    transmission: 'Manuelle',
    couleur: '',
    description: '',
    images: [],
    statut: 'disponible'
  });

  useEffect(() => {
    fetchVehicules();
  }, []);

  const fetchVehicules = async () => {
    try {
      const res = await fetch('/api/vehicule');
      if (res.ok) {
        const data = await res.json();
        console.log('📥 Véhicules récupérés:', data); // DEBUG
        if (data && data.length > 0) {
          console.log('📊 Statut du premier véhicule:', data[0].statut); // DEBUG
        }
        setVehicules(data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fonction pour obtenir l'URL correcte de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // Si l'URL est déjà complète (http/https), la retourner directement
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Si le chemin commence par /uploads/, c'est une image locale - la retourner telle quelle
    if (imagePath.startsWith('/uploads/')) {
      return imagePath;
    }
    
    // Si le chemin commence par uploads/ (sans slash initial), ajouter le slash
    if (imagePath.startsWith('uploads/')) {
      return '/' + imagePath;
    }
    
    // Sinon, essayer Supabase Storage (pour compatibilité avec d'anciennes images)
    let cleanPath = imagePath
      .replace(/^\/+uploads\/+/, '')
      .replace(/^uploads\/+/, '')
      .replace(/^\/+vehicules\/+/, '')
      .replace(/^vehicules\/+/, '')
      .replace(/^\/+/, '');
    
    // Obtenir l'URL publique depuis Supabase Storage (bucket: vehicle-images)
    const { data } = supabaseClient.storage
      .from('vehicle-images')
      .getPublicUrl(cleanPath);
    
    return data?.publicUrl || null;
  };

  // ✅ Gérer les erreurs d'image
  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('🔄 Input change:', name, '=', value); // DEBUG
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const totalImages = formData.images.length + files.length;
    if (totalImages > 10) {
      setErrorMessage(`Maximum 10 images. Vous pouvez ajouter ${10 - formData.images.length} image(s) supplémentaire(s).`);
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    setUploadingImage(true);
    setErrorMessage('');

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);

        const res = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData
        });

        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Erreur lors de l\'upload');
        }
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

    } catch (error) {
      console.error('Erreur upload:', error);
      setErrorMessage(error.message || 'Erreur lors de l\'upload des images');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSetMainImage = (index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const [mainImage] = newImages.splice(index, 1);
      newImages.unshift(mainImage);
      return { ...prev, images: newImages };
    });
  };

  const validateForm = () => {
    // Validation des images
    if (formData.images.length === 0) {
      setErrorMessage('Ajoutez au moins une photo');
      setTimeout(() => setErrorMessage(''), 5000);
      return false;
    }

    // Validation de l'année (1990 à année actuelle + 1)
    const annee = Number(formData.annee);
    if (isNaN(annee) || annee < 1990 || annee > new Date().getFullYear() + 1) {
      setErrorMessage(`L'année doit être entre 1990 et ${new Date().getFullYear() + 1}`);
      setTimeout(() => setErrorMessage(''), 5000);
      return false;
    }

    // Validation du prix (max 999,999,999 €)
    const prix = Number(formData.prix);
    if (isNaN(prix) || prix <= 0 || prix > 999999999) {
      setErrorMessage('Le prix doit être entre 1 et 999,999,999 €');
      setTimeout(() => setErrorMessage(''), 5000);
      return false;
    }

    // Validation du kilométrage (max 9,999,999 km)
    const kilometrage = Number(formData.kilometrage);
    if (isNaN(kilometrage) || kilometrage < 0 || kilometrage > 9999999) {
      setErrorMessage('Le kilométrage doit être entre 0 et 9,999,999 km');
      setTimeout(() => setErrorMessage(''), 5000);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    console.log('📤 Soumission formData:', formData); // DEBUG
    
    if (!validateForm()) {
      return;
    }

    try {
      const url = editingVehicle 
        ? `/api/edit-vehicule?id=${editingVehicle.id}`
        : '/api/add-vehicule';
      
      console.log('📡 Envoi vers:', url, formData); // DEBUG
      console.log('📊 Statut dans formData:', formData.statut); // DEBUG
      
      const res = await fetch(url, {
        method: editingVehicle ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        try {
          const responseData = await res.json();
          console.log('✅ Réponse serveur:', responseData); // DEBUG
          console.log('✅ Statut dans la réponse:', responseData.data?.statut); // DEBUG
          setSuccessMessage(editingVehicle ? 'Véhicule modifié avec succès' : 'Véhicule ajouté avec succès');
          // Rafraîchir la liste des véhicules immédiatement
          await fetchVehicules();
          setTimeout(() => {
            setSuccessMessage('');
            resetForm();
          }, 2000);
        } catch (jsonError) {
          console.error('❌ Erreur parsing JSON:', jsonError);
          // Même si le JSON est invalide, si la réponse est OK, on considère que c'est un succès
          setSuccessMessage(editingVehicle ? 'Véhicule modifié avec succès' : 'Véhicule ajouté avec succès');
          await fetchVehicules();
          setTimeout(() => {
            setSuccessMessage('');
            resetForm();
          }, 2000);
        }
      } else {
        try {
          const errorData = await res.json();
          console.error('❌ Erreur serveur:', errorData); // DEBUG
          const errorMessage = errorData?.error || errorData?.message || `Erreur ${res.status}: ${res.statusText}`;
          setErrorMessage(errorMessage);
        } catch (jsonError) {
          // Si on ne peut pas parser le JSON, on utilise le statut HTTP
          console.error('❌ Erreur parsing JSON d\'erreur:', jsonError);
          const statusText = res.statusText || 'Erreur inconnue';
          setErrorMessage(`Erreur ${res.status}: ${statusText}`);
        }
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } catch (error) {
      console.error('❌ Erreur réseau ou autre:', error); // DEBUG
      setErrorMessage(error.message || 'Erreur lors de l\'enregistrement. Veuillez réessayer.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleEdit = (vehicle) => {
    console.log('✏️ Édition véhicule:', vehicle); // DEBUG
    setEditingVehicle(vehicle);
    const newFormData = {
      marque: vehicle.marque,
      modele: vehicle.modele,
      annee: vehicle.annee,
      prix: vehicle.prix,
      kilometrage: vehicle.kilometrage,
      carburant: vehicle.carburant,
      transmission: vehicle.transmission,
      couleur: vehicle.couleur || '',
      description: vehicle.description || '',
      images: vehicle.images || [],
      statut: vehicle.statut || 'disponible'
    };
    console.log('📝 FormData après édition:', newFormData); // DEBUG
    setFormData(newFormData);
    setShowForm(true);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleDelete = async (id) => {
    // Si on n'est pas en mode confirmation, on active le mode confirmation
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      setErrorMessage('');
      setSuccessMessage('');
      return;
    }

    // Si on est en mode confirmation, on supprime
    setDeleteConfirmId(null);
    setErrorMessage('');
    setSuccessMessage('');
    
    const res = await fetch(`/api/delete-vehicule?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSuccessMessage('Véhicule supprimé avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchVehicules();
    } else {
      const errorData = await res.json().catch(() => ({}));
      setErrorMessage(errorData.error || 'Erreur lors de la suppression');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const resetForm = () => {
    setFormData({
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      prix: '',
      kilometrage: '',
      carburant: 'Essence',
      transmission: 'Manuelle',
      couleur: '',
      description: '',
      images: [],
      statut: 'disponible'
    });
    setEditingVehicle(null);
    setShowForm(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  if (loading) {
    return <div className="text-white text-center py-20">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-white font-semibold">{vehicules.length} véhicule(s)</h2>
        <button
          onClick={() => {
            if (showForm) {
              // Si le formulaire est ouvert, on le ferme et on reset
              resetForm();
            } else {
              // Si le formulaire est fermé, on l'ouvre et on reset
              setErrorMessage('');
              setSuccessMessage('');
              setFormData({
                marque: '',
                modele: '',
                annee: new Date().getFullYear(),
                prix: '',
                kilometrage: '',
                carburant: 'Essence',
                transmission: 'Manuelle',
                couleur: '',
                description: '',
                images: [],
                statut: 'disponible'
              });
              setEditingVehicle(null);
              setShowForm(true);
            }
          }}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl text-white mb-4 font-medium">
            {editingVehicle ? 'Modifier' : 'Nouveau véhicule'}
          </h3>
          
          {/* Messages d'erreur et de succès */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
              ⚠️ {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded text-green-200 text-sm">
              ✓ {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Upload images */}
            <div>
              <label className="block text-white text-sm mb-2">
                Photos ({formData.images.length}/10)
              </label>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {formData.images.map((url, i) => {
                    const imageUrl = getImageUrl(url);
                    return (
                      <div key={i} className="relative aspect-square group">
                        {imageUrl && !imageErrors[`form-${i}`] ? (
                          <img 
                            src={imageUrl} 
                            alt={`Photo ${i + 1}`} 
                            className="absolute inset-0 w-full h-full object-cover rounded cursor-zoom-in"
                            onError={() => handleImageError(`form-${i}`)}
                            onClick={() => setZoomedImage(imageUrl)}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center rounded">
                            <span className="text-gray-500 text-xs">Erreur</span>
                          </div>
                        )}
                        {i === 0 && (
                          <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded z-10">
                            Principale
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 rounded">
                          {i !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetMainImage(i)}
                              className="p-1 bg-blue-600 text-white rounded"
                            >
                              ★
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="p-1 bg-red-600 text-white rounded"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {formData.images.length < 10 && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesUpload}
                    className="hidden"
                    id="img-upload"
                    disabled={uploadingImage}
                  />
                  <label
                    htmlFor="img-upload"
                    className="block w-full p-4 border-2 border-dashed border-gray-600 rounded text-center cursor-pointer hover:border-blue-500"
                  >
                    <span className="text-white">
                      {uploadingImage ? 'Upload...' : '+ Ajouter photos'}
                    </span>
                  </label>
                </>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                name="marque"
                value={formData.marque}
                onChange={handleInputChange}
                placeholder="Marque"
                required
                className="p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="modele"
                value={formData.modele}
                onChange={handleInputChange}
                placeholder="Modèle"
                required
                className="p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                name="annee"
                value={formData.annee}
                onChange={handleInputChange}
                required
                min="1990"
                max={new Date().getFullYear() + 1}
                className="p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleInputChange}
                placeholder="Prix €"
                required
                min="1"
                max="999999999"
                className="p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                name="kilometrage"
                value={formData.kilometrage}
                onChange={handleInputChange}
                placeholder="Km"
                required
                min="0"
                max="9999999"
                className="p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="couleur"
                value={formData.couleur}
                onChange={handleInputChange}
                placeholder="Couleur"
                className="p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <select
                name="carburant"
                value={formData.carburant}
                onChange={handleInputChange}
                className="p-2 rounded bg-gray-700 text-white"
              >
                <option value="Essence">Essence</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybride">Hybride</option>
                <option value="Électrique">Électrique</option>
              </select>
              
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="p-2 rounded bg-gray-700 text-white"
              >
                <option value="Manuelle">Manuelle</option>
                <option value="Automatique">Automatique</option>
              </select>
              
              <select
                name="statut"
                value={formData.statut}
                onChange={handleInputChange}
                className="p-2 rounded bg-gray-700 text-white"
              >
                <option value="disponible">Disponible</option>
                <option value="vendu">Vendu</option>
                <option value="reserve">Réservé</option>
              </select>
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description..."
              rows={3}
              className="w-full p-2 rounded bg-gray-700 text-white resize-none"
            />

            <button
              type="submit"
              disabled={uploadingImage || formData.images.length === 0}
              className="w-full bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              title={formData.images.length === 0 ? 'Ajoutez au moins une photo pour continuer' : ''}
            >
              {uploadingImage ? 'Enregistrement...' : (editingVehicle ? 'Modifier' : 'Ajouter')}
            </button>
            {formData.images.length === 0 && (
              <p className="text-red-400 text-sm text-center mt-2">
                ⚠️ Ajoutez au moins une photo pour pouvoir enregistrer
              </p>
            )}
          </form>
        </div>
      )}

      {/* Message de confirmation de suppression */}
      {deleteConfirmId && (
        <div className="mb-4 p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg text-yellow-200 text-sm">
          ⚠️ Cliquez sur "Confirmer" pour supprimer définitivement le véhicule, ou sur "Annuler" pour annuler.
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {vehicules.map((v) => {
          const imageUrl = v.images?.[0] ? getImageUrl(v.images[0]) : null;
          const isVendu = v.statut === 'vendu';
          const isReserve = v.statut === 'reserve';
          
          return (
            <div key={v.id} className={`bg-gray-800 rounded overflow-hidden ${isVendu ? 'opacity-60' : ''}`}>
              <div className="relative h-40">
                {imageUrl && !imageErrors[v.id] ? (
                  <img 
                    src={imageUrl} 
                    alt={v.modele} 
                    className={`absolute inset-0 w-full h-full object-cover cursor-zoom-in ${isVendu ? 'grayscale' : ''}`}
                    onError={() => handleImageError(v.id)}
                    onClick={() => setZoomedImage(imageUrl)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                    Pas d'image
                  </div>
                )}
                {v.images?.length > 1 && (
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {v.images.length} photos
                  </span>
                )}
                {/* Badge statut */}
                {isVendu && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    VENDU
                  </span>
                )}
                {isReserve && (
                  <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded font-bold">
                    RÉSERVÉ
                  </span>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="text-white font-semibold">{v.marque} {v.modele}</h3>
                <p className="text-gray-400 text-sm">{v.annee} · {v.kilometrage.toLocaleString()} km · <span className="text-yellow-400">{v.statut}</span></p>
                <p className="text-white font-bold mt-2">{v.prix.toLocaleString()} €</p>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(v)}
                    className="flex-1 bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Modifier
                  </button>
                  {deleteConfirmId === v.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="px-3 bg-red-600 text-white py-1 rounded text-sm hover:bg-red-700"
                      >
                        ✓ Confirmer
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 bg-gray-600 text-white py-1 rounded text-sm hover:bg-gray-700"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="px-3 bg-red-600 text-white py-1 rounded text-sm hover:bg-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {vehicules.length === 0 && !showForm && (
        <div className="text-center text-gray-500 py-10">
          Aucun véhicule
        </div>
      )}

      {/* Modal de zoom d'image */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-400 z-10"
          >
            ×
          </button>
          <img 
            src={zoomedImage} 
            alt="Image zoomée"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/login", { method: "GET" })
      .then(res => res.ok && setIsAuthenticated(true))
      .catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        setEmail("");
        setPassword("");
      } else {
        setError(data.error || "Erreur");
      }
    } catch (err) {
      setError("Erreur réseau");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {isAuthenticated ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded">
            <div className="text-white">
              <h1 className="text-2xl font-semibold">Admin SAFECARS</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Déconnexion
            </button>
          </div>

          <div className="bg-gray-800 rounded p-6">
            <ManageVehicules />
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-gray-800 rounded p-8">
            <h1 className="text-2xl text-white font-semibold mb-6 text-center">Admin</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-900 text-red-200 px-4 py-2 rounded text-sm">
                  {error}
                </div>
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white"
                required
              />

              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700"
              >
                Connexion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}