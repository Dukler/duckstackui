import {headerJsonApi, requestJson} from "./network";
import {constants} from "../Constants";

export const getToken = (props) =>{
    return localStorage.getItem('bToken');
};

export const setToken = (props) =>{
    if (props.account.token !== getToken()){
        localStorage.setItem('bToken',props.account.token);
    }
};

export const login = (props) => {
    const config = {
        method: "POST",
        headers: headerJsonApi({type:'login'}),
        body: JSON.stringify(props.json),
    };
    requestJson({
        config,
        url:constants.login,
        callback:setToken
    });
};