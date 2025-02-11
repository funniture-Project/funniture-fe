import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./CategoryModuls";

export default combineReducers({
    // product: productReducer,
    category: categoryReducer,
})
