import update from "immutability-helper";

const initialState = {isLoading:true};

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch (type) {
        case "SHOW_LOADING_ACTION":
            return update(state,{
                isLoading:{$set: payload.isLoading}
            })
        case "SET_POOL":
            return update(state, {
                componentsPool: { $set: payload }
            })
        // case "INIT_POOL":
        //     const {componentsPool, ...data} = payload;
        //     const pool = LazyComponents(componentsPool);
        //     return pool;
        default:
            return state;
    }
}
