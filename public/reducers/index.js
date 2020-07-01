import('https://unpkg.com/redux@latest/dist/redux.min.js');
import { authentication, userList, selectedUser, unregistered, updatedUser, deletedUser, ownInformation } from './users.js';
import { productList, selectedProduct, boughtProduct, addedProduct, pendingProducts, ownProducts, ownProductsOnSale } from './products.js';
//import('https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.2.0/redux-thunk.min.js');

const {
    createStore,
    combineReducers,
    applyMiddleware
} = Redux;
  
const thunkMiddleware = ReduxThunk.default;

const rootReducer = combineReducers({
    authentication,
    userList,
    selectedUser,
    unregistered,
    updatedUser,
    deletedUser,
    ownInformation,
    productList,
    addedProduct,
    selectedProduct,
    boughtProduct,
    pendingProducts,
    ownProducts,
    ownProductsOnSale,
});

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);