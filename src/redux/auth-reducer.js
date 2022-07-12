import {authAPI, usersAPI} from "../api/Api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state
    }
}

export const setAuthUserDataSuccess = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}})

export const getAuthUserData = () => {
    return (dispatch) => {
        usersAPI.getAuthProfile()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserDataSuccess(id, email, login, true));
                }
            })
    }
}

export const login = (email, password, rememberMe) => (dispatch) => {

        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }
            })
}

export const logout = () => (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataSuccess(null, null, null, false));
                }
            })
}

export default authReducer;
