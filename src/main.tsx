import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './app.tsx';
import { Home } from './routes/home.tsx';
import { PrivateRoute } from './routes/private.tsx';
import { SignIn } from './routes/sign-in.tsx';
import { SignUp } from './routes/sign-up/sign-up.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
