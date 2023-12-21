
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import {BrowserRouter as Router} from "react-router-dom"
import './index.css'
import {Provider} from "react-redux"
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import { store } from './state/store.js'

let theme=createTheme()
theme=responsiveFontSizes(theme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <Router>
    <App/>
    <Toaster/>
    </Router>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
