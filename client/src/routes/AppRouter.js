import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import OrdersRouter from './OrdersRouter/index.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);


const AppRouter = () => (
    <Router>
        <Route path='/' component={OrdersRouter}/>
    </Router>
);
export default AppRouter;