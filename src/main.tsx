import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Localization from './Localization.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Localization>
      <RouterProvider router={router} />
    </Localization>
  </React.StrictMode>,
)
