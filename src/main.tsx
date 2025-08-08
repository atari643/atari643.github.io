import React from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import App from './App'
import './styles/main.scss'

const container = document.getElementById('root') || (()=>{
	const d = document.createElement('div');
	d.id = 'root';
	document.body.appendChild(d);return d;
})()

createRoot(container).render(<React.StrictMode><App/></React.StrictMode>)
