import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Registration } from "./pages/Register";
import NoPage from "./pages/NoPage";
import { Preview } from "./pages/Preview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}