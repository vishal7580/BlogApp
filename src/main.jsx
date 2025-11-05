import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import {Provider} from 'react-redux'
import AddPost from './pages/AddPost.jsx';
import Home from './pages/Home.jsx';
import EditPost from './pages/EditPost.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import store from './store/store.js';
import Post from './pages/Post.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        element: <ProtectedRoute/>,
        children: [
          {
            path:'add-post',
            element: <AddPost/>
          },
          {
            path:'edit-post/:slug',
            element: <EditPost/>
          },
          {
            path: "post/:slug",
            element: <Post />
          }
        ]
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
