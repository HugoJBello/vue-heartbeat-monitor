import firebase from "firebase";
import User = firebase.User;
import UserInfo = firebase.UserInfo;


export interface State {
    user: User | null,
    userFirebase?: UserInfo | null,
}
