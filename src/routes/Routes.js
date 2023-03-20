import React from 'react';
import { Route, Routes } from 'react-router';
import { Home } from '../pages/Home/Home';
import { Show } from '../pages/Detail/Show';

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path='/show/:id/:slug' element={<Show />} />
		</Routes>
	);
};
