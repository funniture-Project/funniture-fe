import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./CategoryModuls";
import memberReducer from "./MemberModule";

export default combineReducers({
    // product: productReducer,
    category: categoryReducer,
    member : memberReducer
})
