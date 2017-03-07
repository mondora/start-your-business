import React from 'react';
import {browserHistory, Router, Route} from 'react-router';
import {Provider} from 'react-redux';
// import {syncHistoryWithStore} from 'react-router-redux';

import store from 'lib/redux-store';

import BuildSite from 'containers/BuildSite';
import ChoosePlan from 'containers/ChoosePlan';
import CreditCardResult from 'containers/CreditCardResult';
import Home from 'containers/Home';
import Privacy from 'containers/Privacy';
import Root from 'containers/Root';
import SignUp from 'containers/SignUp';
import SubscriptionResult from 'containers/SubscriptionResult';
import UserAccount from 'containers/UserAccount';

import BusinessHome from 'containers/business/Home';
import BusinessRoot from 'containers/business/Root';
import BusinessUserInfo from 'containers/business/UserInfo';

// const history = syncHistoryWithStore(browserHistory, store);

export default (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route name='root' component={Root}>
                <Route name='home' path='/' component={Home} />
                <Route name='signup' path='/signup' component={SignUp} />
                <Route name='buildSite' path='/build-site' component={BuildSite} private={true} />
                <Route name='choosePlan' path='/choose-plan' component={ChoosePlan} private={true} />
                <Route name='privacy' path='/privacy' component={Privacy} />
                <Route name='subscriptionResult' path='/subscription-result' component={SubscriptionResult} private={true} />
                <Route name='account' path='/account' component={UserAccount} private={true} />
            </Route>

            <Route name='creditCardResult' path='/credit-card-result' component={CreditCardResult} />

            <Route name='businessRoot' component={BusinessRoot}>
                <Route name='businessHome' path='/:businessName' component={BusinessHome} />
                <Route name='businessUserInfo' path='/:businessName/user-info' component={BusinessUserInfo} />
            </Route>
        </Router>
    </Provider>
);
