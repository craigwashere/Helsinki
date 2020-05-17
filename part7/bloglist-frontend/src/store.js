import blogReducer 		from './reducers/blogReducer'
import notificationReducer 	from './reducers/NotificationReducer'
import userReducer		from './reducers/userReducer'
import loginReducer		from './reducers/loginReducer'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
	blogs: 		blogReducer,
	users:		userReducer,
	notification:	notificationReducer,
	user:		loginReducer
})

const store = createStore( reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
