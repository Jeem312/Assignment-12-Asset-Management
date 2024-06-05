import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './Router/router.jsx'

import './index.css'
import {
  RouterProvider,
 
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  <HelmetProvider>
     <RouterProvider router={router} />
     </HelmetProvider>
  </QueryClientProvider>
  </React.StrictMode>,
)
