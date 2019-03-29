import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import OrdersRouter from './OrdersRouter/index.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faFileUpload, faStickyNote, faRulerCombined, faDollarSign } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);
library.add(faFileUpload);
library.add(faStickyNote);
library.add(faRulerCombined);
library.add(faDollarSign);

const AppRouter = () => (
    <Router>
        <Route path='/' component={OrdersRouter}/>
    </Router>
);
export default AppRouter;