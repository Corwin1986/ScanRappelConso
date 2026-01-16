import React from 'react';
import { FileText, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Terms() {
    const sections = [
        {
            title: '1. Objet',
            content: [
                'Les présentes Conditions Générales d\'Utilisation (CGU) régissent l\'utilisation de l\'application mobile et du site web ScanRappel.',
                'En utilisant ScanRappel, vous acceptez ces conditions dans leur intégralité.',
                'Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser l\'application.'
            ]
        },
        {
            title: '2. Description du service',
            content: [
                'ScanRappel est un service gratuit permettant de vérifier si un produit fait l\'objet d\'un rappel officiel en France.',
                'Le service utilise les données publiques des autorités françaises (RappelConso, DGCCRF).',
                'ScanRappel propose également des fonctionnalités de favoris et d\'alertes.'
            ]
        },
        {
            title: '3. Accès au service',
            content: [
                'L\'accès à ScanRappel est gratuit pour la version de base.',
                'Certaines fonctionnalités premium pourront être proposées ultérieurement.',
                'Vous devez disposer d\'un appareil compatible et d\'une connexion internet.',
                'Nous nous réservons le droit de suspendre ou modifier le service à tout moment.'
            ]
        },
        {
            title: '4. Utilisation acceptable',
            items: [
                {
                    type: 'allowed',
                    title: 'Vous êtes autorisé à',
                    list: [
                        'Scanner des produits pour vérifier leur statut',
                        'Enregistrer des produits en favoris',
                        'Partager des informations de rappel avec votre entourage',
                        'Utiliser l\'application à des fins personnelles ou professionnelles légitimes'
                    ]
                },
                {
                    type: 'forbidden',
                    title: 'Il est strictement interdit de',
                    list: [
                        'Utiliser l\'application de manière frauduleuse',
                        'Tenter de contourner les mesures de sécurité',
                        'Extraire ou copier massivement les données',
                        'Utiliser l\'application pour diffuser de fausses informations',
                        'Revendre ou commercialiser l\'accès au service'
                    ]
                }
            ]
        },
        {
            title: '5. Responsabilité et garanties',
            content: [
                'ScanRappel s\'efforce de fournir des informations exactes provenant de sources officielles.',
                'Toutefois, nous ne garantissons pas l\'exhaustivité ou l\'exactitude absolue des données.',
                'Les informations fournies le sont à titre indicatif et ne remplacent pas les communications officielles.',
                'ScanRappel ne saurait être tenu responsable des dommages directs ou indirects résultant de l\'utilisation du service.',
                'En cas de doute sur un produit, consultez les sites officiels ou contactez le fabricant.'
            ]
        },
        {
            title: '6. Propriété intellectuelle',
            content: [
                'ScanRappel et tous ses éléments (logo, design, code) sont protégés par le droit d\'auteur.',
                'Toute reproduction non autorisée est interdite.',
                'Les données de rappels proviennent de sources publiques et restent la propriété des autorités compétentes.'
            ]
        },
        {
            title: '7. Données personnelles',
            content: [
                'L\'utilisation de vos données personnelles est décrite dans notre Politique de Confidentialité.',
                'Nous collectons uniquement les données nécessaires au fonctionnement du service.',
                'Vous disposez de droits sur vos données (accès, rectification, suppression).',
                'Consultez notre Politique de Confidentialité pour plus de détails.'
            ]
        },
        {
            title: '8. Modification des CGU',
            content: [
                'Nous nous réservons le droit de modifier ces CGU à tout moment.',
                'Les modifications prendront effet dès leur publication sur le site.',
                'Nous vous informerons des modifications importantes par email ou notification.',
                'L\'utilisation continue du service vaut acceptation des nouvelles conditions.'
            ]
        },
        {
            title: '9. Résiliation',
            content: [
                'Vous pouvez cesser d\'utiliser ScanRappel à tout moment.',
                'Nous pouvons suspendre votre accès en cas de violation de ces CGU.',
                'En cas de suppression de votre compte, vos données seront effacées conformément à notre politique.'
            ]
        },
        {
            title: '10. Droit applicable et juridiction',
            content: [
                'Les présentes CGU sont régies par le droit français.',
                'En cas de litige, les tribunaux français seront seuls compétents.',
                'Avant toute action en justice, une tentative de résolution amiable sera privilégiée.'
            ]
        },
        {
            title: '11. Contact',
            content: [
                'Pour toute question concernant ces CGU, contactez-nous à :',
                'Email : contact@scanrappel.fr',
                'Nous nous engageons à répondre dans les meilleurs délais.'
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
                            <span className="text-sm font-medium text-slate-700">Conditions d'utilisation</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Conditions Générales d'Utilisation
                        </h1>

                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Règles et conditions régissant l'utilisation de ScanRappel
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Important Notice */}
            <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-bold text-blue-900 mb-2">
                                Important
                            </h2>
                            <p className="text-blue-800 leading-relaxed">
                                En utilisant ScanRappel, vous acceptez d'être lié par ces Conditions Générales d'Utilisation. 
                                Veuillez les lire attentivement avant d'utiliser le service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl border border-slate-200 p-8"
                            >
                                <h2 className="text-xl font-bold text-slate-900 mb-4">
                                    {section.title}
                                </h2>

                                {section.content && (
                                    <div className="space-y-3">
                                        {section.content.map((item, idx) => (
                                            <p key={idx} className="text-slate-600 leading-relaxed">
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {section.items && (
                                    <div className="space-y-6">
                                        {section.items.map((block, blockIdx) => (
                                            <div key={blockIdx}>
                                                <div className={`flex items-center gap-2 mb-3 ${
                                                    block.type === 'allowed' ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                    {block.type === 'allowed' ? (
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5" />
                                                    )}
                                                    <h3 className="font-bold">
                                                        {block.title}
                                                    </h3>
                                                </div>
                                                <ul className="space-y-2 ml-7">
                                                    {block.list.map((item, itemIdx) => (
                                                        <li key={itemIdx} className="flex items-start gap-3">
                                                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                                                block.type === 'allowed' ? 'bg-green-600' : 'bg-red-600'
                                                            }`} />
                                                            <span className="text-slate-600 leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Accept Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8 border border-emerald-200"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-4">
                            Acceptation des conditions
                        </h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            En téléchargeant, installant ou utilisant ScanRappel, vous reconnaissez avoir lu, 
                            compris et accepté ces Conditions Générales d'Utilisation dans leur intégralité.
                        </p>
                        <a
                            href="mailto:contact@scanrappel.fr"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Des questions ? Contactez-nous
                        </a>
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