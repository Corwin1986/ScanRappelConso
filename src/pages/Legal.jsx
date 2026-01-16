import React from 'react';
import { FileText, Building2, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Legal() {
    const sections = [
        {
            title: 'Éditeur du site',
            content: [
                'Nom : ScanRappel',
                'Forme juridique : [À compléter]',
                'Siège social : [À compléter]',
                'SIRET : [À compléter]',
                'Email : contact@scanrappel.fr',
                'Directeur de publication : [À compléter]'
            ]
        },
        {
            title: 'Hébergement',
            content: [
                'Hébergeur : [À compléter]',
                'Adresse : [À compléter]',
                'Téléphone : [À compléter]'
            ]
        },
        {
            title: 'Propriété intellectuelle',
            content: [
                'L\'ensemble du contenu de ce site (textes, images, logos, icônes) est la propriété exclusive de ScanRappel, sauf mention contraire.',
                'Toute reproduction, distribution ou utilisation non autorisée est strictement interdite.',
                'Les marques et logos présents sur le site sont des marques déposées.'
            ]
        },
        {
            title: 'Responsabilité',
            content: [
                'ScanRappel s\'efforce de fournir des informations exactes et à jour provenant des sources officielles.',
                'Toutefois, nous ne pouvons garantir l\'exhaustivité ou l\'exactitude absolue des données.',
                'L\'utilisateur reste responsable de l\'utilisation qu\'il fait des informations fournies.'
            ]
        },
        {
            title: 'Données personnelles',
            content: [
                'Les données collectées font l\'objet d\'un traitement informatique destiné à la fourniture du service ScanRappel.',
                'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données.',
                'Pour exercer ces droits, contactez-nous à : contact@scanrappel.fr'
            ]
        },
        {
            title: 'Cookies',
            content: [
                'Ce site utilise des cookies strictement nécessaires au fonctionnement de l\'application.',
                'Aucun cookie publicitaire ou de tracking n\'est utilisé.',
                'Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités pourraient être limitées.'
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
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-slate-700">Informations légales</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Mentions légales
                        </h1>

                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Informations légales et obligations relatives au site ScanRappel
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-slate-200 p-8"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    {section.title}
                                </h2>
                                <div className="space-y-3">
                                    {section.content.map((item, idx) => (
                                        <p key={idx} className="text-slate-600 leading-relaxed">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8 border border-emerald-200"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-emerald-600" />
                            Contact
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-emerald-600" />
                                <a href="mailto:contact@scanrappel.fr" className="text-slate-700 hover:text-emerald-600 transition-colors">
                                    contact@scanrappel.fr
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-emerald-600" />
                                <span className="text-slate-700">[À compléter]</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Update Date */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500">
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}