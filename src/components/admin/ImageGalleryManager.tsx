import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  Trash2, 
  Edit, 
  Eye, 
  Plus,
  Search,
  Filter,
  Download,
  X
} from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  service: string;
  uploadDate: string;
  tags: string[];
  publiee: boolean; // Nouvelle propriété pour gérer la publication
}

const ImageGalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [newImage, setNewImage] = useState({
    title: "",
    description: "",
    category: "",
    service: "",
    tags: "",
    file: null as File | null
  });

  const categories = [
    { value: "before-after", label: "Avant/Après" },
    { value: "nettoyage", label: "Nettoyage" },
    { value: "renovation", label: "Rénovation" },
    { value: "protection", label: "Protection" },
    { value: "personnalisation", label: "Personnalisation" },
    { value: "equipment", label: "Équipement" },
    { value: "workspace", label: "Atelier" }
  ];

  const services = [
    "Express Detailing", "Pro Detailing", "Ultimate Detailing",
    "Express Rénovation", "Pro Rénovation", "Ultimate Rénovation",
    "Express Protection", "Pro Protection", "Ultimate Protection",
    "Film Solaire", "Film Covering", "PPF Couleur"
  ];

  // Charger les images depuis localStorage au démarrage
  useEffect(() => {
    const savedImages = localStorage.getItem('lm-gallery-images');
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        setImages(parsedImages);
        setFilteredImages(parsedImages);
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
      }
    } else {
      // Images par défaut pour démonstration
      const defaultImages: GalleryImage[] = [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "BMW Serie 3 - Avant traitement",
          description: "État du véhicule avant notre service de rénovation complète",
          category: "before-after",
          service: "Pro Rénovation",
          uploadDate: "2024-01-20",
          tags: ["bmw", "avant", "renovation"],
          publiee: true
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "BMW Serie 3 - Après traitement",
          description: "Résultat après notre service de rénovation Pro",
          category: "before-after",
          service: "Pro Rénovation",
          uploadDate: "2024-01-20",
          tags: ["bmw", "après", "renovation", "brillance"],
          publiee: true
        },
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Application céramique",
          description: "Application de protection céramique sur carrosserie",
          category: "protection",
          service: "Pro Protection",
          uploadDate: "2024-01-18",
          tags: ["ceramique", "protection", "carrosserie"],
          publiee: false
        }
      ];
      setImages(defaultImages);
      setFilteredImages(defaultImages);
      localStorage.setItem('lm-gallery-images', JSON.stringify(defaultImages));
    }
  }, []);

  // Filtrer les images selon les critères
  useEffect(() => {
    let filtered = images;

    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(img => img.category === filterCategory);
    }

    setFilteredImages(filtered);
  }, [images, searchTerm, filterCategory]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (max 5MB)');
        return;
      }

      setNewImage(prev => ({ ...prev, file }));

      // Créer une URL de prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (!newImage.file || !newImage.title || !newImage.category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // En production, on uploaderait le fichier vers un serveur
    // Ici on simule avec une URL de base64 ou Unsplash
    const imageUrl = previewUrl || `https://images.unsplash.com/photo-${Date.now()}?auto=format&fit=crop&w=800&q=80`;

    const newImageData: GalleryImage = {
      id: Date.now().toString(),
      url: imageUrl,
      title: newImage.title,
      description: newImage.description,
      category: newImage.category,
      service: newImage.service,
      uploadDate: new Date().toISOString().split('T')[0],
      tags: newImage.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      publiee: false // Par défaut, les nouvelles images ne sont pas publiées
    };

    const updatedImages = [...images, newImageData];
    setImages(updatedImages);
    localStorage.setItem('lm-gallery-images', JSON.stringify(updatedImages));

    // Reset du formulaire
    setNewImage({
      title: "",
      description: "",
      category: "",
      service: "",
      tags: "",
      file: null
    });
    setPreviewUrl(null);
    setIsAddModalOpen(false);
  };

  const toggleImagePublication = (id: string) => {
    const updatedImages = images.map(img =>
      img.id === id ? { ...img, publiee: !img.publiee } : img
    );
    setImages(updatedImages);
    localStorage.setItem('lm-gallery-images', JSON.stringify(updatedImages));
  };

  const handleEditImage = () => {
    if (!selectedImage) return;

    const updatedImages = images.map(img => 
      img.id === selectedImage.id ? selectedImage : img
    );

    setImages(updatedImages);
    localStorage.setItem('lm-gallery-images', JSON.stringify(updatedImages));
    setIsEditModalOpen(false);
    setSelectedImage(null);
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      const updatedImages = images.filter(img => img.id !== id);
      setImages(updatedImages);
      localStorage.setItem('lm-gallery-images', JSON.stringify(updatedImages));
    }
  };

  const openEditModal = (image: GalleryImage) => {
    setSelectedImage({ ...image });
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion de la galerie</h2>
          <p className="text-gray-400">{images.length} images au total</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle image</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="image-file">Fichier image *</Label>
                <Input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-gray-900/50 border-gray-600"
                />
                {previewUrl && (
                  <div className="mt-2">
                    <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="image-title">Titre *</Label>
                <Input
                  id="image-title"
                  value={newImage.title}
                  onChange={(e) => setNewImage(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="image-description">Description</Label>
                <Textarea
                  id="image-description"
                  value={newImage.description}
                  onChange={(e) => setNewImage(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Catégorie *</Label>
                  <Select value={newImage.category} onValueChange={(value) => setNewImage(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Service associé</Label>
                  <Select value={newImage.service} onValueChange={(value) => setNewImage(prev => ({ ...prev, service: value }))}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image-tags">Tags (séparés par des virgules)</Label>
                <Input
                  id="image-tags"
                  value={newImage.tags}
                  onChange={(e) => setNewImage(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Ex: bmw, nettoyage, avant"
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <Button onClick={handleAddImage} className="w-full bg-red-600 hover:bg-red-700">
                Ajouter l'image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres et recherche */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par titre, description ou tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-900/50 border-gray-600 text-white pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grille d'images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <div className="relative">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={() => window.open(image.url, '_blank')}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0 bg-black/50 hover:bg-black/70"
                  onClick={() => openEditModal(image)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="w-8 h-8 p-0 bg-red-600/80 hover:bg-red-600"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">{image.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{image.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge className="bg-blue-600 text-xs">
                  {categories.find(c => c.value === image.category)?.label}
                </Badge>
                {image.service && (
                  <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                    {image.service}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {image.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
                {image.tags.length > 3 && (
                  <span className="text-xs text-gray-400">+{image.tags.length - 3}</span>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2">{image.uploadDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400">
              <Upload className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg mb-2">Aucune image trouvée</p>
              <p className="text-sm">Ajoutez votre première image ou modifiez vos filtres</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal d'édition */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'image</DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="space-y-4">
              <div>
                <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-48 object-cover rounded" />
              </div>

              <div>
                <Label>Titre</Label>
                <Input
                  value={selectedImage.title}
                  onChange={(e) => setSelectedImage(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={selectedImage.description}
                  onChange={(e) => setSelectedImage(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Catégorie</Label>
                  <Select 
                    value={selectedImage.category} 
                    onValueChange={(value) => setSelectedImage(prev => prev ? { ...prev, category: value } : null)}
                  >
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Service</Label>
                  <Select 
                    value={selectedImage.service} 
                    onValueChange={(value) => setSelectedImage(prev => prev ? { ...prev, service: value } : null)}
                  >
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Tags (séparés par des virgules)</Label>
                <Input
                  value={selectedImage.tags.join(', ')}
                  onChange={(e) => setSelectedImage(prev => prev ? { 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  } : null)}
                  className="bg-gray-900/50 border-gray-600 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleEditImage} className="flex-1 bg-red-600 hover:bg-red-700">
                  Enregistrer les modifications
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGalleryManager;
