import {wrapStore} from 'webext-redux';
import configureStore from "./redux/configureStore";

const store = configureStore();

wrapStore(store, {
    portName: "PROMODORO"
});
