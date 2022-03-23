import { ADD_TO_INVENTORIES } from "./types";


const initalState = {
    data: [
        {
            title: 'Main Office',
            data: ['Tisch', 'Sessel', 'Drucker'],
        },
        {
            title: 'Branch Office',
            data: ['Stuhl', 'Drucker', 'Sessel'],
        },
        {
            title: 'Main Office',
            data: ['Tisch', 'Sessel', 'Drucker'],
        },
        {
            title: 'Branch Office',
            data: ['Stuhl', 'Drucker', 'Sessel'],
        },
    ],
}

function changeState(state) {
    return {
        ...state,
        data: [
            {
                title: 'Das macht mich so happy',
                data: ['a', 'b', 'c'],
            },
            {
                title: 'Branch Office',
                data: ['Stuhl', 'Drucker', 'Sessel'],
            },
            {
                title: 'Main Office',
                data: ['Tisch', 'Sessel', 'Drucker'],
            },
            {
                title: 'Branch Office',
                data: ['Stuhl', 'Drucker', 'Sessel'],
            },
        ],
    }
}

function reducer(state = initalState, action) {
    switch (action.type) {
        case ADD_TO_INVENTORIES:
            return changeState(state);
        default:
            return state;
    }
}

export default reducer;