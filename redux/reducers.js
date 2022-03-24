import { ADD_CATEGORY_TO_INVENTORIES, ADD_TO_INVENTORIES, INIT } from "./types";


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

function setInitial(state) {
    return {
        ...state,
        data: [
            {
                title: 'Das macht mich',
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

function addNewCategory(state, action) {
    return {
        ...state,
        data: [...state.data, {
            title: action.newEntry, data: []
        }
        ]
    }
}

function addNewEntryToCategory(state, action) {
    return {
        ...state,
        data: state.data.map((item) => {
            if (item.title != action.title) {
                return item
            }
            return {
                ...item,
                data: item.data.concat(action.newEntry)
            }
        })
    }
}

function reducer(state = initalState, action) {
    switch (action.type) {
        case INIT:
            return setInitial(state);
        case ADD_CATEGORY_TO_INVENTORIES:
            return addNewCategory(state, action);
        case ADD_TO_INVENTORIES:
            return addNewEntryToCategory(state, action);
        default:
            return state;
    }
}

export default reducer;