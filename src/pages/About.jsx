import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Shield, Heart, Users, Target, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
    const values = [
        {
            icon: Shield,
            title: 'Protection',
            description: 'Protéger les consommateurs en leur donnant accès à une information claire et fiable sur les rappels de produits'
        },
        {
            icon: Heart,
            title: 'Bienveillance',
            description: 'Fournir un service rassurant, sans alarmisme, qui accompagne les familles au quotidien'
        },
        {
            icon: Users,
            title: 'Accessibilité',
            description: 'Rendre la sécurité alimentaire et produit accessible à tous, gratuitement et simplement'
        }
    ];

    const milestones = [
        {
            year: '2024',
            title: 'Naissance du projet',
            description: 'Face au manque d\'outils simples pour vérifier les rappels, l\'idée de ScanRappel est née'
        },
        {
            year: '2024',
            title: 'Développement',
            description: 'Création de l\'application avec un focus sur l\'expérience utilisateur et la fiabilité des données'
        },
        {
            year: '2025',
            title: 'Lancement',
            description: 'Mise à disposition de ScanRappel au grand public en France'
        },
        {
            year: 'Futur',
            title: 'Vision à long terme',
            description: 'Extension aux rappels européens et intégration avec les commerçants pour une protection maximale'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-cyan-50/50 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
                            <Heart className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-slate-700">Notre histoire</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                            À propos de
                            <span className="block bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                                ScanRappel
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Une mission simple : protéger les consommateurs en rendant l'information sur les rappels accessible à tous
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                        <div className="relative">
                            <div className="flex items-center justify-center mb-6">
                                <Target className="w-16 h-16" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                                Notre mission
                            </h2>
                            <p className="text-lg text-emerald-50 leading-relaxed text-center max-w-3xl mx-auto">
                                Chaque année en France, des milliers de produits font l'objet de rappels pour des raisons sanitaires. 
                                Malheureusement, trop souvent, les consommateurs ne sont pas informés à temps.
                            </p>
                            <p className="text-lg text-emerald-50 leading-relaxed text-center max-w-3xl mx-auto mt-4">
                                <strong>ScanRappel est né de cette problématique :</strong> créer un outil simple, gratuit et fiable 
                                qui permet à chacun de vérifier instantanément si un produit est sûr ou fait l'objet d'un rappel.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Nos valeurs
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Les principes qui guident chacune de nos décisions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl transition-all text-center"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>



            {/* Vision Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-6">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Notre vision à long terme
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Nous imaginons un futur où chaque consommateur, en France et au-delà, peut acheter et consommer 
                            en toute confiance, sachant qu'il sera immédiatement alerté si un problème survient avec un produit.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Au-delà du scan individuel, nous travaillons sur des partenariats avec les commerces pour intégrer 
                            nos alertes directement dans leurs systèmes, créant ainsi un filet de sécurité complet pour tous.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to={createPageUrl('Features')}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:scale-105"
                            >
                                Découvrir les fonctionnalités
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to={createPageUrl('Security')}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold border-2 border-slate-200 hover:border-emerald-500 transition-all hover:shadow-lg"
                            >
                                Sécurité & Données
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200"
                    >
                        <Heart className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Une question ? Un retour ?
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                            Nous sommes à l'écoute de nos utilisateurs pour améliorer continuellement ScanRappel. 
                            N'hésitez pas à nous contacter !
                        </p>
                        <a
                            href="mailto:contact@scanrappel.fr"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:scale-105"
                        >
                            Nous contacter
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}