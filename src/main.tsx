import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './app.tsx';
import { ForgotPassword } from './routes/forgot-password.tsx';
import { Home } from './routes/home/home.tsx';
import { PostDetail } from './routes/posts/post-detail.tsx';
import { PrivateRoute } from './routes/private.tsx';
import { ResetPassword } from './routes/reset-password.tsx';
import { SignIn } from './routes/sign-in.tsx';
import { SignUp } from './routes/sign-up/sign-up.tsx';
import { Spots } from './routes/spots/spots.tsx';
import { UserActivation } from './routes/user-activation.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}/>
            <Route path="/spots" element={<Spots />}/>
            <Route path="/posts/:postId" element={<PostDetail />}/>
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user-activation" element={<UserActivation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
