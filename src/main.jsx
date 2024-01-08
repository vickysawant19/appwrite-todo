import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from  './App.jsx'
import {store} from './app/store.js'

import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path='' element={<App/>}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
