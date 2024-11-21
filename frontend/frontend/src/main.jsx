import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './apis/store.js'
import MusicContextProvider from './context/MusicState.jsx'
import AlbumContextProvider from './context/AlbumState.jsx'
import UserContextProvider from './context/UserState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MusicContextProvider>

          <AlbumContextProvider>
            <UserContextProvider>

              <App />
            </UserContextProvider>

          </AlbumContextProvider>
        </MusicContextProvider>


      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
