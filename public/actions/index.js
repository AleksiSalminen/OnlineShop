import * as types from '../action_types/actionTypes.js'

//REQUESTS
export function requestProducts(url) {
    return { type: types.REQUEST_PRODUCTS, url};
}

export function requestProduct(url) {
    return { type: types.REQUEST_PRODUCT, url};
}

export function requestToken() {
    return { type: types.REQUEST_TOKEN };
}

export function requestRegistration(user) {
    return { type: types.REQUEST_REGISTER, user};
}

export function requestLogin(user) {
    return { type: types.REQUEST_LOGIN, user};
}

export function requestUnregister() {
    return { type: types.REQUEST_UNREGISTER };
}

export function requestUpdateUser() {
    return { type: types.REQUEST_UPDATE_USER };
}

export function requestDeleteUser() {
    return { type: types.REQUEST_DELETE_USER };
}

export function requestGetUsers() {
    return { type: types.REQUEST_GET_USER};
}

export function requestGetUser() {
    return { type: types.REQUEST_GET_USER };
}

export function requestRejectProduct() {
    return { type: types.REQUEST_REJECT_PRODUCT};
}

export function requestAcceptProduct() {
    return { type: types.REQUEST_ACCEPT_PRODUCT};
}

export function requestAddProduct() {
    return { type: types.REQUEST_ADD_PRODUCT};
}

export function requestBuyProduct() {
    return { type: types.REQUEST_BUY_PRODUCT};
}

export function requestPendingProducts() {
    return { type: types.REQUEST_PENDING_PRODUCTS};
}

export function requestOwnPendingProducts() {
    return { type: types.REQUEST_OWNPENDING_PRODUCTS};
}

export function requestOwnProductsOnSale() {
    return { type: types.REQUEST_OWNSALE_PRODUCTS};
}

export function requestDeleteProduct(id) {
    return { type: types.REQUEST_DELETE_PRODUCT, id};
}


//ERRORS
export function errorProducts(error) {
    return { type: types.ERROR_PRODUCTS, error};
}

export function errorProduct(error) {
    return { type: types.ERROR_PRODUCT, error};
}

export function errorToken(error) {
    return { type: types.ERROR_TOKEN, error};
}

export function errorRegistration(error) {
    return { type: types.ERROR_REGISTER, error};
}

export function errorLogin(error) {
    return { type: types.ERROR_LOGIN, error};
}

export function errorUnregister(error) {
    return { type: types.ERROR_UNREGISTER, error};
}

export function errorUpdateUser(error) {
    return { type: types.ERROR_UPDATE_USER, error};
}

export function errorDeleteUser(error) {
    return { type: types.ERROR_DELETE_USER, error};
}

export function errorGetUsers(error) {
    return { type: types.ERROR_GET_USERS, error};
}

export function errorGetUser(error) {
    return { type: types.ERROR_GET_USER, error};
}

export function errorRejectProduct(error) {
    return { type: types.ERROR_REJECT_PRODUCT, error};
}

export function errorAcceptProduct(error) {
    return { type: types.ERROR_ACCEPT_PRODUCT, error};
}

export function errorAddProduct(error) {
    return { type: types.ERROR_ADD_PRODUCT, error};
}

export function errorBuyProduct(error) {
    return { type: types.ERROR_BUY_PRODUCT, error};
}

export function errorPendingProducts(error) {
    return { type: types.ERROR_PENDING_PRODUCTS, error};
}

export function errorOwnPendingProducts(error) {
    return { type: types.ERROR_OWNPENDING_PRODUCTS, error};
}

export function errorOwnProductsOnSale(error) {
    return { type: types.ERROR_OWNSALE_PRODUCTS, error};
}

export function errorDeleteProduct(error) {
    return { type: types.ERROR_DELETE_PRODUCT, error};
}


//RECEIVES
export function receiveProducts(json) {
    return {
        type: types.RECEIVE_PRODUCTS,
        products: Object.keys(json).reduce((object, key) =>{
            object[json[key]._id] = {
                name: json[key].name,
                price: json[key].sellingPrice,
                description: json[key].description
            };
            return object;
        }, {}),
        receivedAt: Date.now()
    };
}

export function receiveProduct(json) {
    return {
        type: types.RECEIVE_PRODUCT,
        product: {
            name: json.name,
            description: json.description,
            price: json.sellingPrice,
            id: json._id
        },
        receivedAt: Date.now()
    };
}

export function receiveToken(json) {
    return {
        type: types.RECEIVE_TOKEN,
        token: json.token,
        role: json.role,
        receivedAt: Date.now()
    };
}

export function receiveUnregister() {
    return {
        type: types.RECEIVE_UNREGISTER,
        receivedAt: Date.now()
    }
}

export function receiveUpdateUser() {
    return {
        type: types.RECEIVE_UPDATE_USER,
        receivedAt: Date.now()
    }
}

export function receiveDeleteUser() {
    return {
        type: types.RECEIVE_DELETE_USER,
        receivedAt: Date.now()
    }
}

export function receiveGetUsers(json) {
 return {
     type: types.RECEIVE_GET_USERS,
     users: json,
     receivedAt: Date.now()
 };
}

export function receiveGetUser(json) {
    return {
        type: types.RECEIVE_GET_USER,
        user: {
            name: json.name,
            email: json.email,
            creditCard: json.creditCard,
            accountNumber: json.accountNumber
        },
        receivedAt: Date.now()
    };
}

export function receiveRejectProduct(json) {
    return {
        type: types.RECEIVE_REJECT_PRODUCT,
        receivedAt: Date.now()
    };
}

export function receiveAcceptProduct(json) {
    return {
        type: types.RECEIVE_ACCEPT_PRODUCT,
        product: {
            name: json.name,
            description: json.description,
            sellingPrice: json.sellingPrice
        },
        receivedAt: Date.now()
    };
}

export function receiveAddProduct(json) {
    return {
        type: types.RECEIVE_ADD_PRODUCT,
        product: {
            name: json.name,
            description: json.description,
            purchasePrice: json.purchasePrice,
            id: json._id
        },
        receivedAt: Date.now()
    };
}

export function receiveBuyProduct() {
    return {
        type: types.RECEIVE_BUY_PRODUCT,
        receivedAt: Date.now()
    };
}

export function receivePendingProducts(json) {
    return {
        type: types.RECEIVE_PENDING_PRODUCTS,
        products: Object.keys(json).reduce((object, key) =>{
            object[json[key]._id] = {
                name: json[key].name,
                price: json[key].purchasePrice,
                description: json[key].description,
                id: json[key]._id
            };
            return object;
        }, {}),
        receivedAt: Date.now()
    };
}

export function receiveOwnPendingProducts(json) {
    return {
        type: types.RECEIVE_OWNPENDING_PRODUCTS,
        products: Object.keys(json).reduce((object, key) =>{
            object[json[key]._id] = {
                name: json[key].name,
                price: json[key].purchasePrice,
                description: json[key].description,
                id: json[key]._id
            };
            return object;
        }, {}),
        receivedAt: Date.now()
    };
}

export function receiveOwnProductsOnSale(json) {
    return {
        type: types.RECEIVE_OWNSALE_PRODUCTS,
        products: Object.keys(json).reduce((object, key) =>{
            object[json[key]._id] = {
                name: json[key].name,
                price: json[key].sellingPrice,
                description: json[key].description,
                id: json[key]._id
            };
            return object;
        }, {}),
        receivedAt: Date.now()
    };
}

export function receiveDeleteProduct(id) {
    return {
        type: types.RECEIVE_DELETE_PRODUCT,
        product: {

        }
    }
}