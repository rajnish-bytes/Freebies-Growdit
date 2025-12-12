import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App.tsx'

function AppWithAOS() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 50,
      delay: 0,
    });
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithAOS />
  </StrictMode>,
)
