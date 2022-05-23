
const intialState = {
    dragdropList: [],

    userdetials: {}

}
const DragDropReducer = (state = intialState, action) => {
    console.log("--------+++-----action in reducers------", action.payload);
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                dragdropList: action.payload,
            }
        case 'ADD_TODO':
            if (action.payload.prevPos === null) {
                return {
                    ...state, dragdropList: action.payload.updatedState
                }
            }
            else {
                return {
                    ...state,
                    dragdropList: [state.dragdropList.splice(action.payload.prevPos, 1)],
                    dragdropList: [...state.dragdropList, action.payload.updatedState],

                }
            }
        case 'GET_USER':
            // state.userdetials = userDataList.filter((user) => user.useremail === action.payload.useremail)
            return {
                ...state.userdetials,
            }



        default:
            return state;

    }

}
export default DragDropReducer;