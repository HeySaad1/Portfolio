import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import EntryLoader from './components/EntryLoader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LabPage from './pages/LabPage';
import ContactPage from './pages/ContactPage';
import GartnerPage from './pages/GartnerPage';
import ZonePillarPage from './pages/ZonePillarPage';
import UpvotePage from './pages/UpvotePage';
import ShakeShackPage from './pages/ShakeShackPage';
import KruzeePage from './pages/KruzeePage';
import AIDesignWorkflowPage from './pages/AIDesignWorkflowPage';

/* AboutPage and ContactPage were written against an onNavigate(pageKey) callback.
   Rather than rewrite them, map the old keys onto routes. */
const LEGACY_PATHS = {
  home: '/',
  about: '/about',
  lab: '/lab',
  contact: '/contact',
};

function useLegacyNavigate() {
  const navigate = useNavigate();
  return key => navigate(LEGACY_PATHS[key] ?? key);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Shell({ breadcrumb, clock, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header breadcrumb={breadcrumb} clock={clock} />
      {children}
    </div>
  );
}

function AboutRoute() {
  return <Shell><AboutPage onNavigate={useLegacyNavigate()} /></Shell>;
}

function ContactRoute() {
  const navigate = useNavigate();
  const legacyNavigate = useLegacyNavigate();
  // Contact opens over whatever you were reading, so closing it should go back —
  // unless it was opened directly, in which case there is nothing to go back to.
  const close = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/');
  };
  return <ContactPage onNavigate={legacyNavigate} onClose={close} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <EntryLoader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Shell clock><HomePage /></Shell>} />
        <Route path="/about" element={<AboutRoute />} />
        <Route path="/lab" element={<Shell><LabPage /></Shell>} />
        <Route path="/contact" element={<ContactRoute />} />
        <Route
          path="/work/gartner"
          element={
            <Shell breadcrumb={{ label: 'Gartner', suffix: '(2026)' }}>
              <GartnerPage />
            </Shell>
          }
        />
        <Route
          path="/work/zonepillar"
          element={
            <Shell breadcrumb={{ label: 'ZonePillar', suffix: '(2025)' }}>
              <ZonePillarPage />
            </Shell>
          }
        />
        <Route
          path="/work/upvote"
          element={
            <Shell breadcrumb={{ label: 'Upvote', suffix: '(2023)' }}>
              <UpvotePage />
            </Shell>
          }
        />
        <Route
          path="/work/shake-shack"
          element={
            <Shell breadcrumb={{ label: 'Shake Shack', suffix: '(2025)' }}>
              <ShakeShackPage />
            </Shell>
          }
        />
        <Route
          path="/work/kruzee"
          element={
            <Shell breadcrumb={{ label: 'Kruzee', suffix: '(2025)' }}>
              <KruzeePage />
            </Shell>
          }
        />
        <Route
          path="/ai-design-workflow"
          element={
            <Shell breadcrumb={{ label: 'AI Design Workflow' }}>
              <AIDesignWorkflowPage />
            </Shell>
          }
        />
        <Route path="*" element={<Shell><HomePage /></Shell>} />
      </Routes>
    </BrowserRouter>
  );
}
