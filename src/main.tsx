import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App.tsx"
import { ThemeProvider } from "./context"
import "./index.css"
import store from "./redux/store.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
