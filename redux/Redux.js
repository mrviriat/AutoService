import { createStore } from "redux";

const defaultSate = {
    userData: null,
    zakazi: null,
    pfotoObject: null,
    statusy: null,
    currentNumber: null,
}

const reducer = (state = defaultSate, action) => {
    switch (action.type) {
        case "SET_USERDATA":
            return { ...state, userData: action.payload };
        case "SET_STATUSY":
            return { ...state, statusy: action.payload };
        case "SET_ZAKAZI":
            return { ...state, zakazi: action.payload };
        case "CURRENT_NUMBER":
            return { ...state, currentNumber: action.payload };
        case "SET_PFOTO_OF_ZAKAZI":
            return { ...state, pfotoObject: action.payload };
        case "ADD_PHOTO":
            return {
                ...state,
                pfotoObject: {
                    ...state.pfotoObject,
                    [action.number]: [...state.pfotoObject[action.number],
                    action.payload
                    ]
                }
            };
        default:
            return state;
    }
}

export const store = createStore(reducer);