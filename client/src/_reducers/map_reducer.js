import {
    MAP_DIAL
} from '../_actions/types';
 

const initialState ={
isShow: null
}

export default function(state=initialState,action){
    switch(action.type){
        case MAP_DIAL:
            return {...state, isShow: action.isShow }
       
        default:
            return state;
    }
}