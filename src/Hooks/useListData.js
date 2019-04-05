import {useEffect, useState} from "react";
import {headerUIApi, requestJson} from "../Actions/network";
import {constants} from "../Constants";

function useListData (url){
    const [data,setState] = useState([]);
    const [loading,setLoading] = useState(true);
    let config = null;
    if(url === constants.ui.login){
        config = {
            method: "GET",
        };
    }else{
        config = {
            method: "GET",
            headers: headerUIApi({url}),
        };
    }
    useEffect(()=>{
        init(url);
    },[]);

    const init = (url) =>{
        

        requestJson({
            config,
            url:url,
            callback:setJson
        });
    };
    const setJson = (json) =>{
        setState(json);
        setLoading(false);
    };

    const reset = (url) =>{
        setLoading(true);
        init(url);
        setLoading(false);
    };

    return [data,loading,reset];
}

export default useListData