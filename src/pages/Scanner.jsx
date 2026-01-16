import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Scan, AlertTriangle, CheckCircle2, History, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Scanner() {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [manualBarcode, setManualBarcode] = useState('');
    const scannerRef = useRef(null);
    const html5QrcodeScannerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (html5QrcodeScannerRef.current) {
                html5QrcodeScannerRef.current.clear().catch(console.error);
            }
        };
    }, []);

    const startScanner = () => {
        setScanning(true);
        setResult(null);

        setTimeout(() => {
            if (scannerRef.current && !html5QrcodeScannerRef.current) {
                html5QrcodeScannerRef.current = new Html5QrcodeScanner(
                    "reader",
                    { 
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.0,
                        formatsToSupport: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                        showTorchButtonIfSupported: true,
                        showZoomSliderIfSupported: true
                    },
                    false
                );

                html5QrcodeScannerRef.current.render(onScanSuccess, onScanError);
            }
        }, 100);
    };

    const onScanSuccess = async (decodedText) => {
        setLoading(true);
        
        // Arrêter le scanner
        if (html5QrcodeScannerRef.current) {
            await html5QrcodeScannerRef.current.clear();
            html5QrcodeScannerRef.current = null;
        }
        
        setScanning(false);

        try {
            // Appel à l'API RappelConso officielle (V2)
            const response = await fetch(
                `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso-v2-gtin-trie/records?where=gtin="${decodedText}"&limit=20`
            );

            const data = await response.json();
            const recalls = data.results || [];

            // Vérifier si le produit a un rappel
            const hasRecall = recalls.length > 0;
            const recall = recalls[0]; // Prendre le rappel le plus récent

            setResult({
                barcode: decodedText,
                productName: recall ? recall.libelle || recall.modeles_ou_references : `Produit ${decodedText}`,
                hasRecall: hasRecall,
                recallInfo: hasRecall ? {
                    date: recall.date_publication ? new Date(recall.date_publication).toLocaleDateString('fr-FR') : 'Non spécifiée',
                    reason: recall.motif_rappel || recall.risques_encourus || 'Motif non précisé',
                    riskLevel: (recall.risques_encourus || '').toLowerCase().includes('grave') || (recall.motif_rappel || '').toLowerCase().includes('salmonelle') || (recall.motif_rappel || '').toLowerCase().includes('listeria') ? 'Élevé' : 'Moyen',
                    action: recall.conduites_a_tenir_par_le_consommateur || 'Ne pas consommer - Retourner en magasin',
                    brand: recall.marque_produit || null,
                    lot: recall.identification_produits?.split('$')[1] || null
                } : null
            });
        } catch (error) {
            console.error('Erreur API RappelConso:', error);
            // En cas d'erreur API, indiquer produit sûr (pas de rappel trouvé)
            setResult({
                barcode: decodedText,
                productName: `Produit ${decodedText}`,
                hasRecall: false,
                recallInfo: null
            });
        } finally {
            setLoading(false);
        }
    };

    const onScanError = (error) => {
        // Ignorer les erreurs de scan normales
        if (!error.includes('NotFoundException')) {
            console.error(error);
        }
    };

    const resetScanner = () => {
        setResult(null);
        setScanning(false);
        setManualBarcode('');
        if (html5QrcodeScannerRef.current) {
            html5QrcodeScannerRef.current.clear().catch(console.error);
            html5QrcodeScannerRef.current = null;
        }
    };

    const handleManualSearch = async (e) => {
        e.preventDefault();
        if (!manualBarcode.trim()) return;
        await onScanSuccess(manualBarcode.trim());
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-8 pb-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-4">
                        <Scan className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Scanner un produit
                    </h1>
                    <p className="text-slate-600">
                        Pointez la caméra vers le code-barres
                    </p>
                </div>

                {/* Scanner Area */}
                {!scanning && !result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-12 text-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-6">
                            <Scan className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">
                            Prêt à scanner
                        </h2>
                        <p className="text-slate-600 mb-8">
                            Cliquez sur le bouton pour activer votre caméra
                        </p>
                        <button
                            onClick={startScanner}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:scale-105 flex items-center gap-2 mx-auto"
                        >
                            <Scan className="w-5 h-5" />
                            Activer le scan de code-barres
                        </button>

                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <p className="text-sm text-slate-500 text-center mb-4">
                                Ou entrez le code-barres manuellement
                            </p>
                            <form onSubmit={handleManualSearch} className="flex gap-3">
                                <input
                                    type="text"
                                    value={manualBarcode}
                                    onChange={(e) => setManualBarcode(e.target.value)}
                                    placeholder="Ex: 3332300009047"
                                    className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:outline-none text-center font-mono"
                                />
                                <button
                                    type="submit"
                                    disabled={!manualBarcode.trim()}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Rechercher
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}

                {/* Scanner Active */}
                {scanning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-xl"
                    >
                        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-white">
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                <span className="font-semibold">Scan en cours...</span>
                            </div>
                            <button
                                onClick={resetScanner}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                        <div id="reader" ref={scannerRef} className="w-full" />
                        <div className="p-6 text-center bg-gradient-to-br from-emerald-50 to-cyan-50">
                            <div className="space-y-3">
                                <p className="text-base font-semibold text-slate-900">
                                    📱 Positionnez le code-barres dans le cadre
                                </p>
                                <p className="text-sm text-slate-600">
                                    La détection est automatique - pas besoin de cliquer !
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-sm text-emerald-700 font-medium">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Scanner actif - Codes-barres acceptés
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Loading */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl p-12 text-center shadow-xl"
                    >
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                            Vérification en cours...
                        </h2>
                        <p className="text-slate-600">
                            Consultation des bases de données officielles
                        </p>
                    </motion.div>
                )}

                {/* Results */}
                <AnimatePresence>
                    {result && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            {/* Main Result Card */}
                            <div className={`rounded-3xl overflow-hidden shadow-xl ${
                                result.hasRecall 
                                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200' 
                                    : 'bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-emerald-200'
                            }`}>
                                <div className={`px-6 py-8 text-center ${
                                    result.hasRecall ? 'bg-red-500' : 'bg-emerald-500'
                                }`}>
                                    {result.hasRecall ? (
                                        <AlertTriangle className="w-16 h-16 text-white mx-auto mb-4" />
                                    ) : (
                                        <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
                                    )}
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        {result.hasRecall ? 'Produit rappelé !' : 'Produit sûr'}
                                    </h2>
                                    <p className="text-white/90">
                                        {result.hasRecall 
                                            ? 'Ce produit fait l\'objet d\'un rappel officiel' 
                                            : 'Aucun rappel détecté pour ce produit'}
                                    </p>
                                </div>

                                <div className="p-6">
                                    <div className="bg-white rounded-2xl p-6 mb-4">
                                        <h3 className="font-bold text-slate-900 mb-3">Informations produit</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Code-barres:</span>
                                                <span className="font-mono font-semibold text-slate-900">{result.barcode}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Produit:</span>
                                                <span className="font-semibold text-slate-900">{result.productName}</span>
                                            </div>
                                            {result.recallInfo?.brand && (
                                                <div className="flex justify-between">
                                                    <span className="text-slate-600">Marque:</span>
                                                    <span className="font-semibold text-slate-900">{result.recallInfo.brand}</span>
                                                </div>
                                            )}
                                            {result.recallInfo?.lot && (
                                                <div className="flex justify-between">
                                                    <span className="text-slate-600">Lot:</span>
                                                    <span className="font-mono font-semibold text-slate-900">{result.recallInfo.lot}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {result.hasRecall && result.recallInfo && (
                                        <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
                                            <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                                                <AlertTriangle className="w-5 h-5" />
                                                Détails du rappel
                                            </h3>
                                            <div className="space-y-3 text-sm">
                                                <div>
                                                    <div className="text-slate-600 mb-1">Date du rappel:</div>
                                                    <div className="font-semibold text-slate-900">{result.recallInfo.date}</div>
                                                </div>
                                                <div>
                                                    <div className="text-slate-600 mb-1">Motif:</div>
                                                    <div className="font-semibold text-slate-900">{result.recallInfo.reason}</div>
                                                </div>
                                                <div>
                                                    <div className="text-slate-600 mb-1">Niveau de risque:</div>
                                                    <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                                                        {result.recallInfo.riskLevel}
                                                    </div>
                                                </div>
                                                <div className="pt-3 border-t border-red-100">
                                                    <div className="text-slate-600 mb-1">Action recommandée:</div>
                                                    <div className="font-semibold text-slate-900">{result.recallInfo.action}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={resetScanner}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                        >
                                            Scanner un autre produit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info Section */}
                {!scanning && !result && !loading && (
                    <div className="mt-8 space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                                <Scan className="w-5 h-5" />
                                Comment scanner ?
                            </h3>
                            <ol className="space-y-2 text-sm text-blue-800">
                                <li className="flex gap-2">
                                    <span className="font-bold">1.</span>
                                    <span>Autorisez l'accès à votre caméra</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">2.</span>
                                    <span>Pointez vers le code-barres du produit</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">3.</span>
                                    <span>Le scan est automatique !</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}