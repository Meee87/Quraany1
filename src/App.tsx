import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/home-page";
import QuranPage from "./pages/quran";
import QuranMushaf from "./pages/quran-mushaf";
import ElegantMushaf from "./pages/elegant-mushaf";
import PrayerTimesPage from "./pages/prayer-times";
import MemorizationPage from "./pages/memorization";
import QiblaPage from "./pages/qibla";
import TajweedPage from "./pages/tajweed";
import TasbihPage from "./pages/tasbih";
import AdhkarPage from "./pages/adhkar";
import DuasPage from "./pages/duas";
import InteractiveQuranPage from "./pages/interactive-quran";
import QuranForKidsPage from "./pages/quran-for-kids";
import NightModePage from "./pages/night-mode";
import QuranStatsPage from "./pages/quran-stats";
import QuranInLifePage from "./pages/quran-in-life";
import RamadanHomePage from "./pages/ramadan-home";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          جاري التحميل...
        </div>
      }
    >
      <>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/quran"
            element={
              <Layout>
                <QuranPage />
              </Layout>
            }
          />
          <Route path="/quran-mushaf" element={<QuranMushaf />} />
          <Route path="/elegant-mushaf" element={<ElegantMushaf />} />
          <Route
            path="/interactive-quran"
            element={
              <Layout>
                <InteractiveQuranPage />
              </Layout>
            }
          />
          <Route
            path="/prayer-times"
            element={
              <Layout>
                <PrayerTimesPage />
              </Layout>
            }
          />
          <Route
            path="/memorization"
            element={
              <Layout>
                <MemorizationPage />
              </Layout>
            }
          />
          <Route
            path="/qibla"
            element={
              <Layout>
                <QiblaPage />
              </Layout>
            }
          />
          <Route
            path="/tajweed"
            element={
              <Layout>
                <TajweedPage />
              </Layout>
            }
          />
          <Route
            path="/tasbih"
            element={
              <Layout>
                <TasbihPage />
              </Layout>
            }
          />
          <Route
            path="/adhkar"
            element={
              <Layout>
                <AdhkarPage />
              </Layout>
            }
          />
          <Route
            path="/duas"
            element={
              <Layout>
                <DuasPage />
              </Layout>
            }
          />
          <Route
            path="/night-mode"
            element={
              <Layout>
                <NightModePage />
              </Layout>
            }
          />
          <Route
            path="/quran-stats"
            element={
              <Layout>
                <QuranStatsPage />
              </Layout>
            }
          />
          <Route
            path="/quran-in-life"
            element={
              <Layout>
                <QuranInLifePage />
              </Layout>
            }
          />
          <Route
            path="/quran-for-kids"
            element={
              <Layout>
                <QuranForKidsPage />
              </Layout>
            }
          />
          <Route path="/ramadan" element={<RamadanHomePage />} />
          {/* Add a catch-all route for Tempo */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<></>} />
          )}
        </Routes>
        {/* Move Tempo routes after regular routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
