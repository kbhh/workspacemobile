import { combineReducers } from 'redux';

import loginReducer from './login';
import signupReducer from './signup';
import accountReducer from './account';
import workspaceReducer from './workspace';
import eventReducer from './event';
import locationReducer from './location';
import communityReducer from './community'
import supportReducer from './support';
import guestReducer from './guest';
import bluefaceReducer from './blueface';
import notificationReducer from './notification';
import serviceReducer from './service';
import tourReducer from './tour';
import billingReducer from './billing';
import companyReducer from './company';
import addEventReducer from './addEvent';

export default combineReducers({
    loginReducer,
    signupReducer,
    accountReducer,
    workspaceReducer,
    eventReducer,
    locationReducer,
    communityReducer,
    supportReducer,
    guestReducer,
    bluefaceReducer,
    notificationReducer,
    serviceReducer,
    tourReducer,
    billingReducer,
    companyReducer,
    addEventReducer,
});
