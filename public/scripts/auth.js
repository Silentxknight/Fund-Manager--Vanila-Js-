// !<!-- !Code By Silent_Coder AKA SilentxKnight -->



// ?getting elements

var loginWays = document.getElementById("loginWays");
// var logoutWays =document.getElementById('logoutWays');
var contentWeb = document.getElementById("contentWeb");

console.log("codes from auth");
console.log(auth);

console.log();
// var user = firebase.auth().currentUser;
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       console.log(user);
//       var uid = user.uid;
//       console.log(uid);
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.

      if (authResult.additionalUserInfo.isNewUser) {
        console.log(authResult.additionalUserInfo.isNewUser);
        console.log("new User");
        createUserData();
      } else {
        //   showUserData();
        window.location.assign("/");
        console.log("old user");
      }

      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  // signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

firebase.auth().onAuthStateChanged((user) => {
  // console.log("coming from auth.js");
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    //   console.log(user);
    //   var uid = user.uid;
    //   console.log(uid);
    //   console.log(user.email);
    loginWays.style.display = "none";
    //   logoutWays.style.display="block";
    contentWeb.style.display = "block";
    // ...
  } else {
    // User is signed out
    // ...
    loginWays.style.display = "block";
    //   logoutWays.style.display="none";
    contentWeb.style.display = "none";
  }
});

//  ?firebase logout shift+tab
googleSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("logout");
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
};

// *Accessing Database Here

var database = firebase.database();

var dbRefObject = firebase.database().ref();

dbRefObject.on("value", (snap) => console.log(snap.val()));

// *creating user

function createUserData() {
  // var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function (user) {
    var userInfo;
    userInfo = user;
    userId = user.uid;
    name = user.displayName;

    database.ref("users/" + user.displayName + " " + userId).set({
      Name: user.displayName,
      Email: user.email,
      TotalFunds: 20,
      Savings: 0,
      Expenses: 0,

      ExpensesHistory: { Food: 2000, Others: 300 },
      WishList: { loop: 900, Food: 2000, Others: 300 },
    });
  });
}
