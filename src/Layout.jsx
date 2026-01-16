import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Shield, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Accueil', path: 'Home' },
        { name: 'Scanner', path: 'Scanner' },
        { name: 'Favoris', path: 'Favoris' },
        { name: 'Rappels', path: 'Rappels' },
        { name: 'Comment ça marche', path: 'HowItWorks' },
        { name: 'Fonctionnalités', path: 'Features' },
        { name: 'Sécurité', path: 'Security' },
        { name: 'À propos', path: 'About' },
    ];

    const legalLinks = [
        { name: 'Mentions légales', path: 'Legal' },
        { name: 'Confidentialité', path: 'Privacy' },
        { name: 'CGU', path: 'Terms' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
                            <div className="relative">
                                <Shield className="w-8 h-8 text-emerald-500 transition-transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                                ScanRappel
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.path}
                                    to={createPageUrl(item.path)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        currentPageName === item.path
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to={createPageUrl('Scanner')}
                                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:scale-105"
                            >
                                Scanner
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-slate-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-slate-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white">
                        <div className="px-4 py-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.path}
                                    to={createPageUrl(item.path)}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                        currentPageName === item.path
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to={createPageUrl('Scanner')}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium text-center"
                            >
                                Scanner
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-7 h-7 text-emerald-400" />
                                <span className="text-xl font-bold text-white">ScanRappel</span>
                            </div>
                            <p className="text-slate-400 mb-4 leading-relaxed max-w-md">
                                Protégez votre famille en scannant vos produits. 
                                Recevez des alertes instantanées en cas de rappel officiel.
                            </p>
                            <div className="flex gap-3">
                                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Navigation</h3>
                            <ul className="space-y-2">
                                {navigation.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={createPageUrl(item.path)}
                                            className="text-slate-400 hover:text-emerald-400 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Légal</h3>
                            <ul className="space-y-2">
                                {legalLinks.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={createPageUrl(item.path)}
                                            className="text-slate-400 hover:text-emerald-400 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
                        <p>© {new Date().getFullYear()} ScanRappel. Tous droits réservés.</p>
                        <p className="mt-2">Données officielles · Aucune publicité · Respect de la vie privée</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}