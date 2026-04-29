import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Self-hosted fonts (replaces Google Fonts CDN — privacy + perf).
// Cormorant Garamond: display serif used for headings + italics.
// Inter: tight sans-serif used for kickers / labels.
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
