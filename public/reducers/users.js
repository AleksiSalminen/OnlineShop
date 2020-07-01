import * as types from "../action_types/actionTypes.js";

export function authentication(state = initialTokenState, action) {
    switch(action.type) {
        case types.REQUEST_TOKEN:
            return {
                ...state,
                isFetching: true,
                token: null,
                receivedAt: null,
                error: null
            };
        case types.RECEIVE_TOKEN:
            return {
                ...state,
                isFetching: false,
                token: action.token,
                role: action.role,
                receivedAt: action.receivedAt,
                error: null
            };
        case types.ERROR_TOKEN:
            return {
                ...state,
                isFetching: false,
                token: null,
                receivedAt: null,
                error: action.error
            };
        default:
            return state;
    }
}

export function userList(state = initialUsersState, action) {
    switch (action.type) {
        case types.ERROR_GET_USERS:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case types.REQUEST_GET_USERS:
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVE_GET_USERS:
            return {
                ...state,
                isFetching: false,
                users: action.users,
                lastUpdated: action.receivedAt,
                error: null
            };
            default:
                return state;
    }
}

export function selectedUser(state = { isFetching:false, error: ""}, action) {
    switch(action.type) {
        case types.ERROR_GET_USER:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case types.REQUEST_GET_USER: 
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVE_GET_USER:
            return {
                ...state,
                isFetching: false,
                selected: action.user,
                id: action.id,
                lastUpdated: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export function unregistered(state = initialUnregisterState, action) {
    switch(action.type) {
        case types.ERROR_UNREGISTER:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case types.REQUEST_UNREGISTER: 
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVE_UNREGISTER:
            return {
                ...state,
                isFetching: false,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export function updatedUser(state = initialUpdateState, action) {
    switch(action.type) {
        case types.ERROR_UPDATE_USER:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case types.REQUEST_UPDATE_USER: 
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVE_UPDATE_USER:
            return {
                ...state,
                isFetching: false,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export function deletedUser(state = initialDeleteState, action) {
    switch(action.type) {
        case types.ERROR_DELETE_USER:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case types.REQUEST_DELETE_USER: 
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVE_DELETE_USER:
            return {
                ...state,
                isFetching: false,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export function ownInformation(state = initialOwnInfoState, action) {
    switch(action.type) {
        case types.ERROR_GET_USER:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case types.REQUEST_GET_USER: 
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVE_GET_USER:
            return {
                ...state,
                isFetching: false,
                name: action.user.name,
                email: action.user.email,
                creditCard: action.user.creditCard,
                accountNumber: action.user.accountNumber,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}


const initialTokenState = {
    isFetching: false,
    token: null,
    receivedAt: null,
    error: null
};

const initialUsersState = {
    users: {},
    isFetching: false,
    lastUpdated: null,
    error: null
};

const initialUnregisterState = {
    isFetching: false,
    receivedAt: null,
    error: null
};

const initialOwnInfoState = {
    isFetching: false,
    name: null,
    email: null,
    creditCard: null,
    accountNumber: null,
    receivedAt: null,
    error: null
};

const initialUpdateState = {
    isFetching: false,
    receivedAt: null,
    error: null
};

const initialDeleteState = {
    isFetching: false,
    receivedAt: null,
    error: null
};
