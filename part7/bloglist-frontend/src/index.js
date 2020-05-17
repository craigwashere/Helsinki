import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import store from './store'

import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux'

// eslint-disable-next-line no-undef
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>, 
	document.getElementById('root')
)