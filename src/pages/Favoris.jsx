import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Heart, Scan, X, AlertTriangle, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Favoris() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [addMethod, setAddMethod] = useState('search'); // 'search' ou 'scan'
    const [scanning, setScanning] = useState(false);
    const [brandInput, setBrandInput] = useState('');
    const [brandSuggestions, setSuggestions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [barcodeInput, setBarcodeInput] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [checkingRecalls, setCheckingRecalls] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const scannerRef = useRef(null);
    const html5QrcodeScannerRef = useRef(null);
    const queryClient = useQueryClient();

    const { data: favorites = [] } = useQuery({
        queryKey: ['favorites'],
        queryFn: () => base44.entities.Favorite.list()
    });

    const addFavoriteMutation = useMutation({
        mutationFn: (data) => base44.entities.Favorite.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            resetForm();
        }
    });

    const deleteFavoriteMutation = useMutation({
        mutationFn: (id) => base44.entities.Favorite.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        }
    });

    const updateFavoriteMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Favorite.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        }
    });

    useEffect(() => {
        return () => {
            if (html5QrcodeScannerRef.current) {
                html5QrcodeScannerRef.current.clear().catch(console.error);
            }
        };
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
            checkAllRecalls();
        }
    }, [favorites]);

    // Vérifier les rappels au chargement de la page
    useEffect(() => {
        if (favorites.length > 0) {
            checkAllRecalls();
        }
    }, []);

    const checkAllRecalls = async () => {
        setCheckingRecalls(true);
        const newAlerts = [];

        for (const fav of favorites) {
            try {
                // Si on a un code-barres, chercher d'abord par code-barres exact
                if (fav.barcode) {
                    const barcodeResponse = await fetch(
                        `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso-v2-gtin-trie/records?where=gtin="${fav.barcode}"&limit=20`
                    );
                    const barcodeData = await barcodeResponse.json();
                    
                    if (barcodeData.results && barcodeData.results.length > 0) {
                        newAlerts.push({
                            favoriteId: fav.id,
                            productName: fav.product_name,
                            brand: fav.brand,
                            barcode: fav.barcode,
                            recalls: barcodeData.results
                        });
                        continue; // Passer au favori suivant
                    }
                }
                
                // Sinon, chercher par marque ET produit pour tous les lots
                const searchTerms = [fav.brand, fav.product_name].filter(Boolean).join(' ');
                if (!searchTerms) continue;
                
                const response = await fetch(
                    `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso-v2-gtin-trie/records?where=search(libelle, "${searchTerms}") OR search(marque_produit, "${searchTerms}")&limit=20`
                );
                
                const data = await response.json();
                
                // Filtrer pour vérifier que marque ET nom correspondent vraiment
                if (data.results && data.results.length > 0) {
                    const filteredResults = data.results.filter(recall => {
                        const recallBrand = (recall.marque_produit || '').toLowerCase();
                        const recallName = (recall.libelle || '').toLowerCase();
                        const favBrand = (fav.brand || '').toLowerCase();
                        const favName = (fav.product_name || '').toLowerCase();
                        
                        // La marque ET au moins une partie du nom doivent correspondre
                        const brandMatch = recallBrand.includes(favBrand) || favBrand.includes(recallBrand);
                        const nameMatch = recallName.includes(favName) || favName.includes(recallName);
                        
                        return brandMatch && nameMatch;
                    });
                    
                    if (filteredResults.length > 0) {
                        newAlerts.push({
                            favoriteId: fav.id,
                            productName: fav.product_name,
                            brand: fav.brand,
                            barcode: fav.barcode,
                            recalls: filteredResults
                        });
                    }
                }
            } catch (error) {
                console.error('Erreur vérification rappel:', error);
            }
        }

        setAlerts(newAlerts);
        setCheckingRecalls(false);
    };

    const dismissAlert = (favoriteId) => {
        // Retirer uniquement de l'affichage actuel
        // Ne pas marquer comme "vu" définitivement pour permettre les futures alertes
        setAlerts(alerts.filter(a => a.favoriteId !== favoriteId));
    };

    const startScanner = () => {
        setScanning(true);
        setTimeout(() => {
            if (scannerRef.current && !html5QrcodeScannerRef.current) {
                html5QrcodeScannerRef.current = new Html5QrcodeScanner(
                    "favScanner",
                    { 
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        formatsToSupport: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
                    },
                    false
                );
                html5QrcodeScannerRef.current.render(onScanSuccess, () => {});
            }
        }, 100);
    };

    const searchByBarcode = async (barcode) => {
        setSearchLoading(true);
        try {
            // D'abord chercher dans Open Food Facts
            const offResponse = await fetch(
                `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
            );
            const offData = await offResponse.json();

            if (offData.status === 1 && offData.product) {
                const product = offData.product;
                setSelectedProduct({
                    product_name: product.product_name || product.generic_name || 'Produit',
                    brand: product.brands || 'Marque inconnue',
                    barcode: barcode,
                    found: true
                });
            } else {
                // Si pas trouvé dans OFF, chercher dans RappelConso
                const recallResponse = await fetch(
                    `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso-v2-gtin-trie/records?where=gtin="${barcode}"&limit=1`
                );
                const recallData = await recallResponse.json();
                const recallProduct = recallData.results?.[0];

                if (recallProduct) {
                    setSelectedProduct({
                        product_name: recallProduct.libelle || recallProduct.modeles_ou_references || 'Produit',
                        brand: recallProduct.marque_produit || 'Marque inconnue',
                        barcode: barcode,
                        found: true
                    });
                } else {
                    setSelectedProduct({
                        product_name: '',
                        brand: '',
                        barcode: barcode,
                        found: false
                    });
                }
            }
        } catch (error) {
            setSelectedProduct({
                product_name: '',
                brand: '',
                barcode: barcode,
                found: false
            });
        } finally {
            setSearchLoading(false);
        }
    };

    const onScanSuccess = async (barcode) => {
        stopScanner();
        await searchByBarcode(barcode);
    };

    const stopScanner = () => {
        setScanning(false);
        if (html5QrcodeScannerRef.current) {
            html5QrcodeScannerRef.current.clear().catch(console.error);
            html5QrcodeScannerRef.current = null;
        }
    };

    const searchBrands = async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }

        setSearchLoading(true);
        try {
            const lowerQuery = query.toLowerCase();
            
            // Recherche dans Open Food Facts mondial (tous produits : alimentaires, hygiène, beauté, etc.)
            const response = await fetch(
                `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=50&sort_by=unique_scans_n&countries=France`
            );
            
            const data = await response.json();
            
            if (data.products && data.products.length > 0) {
                const scoredProducts = [];
                
                data.products.forEach(product => {
                    const brand = (product.brands || '').toLowerCase();
                    const name = (product.product_name || product.generic_name || '').toLowerCase();
                    
                    if (!brand && !name) return;
                    
                    // Score de pertinence
                    let score = 0;
                    
                    // Correspondance exacte marque (score max)
                    if (brand === lowerQuery) score += 100;
                    else if (brand.startsWith(lowerQuery)) score += 80;
                    else if (brand.includes(lowerQuery)) score += 60;
                    
                    // Correspondance exacte nom produit
                    if (name === lowerQuery) score += 90;
                    else if (name.startsWith(lowerQuery)) score += 70;
                    else if (name.includes(lowerQuery)) score += 50;
                    
                    // Bonus popularité
                    score += Math.min((product.unique_scans_n || 0) / 100, 20);
                    
                    if (score > 0) {
                        scoredProducts.push({
                            brand: product.brands || 'Marque inconnue',
                            product_name: product.product_name || product.generic_name || 'Produit',
                            gtin: product.code,
                            score: score
                        });
                    }
                });
                
                // Trier par score et éliminer doublons
                scoredProducts.sort((a, b) => b.score - a.score);
                
                const uniqueProducts = [];
                const seen = new Set();
                
                scoredProducts.forEach(product => {
                    const key = `${product.brand}-${product.product_name}`;
                    if (!seen.has(key) && uniqueProducts.length < 8) {
                        seen.add(key);
                        uniqueProducts.push(product);
                    }
                });
                
                setSuggestions(uniqueProducts);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Erreur recherche:', error);
            setSuggestions([]);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleBrandInputChange = (value) => {
        setBrandInput(value);
        searchBrands(value);
    };

    const selectProduct = (product) => {
        setSelectedProduct({
            product_name: product.product_name,
            brand: product.brand,
            barcode: product.gtin || '',
            found: true
        });
        setSuggestions([]);
    };

    const handleBarcodeSubmit = async (e) => {
        e.preventDefault();
        if (!barcodeInput.trim()) return;
        await searchByBarcode(barcodeInput.trim());
    };

    const addToFavorites = () => {
        if (selectedProduct) {
            // Vérifier si le produit existe déjà
            const alreadyExists = favorites.some(fav => {
                if (selectedProduct.barcode && fav.barcode) {
                    return fav.barcode === selectedProduct.barcode;
                }
                return fav.brand.toLowerCase() === selectedProduct.brand.toLowerCase() && 
                       fav.product_name.toLowerCase() === selectedProduct.product_name.toLowerCase();
            });

            if (alreadyExists) {
                alert('Ce produit est déjà dans vos favoris !');
                return;
            }

            addFavoriteMutation.mutate({
                product_name: selectedProduct.product_name,
                brand: selectedProduct.brand,
                barcode: selectedProduct.barcode
            });
            resetForm();
        }
    };

    const resetForm = () => {
        setBrandInput('');
        setSuggestions([]);
        setSelectedProduct(null);
        setBarcodeInput('');
        setShowAddForm(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-4">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Mes Favoris
                    </h1>
                    <p className="text-slate-600">
                        Enregistrez vos produits pour être alerté en cas de rappel
                    </p>
                </div>

                {/* Alerts */}
                <AnimatePresence>
                    {alerts.map((alert) => (
                        <motion.div
                            key={alert.favoriteId}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-red-900 mb-2">
                                        ⚠️ Alerte Rappel
                                    </h3>
                                    <p className="text-red-800 mb-4">
                                        Attention : <strong>{alert.brand} - {alert.productName}</strong> figure parmi les produits rappelés. 
                                        Veuillez vérifier votre lot si vous en avez actuellement en le scannant.
                                    </p>
                                    <Button
                                        onClick={() => dismissAlert(alert.favoriteId)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Merci pour l'alerte
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add Button */}
                {!showAddForm && (
                    <div className="mb-8">
                        <Button
                            onClick={() => setShowAddForm(true)}
                            className="w-full py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-xl text-lg"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Ajouter un produit favori
                        </Button>
                    </div>
                )}

                {/* Add Form */}
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 bg-white rounded-2xl border-2 border-slate-200 overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-white font-semibold">Ajouter un produit</h3>
                            <button onClick={() => { setShowAddForm(false); stopScanner(); }} className="text-white hover:bg-white/20 p-2 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Method Selection */}
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={() => { setAddMethod('search'); stopScanner(); setSelectedProduct(null); }}
                                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                                        addMethod === 'search' 
                                            ? 'bg-emerald-500 text-white' 
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    Rechercher
                                </button>
                                <button
                                    onClick={() => { setAddMethod('scan'); stopScanner(); setSelectedProduct(null); }}
                                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                                        addMethod === 'scan' 
                                            ? 'bg-emerald-500 text-white' 
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    <Scan className="w-5 h-5 inline mr-2" />
                                    Scanner
                                </button>
                            </div>

                            {/* Search Method */}
                            {addMethod === 'search' && !selectedProduct && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Rechercher par marque ou produit
                                        </label>
                                        <div className="relative">
                                            <Input
                                                value={brandInput}
                                                onChange={(e) => handleBrandInputChange(e.target.value)}
                                                placeholder="Ex: Kiri, Nutella, Caprice..."
                                                id="search-input"
                                            />
                                            {searchLoading && (
                                                <div className="absolute right-3 top-3">
                                                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                                </div>
                                            )}
                                            
                                            {brandSuggestions.length > 0 && (
                                                <div 
                                                    className="fixed left-4 right-4 z-[100] mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl max-h-[60vh] overflow-y-auto"
                                                    style={{
                                                        top: document.getElementById('search-input')?.getBoundingClientRect().bottom + 'px',
                                                        maxWidth: document.getElementById('search-input')?.offsetWidth + 'px'
                                                    }}
                                                >
                                                    {brandSuggestions.map((product, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => selectProduct(product)}
                                                            className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors border-b border-slate-100 last:border-b-0"
                                                            >
                                                            <div className="font-semibold text-slate-900">
                                                                {product.brand}
                                                            </div>
                                                            <div className="text-sm text-slate-600">
                                                                {product.product_name}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            {brandInput.length >= 2 && brandSuggestions.length === 0 && !searchLoading && (
                                                <div className="mt-2 text-sm text-orange-600">
                                                    Aucun produit trouvé. Essayez de scanner le code-barres.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Scan Mode */}
                            {addMethod === 'scan' && !scanning && !selectedProduct && (
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <Button onClick={startScanner} className="bg-emerald-500 hover:bg-emerald-600 w-full mb-4">
                                            <Scan className="w-5 h-5 mr-2" />
                                            Activer le scanner
                                        </Button>
                                    </div>
                                    
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-slate-500">ou</span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleBarcodeSubmit}>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Entrer le code-barres manuellement
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={barcodeInput}
                                                onChange={(e) => setBarcodeInput(e.target.value)}
                                                placeholder="Ex: 3329770046795"
                                            />
                                            <Button 
                                                type="submit"
                                                disabled={!barcodeInput.trim() || searchLoading}
                                                className="bg-emerald-500 hover:bg-emerald-600"
                                            >
                                                {searchLoading ? (
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    'OK'
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {addMethod === 'scan' && scanning && (
                                <div>
                                    <div id="favScanner" ref={scannerRef} className="w-full rounded-xl overflow-hidden" />
                                </div>
                            )}

                            {/* Product Found */}
                            {selectedProduct && (
                                <div className={`rounded-xl p-6 ${
                                    selectedProduct.found 
                                        ? 'bg-emerald-50 border-2 border-emerald-200' 
                                        : 'bg-blue-50 border-2 border-blue-200'
                                }`}>
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                        selectedProduct.found 
                                            ? 'bg-emerald-100' 
                                            : 'bg-blue-100'
                                    }`}>
                                        {selectedProduct.found ? (
                                            <Heart className="w-8 h-8 text-emerald-600" />
                                        ) : (
                                            <Scan className="w-8 h-8 text-blue-600" />
                                        )}
                                    </div>
                                    
                                    <h3 className={`text-lg font-bold mb-4 ${
                                        selectedProduct.found ? 'text-emerald-900' : 'text-blue-900'
                                    }`}>
                                        {selectedProduct.found ? '✓ Produit trouvé !' : 'Code-barres scanné'}
                                    </h3>

                                    {selectedProduct.found ? (
                                        <div className="bg-white rounded-lg p-4 mb-4">
                                            <div className="font-bold text-slate-900 mb-1">
                                                {selectedProduct.brand}
                                            </div>
                                            <div className="text-sm text-slate-600 mb-2">
                                                {selectedProduct.product_name}
                                            </div>
                                            {selectedProduct.barcode && (
                                                <div className="text-xs text-slate-500 font-mono">
                                                    Code: {selectedProduct.barcode}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-4 mb-4">
                                            <p className="text-blue-800 text-sm mb-3">
                                                Code scanné : <span className="font-mono font-bold">{selectedProduct.barcode}</span>
                                            </p>
                                            <p className="text-blue-800 text-sm mb-4">
                                                Complétez les informations du produit :
                                            </p>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                                                    Marque *
                                                </label>
                                                <Input
                                                    value={selectedProduct.brand}
                                                    onChange={(e) => setSelectedProduct({...selectedProduct, brand: e.target.value})}
                                                    placeholder="Ex: Nivea, Dove..."
                                                    className="w-full"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                                                    Nom du produit *
                                                </label>
                                                <Input
                                                    value={selectedProduct.product_name}
                                                    onChange={(e) => setSelectedProduct({...selectedProduct, product_name: e.target.value})}
                                                    placeholder="Ex: Déodorant spray, Shampoing..."
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <p className={`${selectedProduct.found ? 'text-emerald-800' : 'text-blue-800'} mb-4 text-sm`}>
                                        {selectedProduct.found 
                                            ? 'Ce produit sera ajouté à vos favoris. Vous serez alerté en cas de rappel.' 
                                            : 'Le produit sera surveillé en cas de rappel officiel.'}
                                    </p>

                                    <div className="flex gap-3">
                                        <Button 
                                            onClick={addToFavorites}
                                            disabled={!selectedProduct.brand.trim() || !selectedProduct.product_name.trim()}
                                            className={`flex-1 ${
                                                selectedProduct.found 
                                                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                                                    : 'bg-blue-600 hover:bg-blue-700'
                                            }`}
                                        >
                                            <Heart className="w-5 h-5 mr-2" />
                                            Ajouter aux favoris
                                        </Button>
                                        <Button 
                                            onClick={resetForm}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            Annuler
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Favorites List */}
                {favorites.length > 0 ? (
                    <div className="space-y-4">
                        {favorites.map((fav) => (
                            <motion.div
                                key={fav.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 flex items-center justify-center flex-shrink-0">
                                            <Heart className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-1">
                                                {fav.product_name}
                                            </h3>
                                            <p className="text-sm text-slate-600 mb-2">
                                                Marque : {fav.brand}
                                            </p>
                                            {fav.barcode && (
                                                <p className="text-xs text-slate-500 font-mono">
                                                    Code : {fav.barcode}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteFavoriteMutation.mutate(fav.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : !showAddForm && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            Aucun favori pour le moment
                        </h3>
                        <p className="text-slate-600">
                            Ajoutez vos produits préférés pour être alerté en cas de rappel
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}