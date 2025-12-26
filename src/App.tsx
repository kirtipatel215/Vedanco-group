import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Types
import { ViewState } from './types';

// Layout & UI
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SideNavigation from './components/layout/SideNavigation';
import CustomCursor from './components/ui/CustomCursor';
import IntroAnimation from './components/visuals/IntroAnimation';

// Pages
import Home from './pages/Home';
import BusinessPage from './pages/Business';
import PortfolioPage from './pages/Portfolio';
import SolutionsPage from './pages/Solutions';
import AboutPage from './pages/About';
import CareersPage from './pages/Careers';
import ContactPage from './pages/Contact';
import LegalPage from './pages/Legal';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [introFinished, setIntroFinished] = useState(false);

  const handleViewChange = (
    newView: ViewState,
    newTargetId: string | null = null
  ) => {
    setView(newView);
    setTargetId(newTargetId);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      <CustomCursor />

      <Navbar
        currentView={view}
        onChangeView={(v, id) => handleViewChange(v, id)}
        show={introFinished}
      />

      {view === ViewState.HOME && introFinished && <SideNavigation />}

      <AnimatePresence>
        {!introFinished && (
          <IntroAnimation onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      <main>
        {view === ViewState.HOME && (
          <Home
            introFinished={introFinished}
            setView={setView}
            handleViewChange={handleViewChange}
          />
        )}

        {view === ViewState.BUSINESS && (
          <BusinessPage
            onBack={() => setView(ViewState.HOME)}
            targetId={targetId}
          />
        )}

        {view === ViewState.PORTFOLIO && (
          <PortfolioPage onBack={() => setView(ViewState.HOME)} />
        )}

        {view === ViewState.SOLUTIONS && (
          <SolutionsPage
            onBack={() => setView(ViewState.HOME)}
            targetId={targetId}
          />
        )}

        {view === ViewState.ABOUT && (
          <AboutPage targetId={targetId} />
        )}

        {view === ViewState.CAREERS && (
          <CareersPage onBack={() => setView(ViewState.HOME)} />
        )}

        {view === ViewState.CONTACT && (
          <ContactPage onBack={() => setView(ViewState.HOME)} />
        )}

        {view === ViewState.LEGAL && (
          <LegalPage
            onBack={() => setView(ViewState.HOME)}
            targetId={targetId}
          />
        )}
      </main>

      <Footer handleViewChange={handleViewChange} />
    </div>
  );
}

export default App;
