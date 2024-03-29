import React, {useEffect, useState} from "react";
import {isUndefined} from "./../Utils/index";
import {useDispatch} from "react-redux";

//this function wraps each standalone component
export default function StandaloneSuper(comp) {
    const {AsyncImport, ...cleanComp} = comp;
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    // useStateChange(cleanComp);

    useEffect(() => {
        setDisabled(isUndefined(cleanComp.disabled, false));

        return () => {
            if (cleanComp.systemInfo.selfDestruct) {
                dispatch({type: "DELETE_STANDALONE", payload: comp});
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cleanComp.disabled]);

    return !disabled ? <AsyncImport {...cleanComp} /> : null;
}
