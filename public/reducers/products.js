import { RECEIVE_PRODUCTS, 
    ERROR_PRODUCTS, 
    REQUEST_PRODUCTS, 
    RECEIVE_PRODUCT, 
    ERROR_PRODUCT, 
    REQUEST_PRODUCT,
    REQUEST_ADD_PRODUCT,
    RECEIVE_ADD_PRODUCT,
    ERROR_ADD_PRODUCT,
    REQUEST_BUY_PRODUCT,
    RECEIVE_BUY_PRODUCT,
    ERROR_BUY_PRODUCT,
    ERROR_PENDING_PRODUCTS,
    REQUEST_PENDING_PRODUCTS,
    RECEIVE_PENDING_PRODUCTS,
    ERROR_OWNPENDING_PRODUCTS,
    REQUEST_OWNPENDING_PRODUCTS,
    RECEIVE_OWNPENDING_PRODUCTS,
    ERROR_OWNSALE_PRODUCTS,
    REQUEST_OWNSALE_PRODUCTS,
    RECEIVE_OWNSALE_PRODUCTS
        } from "../action_types/actionTypes.js";

export const productList = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case REQUEST_PRODUCTS:
            return {
                ...state,
                isFetching: true
            };    
        case RECEIVE_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                lastUpdated: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export function selectedProduct(state = {isFetching: false, error: " "}, action) {
    switch (action.type) {
        case ERROR_PRODUCT:
        return {
            ...state,
            isFetching: false,
            error: action.error
        };
        case REQUEST_PRODUCT: 
        return {
            ...state,
            isFetching: true
        };
        case RECEIVE_PRODUCT:
        return {
            ...state,
            isFetching: false,
            selected: action.product,
            id: action.id,
            lastUpdated: action.receivedAt,
            error: null
        };
        default:
            return state;
    }
}

export function addedProduct(state = addedInitialState, action) {
    switch (action.type) {
        case ERROR_ADD_PRODUCT:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case REQUEST_ADD_PRODUCT: 
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_ADD_PRODUCT:
            return {
                ...state,
                isFetching: false,
                added: action.product,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export function boughtProduct(state = boughtProductInitialState, action) {
    switch (action.type) {
        case ERROR_BUY_PRODUCT:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case REQUEST_BUY_PRODUCT: 
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_BUY_PRODUCT:
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

export const pendingProducts = (state = pendingInitialState, action) => {
    switch (action.type) {
        case ERROR_PENDING_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case REQUEST_PENDING_PRODUCTS:
            return {
                ...state,
                isFetching: true
            };    
        case RECEIVE_PENDING_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export const ownProducts = (state = ownInitialState, action) => {
    switch (action.type) {
        case ERROR_OWNPENDING_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case REQUEST_OWNPENDING_PRODUCTS:
            return {
                ...state,
                isFetching: true
            };    
        case RECEIVE_OWNPENDING_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

export const ownProductsOnSale = (state = ownOnSaleInitialState, action) => {
    switch (action.type) {
        case ERROR_OWNSALE_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case REQUEST_OWNSALE_PRODUCTS:
            return {
                ...state,
                isFetching: true
            };    
        case RECEIVE_OWNSALE_PRODUCTS:
            return {
                ...state,
                isFetching: false,
                products: action.products,
                receivedAt: action.receivedAt,
                error: null
            };
        default:
            return state;
    }
}

const ownInitialState = {
    products: {},
    isFetching: false,
    receivedAt: null,
    error: null
};

const ownOnSaleInitialState = {
    products: {},
    isFetching: false,
    receivedAt: null,
    error: null
};

const pendingInitialState = {
    products: {},
    isFetching: false,
    receivedAt: null,
    error: null
};

const addedInitialState = {
    products: {},
    isFetching: false,
    receivedAt: null,
    error: null
};

const boughtProductInitialState = {
    isFetching: false,
    receivedAt: null,
    error: null
};

const initialState = {
    products: {},
    isFetching: false,
    lastUpdated: null,
    error: null
}