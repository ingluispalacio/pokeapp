import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/routes/app-router'

import { QueryProvider } from '@/providers/query-provider'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </React.StrictMode>,
)
