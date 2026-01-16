import About from './pages/About';
import Favoris from './pages/Favoris';
import Features from './pages/Features';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Rappels from './pages/Rappels';
import Scanner from './pages/Scanner';
import Security from './pages/Security';
import Terms from './pages/Terms';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Favoris": Favoris,
    "Features": Features,
    "Home": Home,
    "HowItWorks": HowItWorks,
    "Legal": Legal,
    "Privacy": Privacy,
    "Rappels": Rappels,
    "Scanner": Scanner,
    "Security": Security,
    "Terms": Terms,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};