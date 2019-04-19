import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import OrdersRouter from './OrdersRouter/index.js';
import { Provider } from 'react-globally';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faFileUpload, faStickyNote, faRulerCombined, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const initialState = {
    image: null,
    material: {
        index: null,
        item: null,
        custom: null
    },
    size: {
        index: null,
        item: null,
        custom: null
    },
    options: {
        materials: null,
        sizes: null,
        content: null
    }
}

library.add(faPlus);
library.add(faFileUpload);
library.add(faStickyNote);
library.add(faRulerCombined);
library.add(faDollarSign);

const AppRouter = () => (
    <Provider globalState={initialState}>
        <Router>
            <Route path='/' component={OrdersRouter}/>
        </Router>
    </Provider>
);
export default AppRouter;