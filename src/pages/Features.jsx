import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
    Scan, 
    Search, 
    Heart, 
    Bell, 
    History, 
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
    const features = [
        {
            icon: Scan,
            title: 'Scan de codes-barres ou recherche manuelle',
            description: 'Scannez avec votre caméra ou entrez le code-barres manuellement',
            highlight: 'Illimité',
            link: 'Scanner'
        },
        {
            icon: Heart,
            title: 'Favoris illimités',
            description: 'Enregistrez autant de produits que vous voulez dans vos favoris',
            highlight: 'Illimité',
            link: 'Favoris'
        },
        {
            icon: Bell,
            title: 'Alertes automatiques',
            description: 'Recevez des alertes en temps réel si un produit dans vos favoris est rappelé',
            highlight: 'Temps réel'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-cyan-50/50 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-slate-700">100% Gratuit</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                            Toutes les fonctionnalités
                            <span className="block bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                                accessibles gratuitement
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Aucun abonnement, aucun frais caché. Toute la puissance de ScanRappel, gratuitement.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* All Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-600">Tout inclus</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Fonctionnalités incluses
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Toutes les fonctionnalités pour protéger votre famille, sans aucune limite
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const content = (
                                <>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">
                                            {feature.highlight}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </>
                            );

                            return feature.link ? (
                                <Link
                                    key={index}
                                    to={createPageUrl(feature.link)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl transition-all group cursor-pointer h-full"
                                    >
                                        {content}
                                    </motion.div>
                                </Link>
                            ) : (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl transition-all group"
                                >
                                    {content}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Free Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                        <div className="relative text-center">
                            <CheckCircle2 className="w-16 h-16 mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Pourquoi gratuit ?
                            </h2>
                            <div className="space-y-4 text-lg text-emerald-50 max-w-2xl mx-auto">
                                <p className="leading-relaxed">
                                    La sécurité des consommateurs ne devrait pas avoir de prix. Notre mission est de rendre 
                                    l'information sur les rappels accessible à tous, sans barrière financière.
                                </p>
                                <p className="leading-relaxed">
                                    ScanRappel restera toujours <strong className="text-white">100% gratuit</strong>, sans publicité 
                                    et sans frais cachés. C'est notre engagement envers vous.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-12 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Commencez gratuitement dès aujourd'hui
                            </h2>
                            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
                                Rejoignez des milliers d'utilisateurs qui protègent leur famille avec ScanRappel
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to={createPageUrl('Home')}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
                                >
                                    Tester l'application
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to={createPageUrl('Security')}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600/20 text-white rounded-xl font-semibold hover:bg-emerald-600/30 transition-all border-2 border-white/20"
                                >
                                    En savoir plus
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}