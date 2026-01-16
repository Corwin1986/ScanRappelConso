import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
    Scan, 
    Shield, 
    Bell, 
    Database, 
    Lock, 
    Heart,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    const benefits = [
        {
            icon: Scan,
            title: 'Scan instantané',
            description: 'Scannez n\'importe quel code-barres en une seconde',
            color: 'emerald'
        },
        {
            icon: Database,
            title: 'Données officielles',
            description: 'Rappels gouvernementaux français en temps réel',
            color: 'cyan'
        },
        {
            icon: Bell,
            title: 'Alertes automatiques',
            description: 'Soyez prévenu immédiatement en cas de danger',
            color: 'blue'
        }
    ];

    const steps = [
        {
            number: '01',
            title: 'Scannez',
            description: 'Utilisez votre smartphone pour scanner le code-barres du produit',
            icon: Scan
        },
        {
            number: '02',
            title: 'Analysez',
            description: 'Notre système vérifie instantanément les rappels officiels',
            icon: Shield
        },
        {
            number: '03',
            title: 'Protégez',
            description: 'Recevez une alerte claire si le produit est concerné par un rappel',
            icon: Bell
        }
    ];

    const trustPoints = [
        {
            icon: Database,
            title: 'Données officielles',
            description: 'Sources gouvernementales vérifiées'
        },
        {
            icon: Sparkles,
            title: 'Aucune publicité',
            description: 'Service 100% orienté utilisateur'
        },
        {
            icon: Lock,
            title: 'Vie privée respectée',
            description: 'Vos données restent confidentielles'
        }
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/30">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-emerald-600">
                                Protection consommateur
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                            Scannez vos produits.<br />
                            <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                                Protégez votre famille.
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Vérifiez instantanément si un produit fait l'objet d'un rappel officiel. 
                            Simple, rapide, et rassurant.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to={createPageUrl('Scanner')}
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Scanner un produit
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to={createPageUrl('HowItWorks')}
                                className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold border-2 border-slate-200 hover:border-emerald-500 transition-all hover:shadow-lg"
                            >
                                Comment ça marche
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-slate-500">
                            ✓ Gratuit · ✓ Sans publicité · ✓ Données officielles
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            3 bénéfices clés
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Une protection simple et efficace pour votre quotidien
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                                    <div className="relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500/50 transition-all hover:shadow-xl">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Comment ça marche ?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            3 étapes simples pour votre sécurité
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative"
                                >
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50" />
                                    )}
                                    <div className="relative text-center">
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-2xl font-bold mb-6 shadow-lg shadow-emerald-500/30">
                                            {step.number}
                                        </div>
                                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to={createPageUrl('HowItWorks')}
                            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all"
                        >
                            En savoir plus
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why ScanRappel Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Pourquoi ScanRappel ?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Une solution de confiance pour votre tranquillité d'esprit
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {trustPoints.map((point, index) => {
                            const Icon = point.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {point.title}
                                    </h3>
                                    <p className="text-slate-600">
                                        {point.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                        <div className="relative">
                            <Heart className="w-16 h-16 mx-auto mb-6" />
                            <h3 className="text-3xl font-bold mb-4">
                                Rejoignez des milliers d'utilisateurs
                            </h3>
                            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
                                Protégez votre famille avec ScanRappel, l'application de confiance 
                                pour vérifier les rappels de produits en France.
                            </p>
                            <Link
                                to={createPageUrl('Features')}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
                            >
                                Découvrir les fonctionnalités
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}