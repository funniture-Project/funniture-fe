import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./CategoryModuls";
import memberReducer from "./MemberModule";
import favoriteReducer from "./FavoriteModule";

export default combineReducers({
    product: productReducer,
    category: categoryReducer,
    member: memberReducer,
    favorite: favoriteReducer
})
