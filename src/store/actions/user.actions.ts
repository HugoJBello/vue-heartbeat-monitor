import firebase from "firebase";
import User = firebase.User;

export const setUser = ({commit}: any, user: User) => {
        commit('setUserMutation',user)
}
