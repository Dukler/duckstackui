import {getContainer, getStandalonesValues} from "../../Store/selectors";
import {constants} from "../../Utils/Constants";
import {submitJson} from "../../Utils/api";
import {setLoginToken, getLoginToken, removeLoginToken} from "../../Utils/auth";

export default function actionReducer({storeDispatch, state, type, payload}) {
    switch (type) {
        case "REFRESH":
            window.location.reload(false);
            break;
        case "DELETE_LOGIN_TOKEN":
            removeLoginToken();
            break;
        case "SAVE_LOGIN_TOKEN":
            setLoginToken(payload.response);
            console.log("token: " + getLoginToken());
            break;
        case "SUBMIT_COMPONENTS_VALUES":
            //actually change this
            //dispatching in a reducer is a bad design, it is better to compose two reducers
            const scvData = getStandalonesValues({state, ids: payload.ids});
            submitJson({url: constants.login, body: scvData}).then(
                (response) => {
                    if (payload.callback) {
                        const cb = payload.callback;
                        const pl = cb.payload ? cb.payload : null;
                        storeDispatch({
                            type: cb.type,
                            payload: {...pl, response},
                        });
                    }
                }
            );
            break;
        case "SUBMIT_CONTAINER_VALUES":
            const swvContainer = getContainer({state, id: payload.id});
            const swvData = getStandalonesValues({
                state,
                ids: swvContainer.components,
            });
            submitJson({url: constants.login, body: swvData}).then(
                (response) => {
                    if (payload.callback) {
                        const cb = payload.callback;
                        const pl = cb.payload ? cb.payload : null;
                        storeDispatch({
                            type: cb.type,
                            payload: {...pl, response},
                        });
                    }
                }
            );
            break;
        case "test":
            console.log("test");
            break;
        default:
            break;
    }
}
