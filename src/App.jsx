import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import MoviesPage from "./pages/Movies/MoviesPage";
import SupportPage from "./pages/Support/SupportPage";
import SubscriptionsPage from "./pages/Subscriptions/SubscriptionsPage";
// 1. ADD THIS IMPORT LINE RIGHT HERE:
import MovieOpenPage from "./pages/Movies/MovieOpenPage";
import ShowOpenPage from "./pages/Shows/ShowOpenPage";
import ScrollToTopButton from "./shared/components/ScrollToTopButton";
import ShowsPage from "./pages/Shows/ShowsPage";


const App = () => {
  return (
    <BrowserRouter basename="/stream-vibe">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieOpenPage />} />
        <Route path="/shows/:id" element={<ShowOpenPage />} />
        <Route path="/shows" element={<ShowsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
      </Routes>
      <ScrollToTopButton />
    </BrowserRouter>
  );
};

export default App;

 