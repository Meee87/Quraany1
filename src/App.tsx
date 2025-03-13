import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/home-page";
import QuranPage from "./pages/quran";
import PrayerTimesPage from "./pages/prayer-times";
import MemorizationPage from "./pages/memorization";
import QiblaPage from "./pages/qibla";
import TajweedPage from "./pages/tajweed";
import TasbihPage from "./pages/tasbih";
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
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
