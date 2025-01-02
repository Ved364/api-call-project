import { BrowserRouter, Routes, Route } from "react-router-dom";

import AlbumsPage from "./pages/AlbumsPage";
import AlbumIdPage from "./pages/AlbumIdPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/album/:id" element={<AlbumIdPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
