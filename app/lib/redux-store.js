import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from 'reducers/index';

const storageConfig ={
    whitelist: [
        'billing',
        'businessSite',
        'payment',
        'spinner',
        'user'
    ],
    keyPrefix: 'syb:'
};

const logger = createLogger({
    collapsed: true
});

const store = createStore(
    reducers,
    applyMiddleware(thunk, logger),
    autoRehydrate()
);

persistStore(store, storageConfig);

export default store;
