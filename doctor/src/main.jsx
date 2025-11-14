import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DoctorContextProvider from './Context/DoctorContext.jsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DoctorContextProvider>
        <App />
      </DoctorContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
