import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InnovaTubeApp from './InnovaTubeApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InnovaTubeApp />
  </StrictMode>,
)
