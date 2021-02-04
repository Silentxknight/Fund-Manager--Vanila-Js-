// !<!-- !Code By Silent_Coder AKA SilentxKnight -->


// ?getting elements
var UserNameTitle = document.getElementById("userName");
var profileImage = document.getElementById("profile-image");
var TotalFunds = document.getElementById("total-funds");
var Savings = document.getElementById("savings");
var Expenses = document.getElementById("expenses");
// var ExpensesTitle =document.getElementById('expense-title');
var ExpensesList = document.getElementById("list-group");
var WishList = document.getElementById("list-group-wishes");
var BtnAddFunds = document.getElementById("btn-add-funds");
var addFundsData = document.getElementById("addFunds");
var reduceFundsData = document.getElementById("reduceFunds");
var saveFundsData = document.getElementById("saveFundsData");

console.log("codes from app,js");

// *Accessing Database Here
var database = firebase.database();
var dbRefObject = firebase.database().ref();
dbRefObject.on("value", (snap) => console.log(snap.val()));
// *end

// *creating user

createUserData = () => {
  // var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function (user) {
    var userInfo;
    userInfo = user;
    userId = user.uid;
    name = user.displayName;

    database.ref("users/" + user.displayName + " " + userId).set({
      Name: user.displayName,
      Email: user.email,
      TotalFunds: 10,
      Savings: 0,
      Expenses: 0,

      ExpensesHistory: { Food: 2000, Others: 300 },
      WishList: { loop: 900, Food: 2000, Others: 300 },
    });
  });
};
// *end

// *checking Auth Status

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(user);
    var uid = user.uid;
    console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
//* end

// *will not work
//   var  lok = firebase.auth().currentUser;
//   console.log(lok.uid);

// *loading user data and injecting it to DOM

showUserData = () => {
  // var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function (user) {
    var userInfo;
    var totalf;
    var newFunds = 0;
    userInfo = user;
    userId = user.uid;
    name = user.displayName;
    console.log(user.displayName);
    // firebaseuser= user;
    console.log(user.email);

    // console.log(user.photoURL);

    console.log(userId);

    // *importing funds details

    database
      .ref("users/" + user.displayName + " " + userId)
      .on("value", (snapshot) => {
        TotalFunds.innerText = snapshot.val().TotalFunds;
        Savings.innerText = snapshot.val().Savings;
        Expenses.innerText = snapshot.val().Expenses;
        totalf = snapshot.val().TotalFunds;
      });

    // *only works under this scope block
    UserNameTitle.innerText = name;
    profileImage.src = user.photoURL;
    // document.getElementById('total-funds').innerText=

    //* getting expenses list

    database
      .ref("users/" + user.displayName + " " + userId)
      .child("ExpensesHistory")
      .on("child_added", (snapshot) => {
        // const li = document.createElement('li');
        // li.classList.add("list-group-item")
        // ExpensesTitle.innerText=snapshot.val();
        // ExpensesTitleList.appendChild(li)

        // const span= document.createElement('span');
        // span.innerText=snapshot.key;

        // *making a list-element and appending/prepending to existing list

        const list = document.createElement("li");
        list.innerText =
          "used for: " +
          snapshot.key +
          ",-->     " +
          "amount: " +
          snapshot.val();
        list.id = snapshot.key;
        list.classList.add("list-group-item", "list-group-item-danger");
        ExpensesList.prepend(list);

        // console.log(snapshot.val());
        //  console.log("hello");
      });

    //* getting Wish list

    database
      .ref("users/" + user.displayName + " " + userId)
      .child("WishList")
      .on("child_added", (snapshot) => {
        // const li = document.createElement('li');
        // li.classList.add("list-group-item")
        // ExpensesTitle.innerText=snapshot.val();
        // ExpensesTitleList.appendChild(li)

        // const span= document.createElement('span');
        // span.innerText=snapshot.key;

        // *making a list-element and appending/prepending to existing list

        const wishlist = document.createElement("li");
        wishlist.innerText =
          "Saving for: " +
          snapshot.key +
          ",-->     " +
          "amount: " +
          snapshot.val();
        wishlist.id = snapshot.key;
        wishlist.classList.add("list-group-item", "list-group-item-success");
        WishList.prepend(wishlist);
        console.log("helo" + snapshot.val());

        // console.log(snapshot.val());
        //  console.log("hello");
      });

    // console.log("helloa");

    // *modal functionality
    // todo have to update modal with one single Modal !

    // todo function be like: on clicking single buttton modal will identify modla name and description then changes its title accordingly to the type of the button

    // ?MODAL FUNCTIONS

    //* Triggers
    saveFundsData.addEventListener("click", addFunds);

    // ?add Funds function
    function addFunds() {
      console.log(totalf);
      console.log(newFunds);
      var finalFundToAdd = 0;
      var finalFundToReduce = 0;
      finalFundToAdd = addFundsData.value;
      finalFundToReduce = reduceFundsData.value;

      // *parsing to float
      console.log(parseFloat(addFundsData.value) + parseFloat(totalf));
      console.log(parseFloat(reduceFundsData.value));
      newFunds = parseFloat(
        parseFloat(addFundsData.value) +
          parseFloat(totalf) -
          parseFloat(reduceFundsData.value)
      );
      var newFundsFloat = parseFloat(newFunds);
      console.log(newFundsFloat);

      // *updating  database with new values
      database.ref("users/" + user.displayName + " " + userId).set({
        // Name:user.displayName,
        // Email:user.email,
        TotalFunds: newFundsFloat,
        Savings: 0,
        Expenses: 0,

        ExpensesHistory: { Food: 2000, Others: 300 },
        WishList: { loop: 900, Food: 2000, Others: 300 },
      });
    }
    // ?ends
  });
};

// *end

// *initiating method

showUserData();

//* end
