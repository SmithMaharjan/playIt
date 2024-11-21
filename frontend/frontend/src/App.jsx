import React, { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import AddTodo from './component/addTodo'
import Todo from './component/todo'
import RefreshHandler from './RefreshHandler'
import AddMusicForm from './component/AddMusicForm'
import Album from './pages/Album'
import SingleAlbum from './pages/SingleAlbum'
import Random from './pages/Random'

const App = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path="/Albums" element={<Album />}></Route>
        <Route path="/singleAlbum" element={<SingleAlbum />}></Route>
        <Route path='/addMusic' element={<AddMusicForm />}></Route>
        <Route path='/home' element={<PrivateRoute element={<Home />} />}></Route>
        <Route path='/random' element={<Random />}></Route>
      </Routes>
      {/* <AddTodo />
      <Todo /> */}


    </div >
  )
}

export default App