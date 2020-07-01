import * as actions from '../actions/index.js';
import { store } from '../reducers/index.js';

export function fetchUsers(token) {
    const url = 'http://localhost:3000/api/users';
    return dispatch => {
        store.dispatch(actions.requestGetUsers());
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
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((users) => {
            store.dispatch(actions.receiveGetUsers(users));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorGetUsers(error));
            return Error(error);
        });
    };
}

export function fetchUserLogin(user) {
    const url = 'http://localhost:3000/api/users/login';
    const userJSON = '{"email":"' + user.email + '","password":"' + user.password + '"}';

    return dispatch => {
        store.dispatch(actions.requestToken());
        return fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: userJSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((json) => {
            store.dispatch(actions.receiveToken(json));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorToken(error));
            return Error(error);
        });
    };
}

export function fetchUserRegister(user) {
    const url = 'http://localhost:3000/api/users/register';
    const userJSON = 
    '{"name":"' + user.name + '","email":"' + user.email + '","password":"' + user.password + '","creditCard":"' + user.creditCard + '","accountNumber":"' + user.accountNumber + '"}';

    return dispatch => {
        store.dispatch(actions.requestToken());
        return fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: userJSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((json) => {
            console.log("JSON");
            console.log(json);
            store.dispatch(actions.receiveToken(json));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorToken(error));
            return Error(error);
        });
    };
}

export function fetchUnregister(token) {
    const url = 'http://localhost:3000/api/users/me';

    return dispatch => {
        store.dispatch(actions.requestUnregister());
        return fetch(url, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((user) => {
            store.dispatch(actions.receiveUnregister());
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorUnregister(error));
            return Error(error);
        });
    };
}

export function fetchUserUpdate(id, name, role, email, token) {
    const url = 'http://localhost:3000/api/users/' + id;
    const userJSON = '{"id":"' + id + '","name":"' + name + '","role":"' + role +  '","email":"' + email + '"}';

    return dispatch => {
        store.dispatch(actions.requestUpdateUser());
        return fetch(url, {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }),
            body: userJSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((user) => {
            store.dispatch(actions.receiveUpdateUser());
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorUpdateUser(error));
            return Error(error);
        });
    };
}

export function fetchUserDelete(id, token) {
    const url = 'http://localhost:3000/api/users/' + id;
    const userJSON = '{"id":"' + id + '"}';

    return dispatch => {
        store.dispatch(actions.requestDeleteUser());
        return fetch(url, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }),
            body: userJSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((user) => {
            store.dispatch(actions.receiveDeleteUser());
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorDeleteUser(error));
            return Error(error);
        });
    };
}

export function fetchOwnInfo(token) {
    const url = 'http://localhost:3000/api/users/me';

    return dispatch => {
        store.dispatch(actions.requestGetUser());
        return fetch(url, {
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((user) => {
            store.dispatch(actions.receiveGetUser(user));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorGetUser(error));
            return Error(error);
        });
    };
}

export function fetchUpdateOwnInfo(user, token) {
    const url = 'http://localhost:3000/api/users/me';
    const userJSON = 
    '{"name":"' + user.name + '","email":"' + user.email + '","password":"' + user.password + '","creditCard":"' + user.creditCard + '","accountNumber":"' + user.accountNumber + '"}';

    return dispatch => {
        store.dispatch(actions.requestGetUser());
        store.dispatch(actions.requestToken());
        return fetch(url, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }),
            body: userJSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then((user) => {
            store.dispatch(actions.receiveGetUser(user));
            store.dispatch(actions.receiveToken(user));
            return;
        })
        .catch(error => {
            store.dispatch(actions.errorGetUser(error));
            store.dispatch(actions.errorToken(error));
            return Error(error);
        });
    };
}
