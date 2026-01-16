import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Scan, Search, Shield, Bell, ArrowRight, Smartphone, Database, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
    const steps = [
        {
            icon: Scan,
            title: 'Scanner le code-barres',
            description: 'Ouvrez l\'application ScanRappel et pointez votre appareil photo vers le code-barres du produit. La reconnaissance est instantanée et fonctionne même hors ligne pour les produits déjà scannés.',
            details: [
                'Reconnaissance automatique du code EAN/GTIN',
                'Fonctionne avec tous les types de codes-barres standard',
                'Scan ultra-rapide en moins d\'une seconde'
            ],
            color: 'emerald'
        },
        {
            icon: Search,
            title: 'Analyse des rappels officiels',
            description: 'Notre système interroge en temps réel les bases de données officielles françaises pour vérifier si ce produit fait l\'objet d\'un rappel ou d\'une alerte sanitaire.',
            details: [
                'Connexion aux sources gouvernementales (RappelConso)',
                'Vérification instantanée',
                'Historique complet des rappels'
            ],
            color: 'cyan'
        },
        {
            icon: Shield,
            title: 'Résultat immédiat',
            description: 'En quelques secondes, vous recevez une réponse claire : produit sûr ou produit rappelé. Si un rappel est en cours, nous vous donnons tous les détails nécessaires.',
            details: [
                'Alerte visuelle claire (vert = OK, rouge = rappel)',
                'Détails du rappel si applicable',
                'Recommandations et démarches à suivre'
            ],
            color: 'blue'
        }
    ];

    const features = [
        {
            icon: Smartphone,
            title: 'Simple d\'utilisation',
            description: 'Interface intuitive, aucune formation nécessaire'
        },
        {
            icon: Database,
            title: 'Données fiables',
            description: 'Sources officielles et mises à jour quotidiennes'
        },
        {
            icon: Bell,
            title: 'Alertes proactives',
            description: 'Recevez des notifications pour vos produits favoris'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-cyan-50/50 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-slate-700">Guide d'utilisation</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                            Comment fonctionne
                            <span className="block bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                                ScanRappel ?
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Un processus simple en 3 étapes pour garantir la sécurité de vos produits
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                                >
                                    {/* Icon & Number */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className={`absolute inset-0 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-3xl blur-2xl opacity-20`} />
                                            <div className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center shadow-xl`}>
                                                <Icon className="w-16 h-16 text-white" />
                                            </div>
                                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                                                <span className="text-xl font-bold text-slate-900">{index + 1}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                            {step.title}
                                        </h2>
                                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                            {step.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {step.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className={`w-5 h-5 text-${step.color}-600 flex-shrink-0 mt-0.5`} />
                                                    <span className="text-slate-700">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Pourquoi c'est efficace
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Une technologie pensée pour votre sécurité au quotidien
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl transition-all"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mb-6">
                                        <Icon className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
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
                                Prêt à protéger votre famille ?
                            </h2>
                            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
                                Découvrez toutes les fonctionnalités de ScanRappel et commencez à scanner vos produits dès maintenant.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to={createPageUrl('Features')}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
                                >
                                    Voir les fonctionnalités
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to={createPageUrl('Security')}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600/20 text-white rounded-xl font-semibold hover:bg-emerald-600/30 transition-all border-2 border-white/20"
                                >
                                    Sécurité & Données
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}