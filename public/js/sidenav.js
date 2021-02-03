// console.log('hello');



// *getting all elements

const sideMenuBtn= document.getElementById("side-menu") ;
const sidenavContents = document.getElementById("side-nav-contents");
const closeBtn = document.getElementById("close-btn");





sideMenuBtn.addEventListener("click",function(){
    // console.log('lol');
    sidenavContents.style.width= "90vw";
 });
 
 closeBtn.addEventListener("click", (e)=>{
     sidenavContents.style.width="0"
 })



//  ?firebase logout shift+tab
    googleSignOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
        // Sign-out successful.
        console.log("logouty");
        })
        .catch((error) => {
        // An error happened.
        });
    };
