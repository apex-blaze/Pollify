import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const GoogleLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // let token = result.credential.accessToken;
      let user = result.user;
      return user;
    })
    .catch((error) => {
      // let errorCode = error.code;
      // let errorMessage = error.message;
      // let email = error.email;
      // let credential = error.credential;
    });
};
