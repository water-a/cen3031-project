import React from 'react';

export const OrderFormContext = React.createContext({
    image: null,
    material: null,
    size: {
        height: null,
        width: null
    }
});