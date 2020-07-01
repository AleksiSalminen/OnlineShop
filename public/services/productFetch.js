import * as actions from '../actions/index.js';
import { store } from '../reducers/index.js';

export function fetchProducts() {
    const url = 'http://localhost:3000/api/products';
    return dispatch => {
        dispatch(actions.requestProducts(url));
        return fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then(
            json => dispatch(actions.receiveProducts(json)),
            error => dispatch(actions.errorProducts(error.toString()))
        );
    };
}

export function fetchProduct(id) {
    const url = 'http://localhost:3000/api/products/' + id;
    return dispatch => {
        dispatch(actions.requestProduct(url));
        return fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then(
            json => dispatch(actions.receiveProduct(json)),
            error => dispatch(actions.errorProduct(error.toString()))
        );
    };
}

export function fetchRejectProduct(id, token) {
    const url = 'http://localhost:3000/api/products/' + id;
    return dispatch => {
        store.dispatch(actions.requestRejectProduct());
        return fetch(url, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then(
            json => store.dispatch(actions.receiveRejectProduct(json)),
            error => store.dispatch(actions.errorRejectProduct(error.toString()))
        );
    };
}

export function fetchAcceptProduct(id, token, sellingPrice) {
    const url = 'http://localhost:3000/api/products/' + id;
    const productJSON = '{"accepted": "true","sellingPrice":"' + sellingPrice + '"}';
    return dispatch => {
        store.dispatch(actions.requestAcceptProduct());
        return fetch(url, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }),
            body: productJSON
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then(
            json => store.dispatch(actions.receiveAcceptProduct(json)),
            error => store.dispatch(actions.errorAcceptProduct(error.toString()))
        );
    };
}

export function fetchAddProduct(product, token) {
    const url = 'http://localhost:3000/api/products/';
    const productJSON = '{"name":"' + product.name + '","description":"' + product.description + '","purchasePrice":"' + product.price + '"}';
    return dispatch => {
        store.dispatch(actions.requestAddProduct());
        return fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }),
            body: productJSON
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then(
            json => store.dispatch(actions.receiveAddProduct(json)),
            error => store.dispatch(actions.errorAddProduct(error.toString()))
        );
    };
}

export function fetchBuyProduct(id, token) {
    const url = 'http://localhost:3000/api/products/' + id;
    const idJSON = '{"id":"' + id + '"}';

    return dispatch => {
        store.dispatch(actions.requestBuyProduct());
        return fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }),
            body: idJSON
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((product) => {
            store.dispatch(actions.receiveBuyProduct());
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorBuyProduct(error));
            return Error(error);
        });
    };
}

export function fetchPendingProducts(token) {
    const url = 'http://localhost:3000/api/products/pending';

    return dispatch => {
        store.dispatch(actions.requestPendingProducts());
        return fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((products) => {
            store.dispatch(actions.receivePendingProducts(products));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorPendingProducts(error));
            return Error(error);
        });
    };
}

export function fetchOwnPendingProducts(token) {
    const url = 'http://localhost:3000/api/products/my';

    return dispatch => {
        store.dispatch(actions.requestOwnPendingProducts());
        return fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((products) => {
            store.dispatch(actions.receiveOwnPendingProducts(products));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorOwnPendingProducts(error));
            return Error(error);
        });
    };
}

export function fetchOwnProductsOnSale(token) {
    const url = 'http://localhost:3000/api/products/onsale';

    return dispatch => {
        store.dispatch(actions.requestOwnProductsOnSale());
        return fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((products) => {
            store.dispatch(actions.receiveOwnProductsOnSale(products));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorOwnProductsOnSale(error));
            return Error(error);
        });
    };
}
