import React, { useState, useEffect } from 'react';
import { AlertTriangle, Calendar, Package, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Rappels() {
    const [recalls, setRecalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRecalls();
    }, []);

    const fetchRecalls = async () => {
        setLoading(true);
        try {
            // Récupérer les 500 derniers rappels (TOUS les rappels, pas seulement ceux avec code-barres)
            const response = await fetch(
                'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso-v2-gtin-trie/records?limit=100&order_by=date_publication%20DESC'
            );
            const data = await response.json();
            setRecalls(data.results || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des rappels:', error);
        } finally {
            setLoading(false);
        }
    };

    const groupRecallsByPeriod = () => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const thirtyOneDaysAgo = new Date(now);
        thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);

        const filtered = recalls.filter(recall => {
            const searchLower = searchTerm.toLowerCase();
            return (
                (recall.libelle || '').toLowerCase().includes(searchLower) ||
                (recall.marque_produit || '').toLowerCase().includes(searchLower) ||
                (recall.motif_rappel || '').toLowerCase().includes(searchLower)
            );
        });

        const todayRecalls = [];
        const yesterdayRecalls = [];
        const lastWeekRecalls = [];
        const lastMonthRecalls = [];

        filtered.forEach(recall => {
            const recallDate = new Date(recall.date_publication);
            recallDate.setHours(0, 0, 0, 0);
            
            // Aujourd'hui uniquement
            if (recallDate >= now && recallDate < tomorrow) {
                todayRecalls.push(recall);
            } 
            // Hier uniquement
            else if (recallDate >= yesterday && recallDate < now) {
                yesterdayRecalls.push(recall);
            } 
            // Semaine dernière (7 jours, exclus hier et aujourd'hui)
            else if (recallDate >= sevenDaysAgo && recallDate < yesterday) {
                lastWeekRecalls.push(recall);
            } 
            // Mois dernier (jusqu'à 31 jours, exclus la semaine dernière)
            else if (recallDate >= thirtyOneDaysAgo && recallDate < sevenDaysAgo) {
                lastMonthRecalls.push(recall);
            }
        });

        return {
            today: todayRecalls,
            yesterday: yesterdayRecalls,
            lastWeek: lastWeekRecalls,
            lastMonth: lastMonthRecalls
        };
    };

    const groupedRecalls = groupRecallsByPeriod();

    const RecallCard = ({ recall }) => {
        const isHighRisk = 
            (recall.risques_encourus || '').toLowerCase().includes('grave') ||
            (recall.motif_rappel || '').toLowerCase().includes('salmonelle') ||
            (recall.motif_rappel || '').toLowerCase().includes('listeria');

        // Gérer le champ image (string avec URLs séparées par |)
        const getImageUrl = () => {
            if (!recall.liens_vers_les_images) return null;
            if (typeof recall.liens_vers_les_images === 'string') {
                const urls = recall.liens_vers_les_images.split('|').map(url => url.trim());
                return urls[0];
            }
            return null;
        };

        const imageUrl = getImageUrl();
        const [imageError, setImageError] = React.useState(false);

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-all ${
                    isHighRisk ? 'border-red-200' : 'border-slate-200'
                }`}
            >
                <div className="flex items-start gap-4">
                    {imageUrl && !imageError ? (
                        <img 
                            src={imageUrl} 
                            alt={recall.libelle || 'Produit'}
                            className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className={`w-24 h-24 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isHighRisk ? 'bg-red-50' : 'bg-orange-50'
                        }`}>
                            <AlertTriangle className={`w-6 h-6 ${
                                isHighRisk ? 'text-red-600' : 'text-orange-600'
                            }`} />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-bold text-slate-900 leading-tight">
                                {recall.libelle || recall.modeles_ou_references || 'Produit'}
                            </h3>
                            {isHighRisk && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full whitespace-nowrap">
                                    Risque élevé
                                </span>
                            )}
                        </div>

                        {recall.marque_produit && (
                            <p className="text-sm text-slate-600 mb-2">
                                Marque : <span className="font-semibold">{recall.marque_produit}</span>
                            </p>
                        )}

                        <div className="space-y-1 mb-3">
                            {recall.motif_rappel && (
                                <p className="text-sm text-slate-700">
                                    <span className="font-medium">Motif :</span> {recall.motif_rappel}
                                </p>
                            )}
                            {recall.risques_encourus && (
                                <p className="text-sm text-orange-700">
                                    <span className="font-medium">Risques :</span> {recall.risques_encourus}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                            {recall.date_publication && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(recall.date_publication).toLocaleDateString('fr-FR')}
                                    </div>
                                )}
                            {recall.categorie_de_produit && (
                                <div className="flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    {recall.categorie_de_produit}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const RecallList = ({ recalls }) => {
        if (recalls.length === 0) {
            return (
                <div className="text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Aucun rappel
                    </h3>
                    <p className="text-slate-600">
                        {searchTerm 
                            ? 'Aucun résultat pour cette recherche'
                            : 'Aucun rappel publié pour cette période'}
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {recalls.map((recall, index) => (
                    <RecallCard key={index} recall={recall} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-4">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Rappels de produits
                    </h1>
                    <p className="text-slate-600">
                        Tous les rappels officiels publiés récemment
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher un produit, une marque..."
                            className="pl-12 py-6 text-base"
                        />
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-20">
                        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
                        <p className="text-slate-600">Chargement des rappels...</p>
                    </div>
                )}

                {/* Tabs by period */}
                {!loading && (
                    <Tabs defaultValue="today" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                            <TabsTrigger value="today" className="text-xs sm:text-sm">
                                <span className="hidden sm:inline">Aujourd'hui</span>
                                <span className="sm:hidden">Auj.</span>
                                <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                    {groupedRecalls.today.length}
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="yesterday" className="text-xs sm:text-sm">
                                Hier
                                <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                    {groupedRecalls.yesterday.length}
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="lastWeek" className="text-xs sm:text-sm">
                                <span className="hidden sm:inline">Semaine dernière</span>
                                <span className="sm:hidden">Semaine</span>
                                <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                    {groupedRecalls.lastWeek.length}
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="lastMonth" className="text-xs sm:text-sm">
                                <span className="hidden sm:inline">Mois dernier</span>
                                <span className="sm:hidden">Mois</span>
                                <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                    {groupedRecalls.lastMonth.length}
                                </span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="today">
                            <RecallList recalls={groupedRecalls.today} />
                        </TabsContent>

                        <TabsContent value="yesterday">
                            <RecallList recalls={groupedRecalls.yesterday} />
                        </TabsContent>

                        <TabsContent value="lastWeek">
                            <RecallList recalls={groupedRecalls.lastWeek} />
                        </TabsContent>

                        <TabsContent value="lastMonth">
                            <RecallList recalls={groupedRecalls.lastMonth} />
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </div>
    );
}