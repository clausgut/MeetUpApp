console.log('hi this is firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBCrQFsGbYct8kiiOIdjg5EibnNuToXuPQ",
    authDomain: "gtcbc-clickcount.firebaseapp.com",
    databaseURL: "https://gtcbc-clickcount.firebaseio.com",
    projectId: "gtcbc-clickcount",
    storageBucket: "gtcbc-clickcount.appspot.com",
    messagingSenderId: "282263685473"
};
firebase.initializeApp(config);

var ui = new firebaseui.auth.AuthUI(firebase.auth());


ui.start('#firebaseui-auth-container', uiConfig);

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
    // Other config options...
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $('body').css('background-color', 'black');

  } else {
    // No user is signed in.
  }
});



var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };





// CHAT
function login() {
  // Log the user in via Twitter
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(function(error) {
    console.log("Error authenticating user:", error);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  // Once authenticated, instantiate Firechat with the logged in user
  if (user) {
    initChat(user);
  }
});

function initChat(user) {
  // Get a Firebase Database ref
  var chatRef = firebase.database().ref("chat");

  // Create a Firechat instance
  var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

  // Set the Firechat user
  chat.setUser(user.uid, user.displayName);
}