const ADD_TODO = 'ADD_TODO';
const ADD_DATA = 'ADD_DATA';
const GET_DATA = 'GET_DATA';


export function addtodoAction(data) {
    console.log("----------addtodoAction---- in action--------", data);
    return (dispatch) => {
        dispatch({ type: ADD_TODO, payload: data })
    }
};
export function addddataAction(data) {
    return (dispatch) => {
        dispatch({ type: ADD_DATA, payload: data })
    }
};
export function getdataAction() {
    return (dispatch) => {
        dispatch({ type: GET_DATA, payload: '' })
    }
}