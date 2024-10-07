import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'
import Layout from './routes/Layout'
import ProductListPage from './routes/ProductListPage'


function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<LoginPage/>
        },
        {
          path:'/login',
          element:<LoginPage/>
        },
        {
          path:'/register',
          element:<RegisterPage/>,
        },
        {
          path:'/productList',
          element:<ProductListPage/>,
        }
      ]
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
