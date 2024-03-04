// reducers/counter.js

// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginInfo = (token) => ({ type: LOGIN, token });

const initalState = {
  token: "",
  isLogged: false,
};

const loginSession = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogged: true,
        token: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        token: "",
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};

export default loginSession;
