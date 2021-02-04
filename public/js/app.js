// !<!-- !Code By Silent_Coder AKA SilentxKnight -->


console.log(firebase);

 // Initialize the FirebaseUI Widget using Firebase.
 var ui = new firebaseui.auth.AuthUI(firebase.auth());



// *google signin user (firebaseUI)

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        // redirectUrl="/pages/mainApp.html";
        // if(authResult.additionalUserInfo.isNewUser){
        //   console.log(authResult.additionalUserInfo.isNewUser);
        //   console.log("new User");
        //   createUser();

        // }else{

        //   console.log("old user");
        //   showUserData();
        //   showUser();
        // }



        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/pages/mainApp.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID


    ],
    // Terms of service url.

    // --tosUrl: '<your-tos-url>',

    // Privacy policy url.
    //--- privacyPolicyUrl: '<your-privacy-policy-url>'
  };

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


// *firebase config



// *firebase auth
 const auth = new firebase.auth();
 var provider = new firebase.auth.GoogleAuthProvider();



//  *checking user logged in or not
//deported to index.html as resulting a loop
// firebase.auth().onAuthStateChanged(firebaseuser=>{
//     if(firebaseuser){
//         console.log(firebaseUser);
        
//     }else{
//         console.log('not logged in');
        
//          ?redirecting user to sign in form

//         window.location.replace="/pages/signinForm.html";
    
    
//     }

// });


// // end


// *manual login handler

// var signin = document.getElementById("signin");
// var signout =document.getElementById("signout");

//? signin Method
// googleSignin = ()=>{
//     firebase.auth().signInWithPopup(provider).then(function(result){
//         console.log(result);
//             console.log("Logged in");
//     }).catch(function(err){
//         console.log(err);
//         console.log("Failed!");
//     })
// };

//? signOut Menthod
// googleSignOut = ()=>{
//     firebase.auth().signOut().then(() => {
//         // Sign-out successful.
//         console.log('logouty');
//       }).catch((error) => {
//         // An error happened.
//       });
// }

//? end







