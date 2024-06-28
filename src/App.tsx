import React from 'react'
import RestreamList from './pages/RestreamList'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import AddRestream from './pages/AddRestream/index';
import AddUser from './pages/AddUser'
import UserList from './pages/UserList'

function App() {

  return (
    <div className='App'>
        <Header />
        <Routes >
          <Route path='/login' element={<Login/>}>
          </Route>
          <Route path='/restream' element={<RestreamList/>}>
          </Route>
          <Route path='/addRestream' element={<AddRestream/>}>
          </Route>
          <Route path='/updateRestream/:id' element={<AddRestream/>}>
          </Route>
          <Route path='/userList' element={<UserList/>}>
          </Route>
          <Route path='/addUser' element={<AddUser/>}>
          </Route>
          <Route path='/updateUser/:id' element={<AddUser/>}>
          </Route>
        </Routes>
    </div>
  )
}

export default App
