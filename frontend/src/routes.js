import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import ListPost from './pages/ListPosts';

const Routes = () => {
    return( 
        <BrowserRouter> 
            <Route component={Home} exact path='/'/>
            <Route component={ListPost} path='/listPost'/>
        </BrowserRouter>
    )
}

export default Routes;