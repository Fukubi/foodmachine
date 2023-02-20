import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Navbar } from './components/navbar'
import './index.css'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Navbar /> */}

    <RouterProvider router={router} />
  </React.StrictMode>,
)
