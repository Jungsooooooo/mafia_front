import { combineReducers } from "redux";
import loginSession from "./loginSession";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.
// store에 저장되는 리듀서는 오직 1개입니다.

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["loginSession"],
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  loginSession,
});

export default persistReducer(persistConfig, rootReducer);
