import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './pages/Root.tsx'

import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import Localization from './Localization.tsx';
import Leaderboard from "./pages/Leaderboard.tsx";
import LeaderboardAdmin from "./pages/LeaderboardAdmin.tsx";
import Game from './pages/Game.tsx';

// Hash router works with GH pages out of the box

const router = createHashRouter([
    {
        path: "/",
        element: <Root></Root>,
    },
    {
        path: "/leaderboard",
        element: <Leaderboard></Leaderboard>
    },
    {
        path: "/leaderboard-admin",
        element: <LeaderboardAdmin></LeaderboardAdmin>
    },
    {
        path: "/game",
        element: <Game/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Localization>
      <RouterProvider router={router} />
    </Localization>
  </React.StrictMode>,
)
