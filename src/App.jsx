import React from 'react'
import'./App.css'
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

const App = () => {
	return (
		<>
		<Router>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/PostPage' element={<PostPage/>}/>
			</Routes>
		</Router>
		</>
	);
};

export default App;



