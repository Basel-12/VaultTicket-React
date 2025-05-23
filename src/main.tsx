import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:7263'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
