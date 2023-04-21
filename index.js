import {initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting={
    databaseURL:"https://playground-bfd43-default-rtdb.firebaseio.com"
}

const app=initializeApp(appSetting)
console.log(app)
const database=getDatabase(app)
const itemsInDb=ref(database,"items")

const inputField=document.getElementById("input-field")
const addButton=document.getElementById("add-button")
const shoppingList=document.getElementById("shopping-list")
addButton.addEventListener("click", (e) => {
	e.preventDefault();
    let inputValue=inputField.value
    if(inputValue!=''){
    push(itemsInDb,inputValue)
    //appendItemsToShoppingListEl(inputValue)
    clearInputFieldEl()	
    console.log(`${inputValue} added to database`)
    } else{
        console.log("object");
    }
})

onValue(itemsInDb,function(snapshot) {

    if(snapshot.exists()){
    let itemsArray=Object.entries(snapshot.val())
    clearItemsEl()
        for(let i=0;i<itemsArray.length;i++){
            let itemsinDb=itemsArray[i];
            let currentItemId =itemsinDb[0];
            let currentItemValue=itemsinDb[1];
            console.log(currentItemId)
            
            appendItemsToShoppingListEl(itemsinDb)
        //console.log(itemsArray[i])
    }
    //console.log(snapshot.val())
}
else{
    shoppingList.innerHTML="NO ITEMS"

}
})
function clearInputFieldEl(){
    inputField.value="";
}
function clearItemsEl(){
    shoppingList.innerHTML=""
}

function appendItemsToShoppingListEl(inputValue){
   // shoppingList.innerHTML+=`<li>${inputValue}</li>`
   let itemId=inputValue[0];
   let itemsValue=inputValue[1];


   let newEl=document.createElement("li")
   newEl.textContent=itemsValue
  


   newEl.addEventListener("click",function() {
   
   let exactLocationOfItemInDb=ref(database,`items/${itemId}`)
   remove(exactLocationOfItemInDb)
   


   })
   shoppingList.append(newEl)
}

