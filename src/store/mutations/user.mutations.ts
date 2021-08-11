import {State} from "../../models/State";
import firebase from "firebase";
import User = firebase.User;

export const setUserMutation = (state: State, user: User) => {
    state.user = user
}
