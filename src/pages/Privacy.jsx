import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Privacy() {
    const sections = [
        {
            icon: Database,
            title: 'Données collectées',
            content: [
                {
                    subtitle: 'Données obligatoires',
                    items: [
                        'Historique de scans (stocké localement sur votre appareil)',
                        'Produits favoris (stockés localement sur votre appareil)',
                        'Préférences de l\'application'
                    ]
                },
                {
                    subtitle: 'Données optionnelles',
                    items: [
                        'Adresse email (uniquement si vous activez les alertes)',
                        'Préférences de notification'
                    ]
                }
            ]
        },
        {
            icon: Eye,
            title: 'Utilisation des données',
            content: [
                {
                    subtitle: 'Vos données sont utilisées pour',
                    items: [
                        'Fournir le service de vérification de rappels',
                        'Vous alerter en cas de rappel sur vos produits favoris',
                        'Améliorer l\'expérience utilisateur',
                        'Générer des statistiques anonymisées d\'utilisation'
                    ]
                },
                {
                    subtitle: 'Vos données ne sont JAMAIS',
                    items: [
                        'Vendues à des tiers',
                        'Utilisées à des fins publicitaires',
                        'Partagées avec des partenaires commerciaux',
                        'Transférées hors de l\'Union Européenne'
                    ]
                }
            ]
        },
        {
            icon: Lock,
            title: 'Protection et sécurité',
            content: [
                {
                    subtitle: 'Mesures de sécurité',
                    items: [
                        'Chiffrement SSL/TLS pour toutes les communications',
                        'Hébergement sécurisé en France conforme RGPD',
                        'Accès aux données strictement contrôlé',
                        'Sauvegardes régulières et sécurisées',
                        'Audits de sécurité périodiques'
                    ]
                }
            ]
        },
        {
            icon: UserCheck,
            title: 'Vos droits',
            content: [
                {
                    subtitle: 'Conformément au RGPD, vous disposez de',
                    items: [
                        'Droit d\'accès : consulter vos données',
                        'Droit de rectification : corriger vos données',
                        'Droit à l\'effacement : supprimer vos données',
                        'Droit à la portabilité : récupérer vos données',
                        'Droit d\'opposition : refuser le traitement',
                        'Droit de limitation : limiter l\'utilisation'
                    ]
                },
                {
                    subtitle: 'Pour exercer ces droits',
                    items: [
                        'Contactez-nous à : contact@scanrappel.fr',
                        'Réponse sous 30 jours maximum',
                        'Justificatif d\'identité requis pour sécuriser votre demande'
                    ]
                }
            ]
        },
        {
            icon: FileText,
            title: 'Conservation des données',
            content: [
                {
                    subtitle: 'Durée de conservation',
                    items: [
                        'Historique de scans : stocké localement, vous contrôlez la durée',
                        'Compte utilisateur : tant que le compte est actif',
                        'Données de connexion : 12 mois maximum',
                        'Après suppression du compte : effacement définitif sous 30 jours'
                    ]
                }
            ]
        },
        {
            icon: Shield,
            title: 'Cookies et technologies similaires',
            content: [
                {
                    subtitle: 'Cookies utilisés',
                    items: [
                        'Cookies essentiels : nécessaires au fonctionnement (authentification, préférences)',
                        'Aucun cookie publicitaire',
                        'Aucun cookie de tracking tiers',
                        'Vous pouvez désactiver les cookies dans votre navigateur'
                    ]
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-emerald-50 to-cyan-50/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-slate-700">Protection des données</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Politique de confidentialité
                        </h1>

                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Nous prenons votre vie privée au sérieux. Découvrez comment nous collectons, utilisons et protégeons vos données.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Intro */}
            <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
                    <h2 className="text-xl font-bold text-emerald-900 mb-4">
                        Notre engagement
                    </h2>
                    <p className="text-emerald-800 leading-relaxed">
                        ScanRappel est conçu dans le respect de votre vie privée. Nous collectons le strict minimum de données 
                        nécessaires au fonctionnement de l'application, et ces données ne sont jamais vendues ou partagées 
                        à des fins commerciales.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {sections.map((section, index) => {
                            const Icon = section.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                                >
                                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6">
                                        <div className="flex items-center gap-3 text-white">
                                            <Icon className="w-8 h-8" />
                                            <h2 className="text-2xl font-bold">
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        {section.content.map((block, idx) => (
                                            <div key={idx}>
                                                {block.subtitle && (
                                                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                                                        {block.subtitle}
                                                    </h3>
                                                )}
                                                <ul className="space-y-2">
                                                    {block.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                                                            <span className="text-slate-600 leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Contact Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                            Questions sur vos données ?
                        </h3>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                            Si vous avez des questions concernant cette politique de confidentialité ou l'utilisation de vos données, 
                            n'hésitez pas à nous contacter.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="mailto:contact@scanrappel.fr"
                                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all text-center"
                            >
                                Nous contacter
                            </a>
                            <a
                                href="mailto:dpo@scanrappel.fr"
                                className="px-6 py-3 bg-white text-slate-700 rounded-lg font-medium border-2 border-slate-200 hover:border-emerald-500 transition-all text-center"
                            >
                                Contacter le DPO
                            </a>
                        </div>
                    </motion.div>

                    {/* Update Date */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                            Version 1.0
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}