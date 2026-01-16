import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
    Shield, 
    Lock, 
    Database, 
    Eye, 
    FileCheck,
    Server,
    UserCheck,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Security() {
    const principles = [
        {
            icon: Database,
            title: 'Données publiques officielles',
            description: 'Nous utilisons exclusivement les bases de données publiques françaises (RappelConso, DGCCRF) pour vérifier les rappels de produits.',
            details: [
                'Sources gouvernementales vérifiées',
                'Mises à jour quotidiennes automatiques',
                'Aucune donnée inventée ou approximative'
            ]
        }
    ];

    const securityFeatures = [
        {
            icon: Shield,
            title: 'Chiffrement des données',
            description: 'Toutes vos données sont chiffrées lors de leur transmission et de leur stockage'
        },
        {
            icon: Server,
            title: 'Hébergement sécurisé',
            description: 'Nos serveurs sont hébergés en France et conformes aux normes RGPD'
        },
        {
            icon: UserCheck,
            title: 'Anonymisation',
            description: 'Les statistiques d\'utilisation sont totalement anonymisées'
        },
        {
            icon: FileCheck,
            title: 'Audits réguliers',
            description: 'Notre infrastructure est auditée régulièrement par des experts'
        }
    ];

    const dataCollection = [
        {
            category: 'Données collectées',
            items: [
                { name: 'Historique de scans', storage: 'Local (votre appareil)', optional: false },
                { name: 'Produits favoris', storage: 'Local (votre appareil)', optional: false },
                { name: 'Adresse email', storage: 'Serveur sécurisé', optional: true },
                { name: 'Préférences de notification', storage: 'Local', optional: true }
            ]
        },
        {
            category: 'Données NON collectées',
            items: [
                { name: 'Localisation GPS', storage: '—', optional: null },
                { name: 'Contacts téléphoniques', storage: '—', optional: null },
                { name: 'Données bancaires', storage: '—', optional: null },
                { name: 'Historique de navigation', storage: '—', optional: null }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-cyan-50/50 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-slate-700">Transparence totale</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                            Sécurité
                            <span className="block bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                                & Protection des données
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Votre confiance est notre priorité. Découvrez comment nous protégeons vos données et respectons votre vie privée.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Principles */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Notre principe fondamental
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            L'engagement qui guide toutes nos décisions
                        </p>
                    </div>

                    <div className="space-y-12">
                        {principles.map((principle, index) => {
                            const Icon = principle.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl transition-all overflow-hidden"
                                >
                                    <div className="p-8 md:p-10">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                                    {principle.title}
                                                </h3>
                                                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                                    {principle.description}
                                                </p>
                                                <ul className="space-y-2">
                                                    {principle.details.map((detail, idx) => (
                                                        <li key={idx} className="flex items-center gap-3">
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                                            <span className="text-slate-700">{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Security Features Grid */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Mesures de sécurité
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Technologies et pratiques pour garantir votre protection
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {securityFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Data Collection Table */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Quelles données collectons-nous ?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Une transparence totale sur les informations que nous utilisons
                        </p>
                    </div>

                    <div className="space-y-8">
                        {dataCollection.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg"
                            >
                                <div className={`px-6 py-4 ${index === 0 ? 'bg-emerald-50' : 'bg-red-50'} border-b border-slate-200`}>
                                    <h3 className={`text-lg font-bold ${index === 0 ? 'text-emerald-900' : 'text-red-900'}`}>
                                        {section.category}
                                    </h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <span className="font-medium text-slate-900">{item.name}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-slate-600">{item.storage}</span>
                                                {item.optional !== null && (
                                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                        item.optional 
                                                            ? 'bg-blue-50 text-blue-600' 
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                        {item.optional ? 'Optionnel' : 'Requis'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    Vous gardez le contrôle
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Vous pouvez à tout moment consulter, modifier ou supprimer vos données depuis les paramètres de l'application. 
                                    La suppression de votre compte entraîne l'effacement définitif de toutes vos informations.
                                </p>
                            </div>
                        </div>
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
                            <Shield className="w-16 h-16 mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Des questions sur la sécurité ?
                            </h2>
                            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
                                Consultez notre politique de confidentialité complète ou contactez-nous pour toute question
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to={createPageUrl('Privacy')}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
                                >
                                    Politique de confidentialité
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to={createPageUrl('About')}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600/20 text-white rounded-xl font-semibold hover:bg-emerald-600/30 transition-all border-2 border-white/20"
                                >
                                    À propos de nous
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}