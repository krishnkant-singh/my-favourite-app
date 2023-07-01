
const inputField=document.getElementById("input-field")
const addButton=document.getElementById("add-button")
const shoppingList=document.getElementById("shopping-list")
var reloadIconPressed = false;

onReload()


addButton.addEventListener("click", (e) => {
	e.preventDefault();
    let inputValue=inputField.value
    if(inputValue!=''){
    appendItemsToShoppingListEl(inputValue)
    clearInputFieldEl()	
    console.log(`${inputValue} added to database`)
    } else{
        console.log("object");
    }
})


function clearInputFieldEl(){
    inputField.value="";
}
function clearItemsEl(){
    shoppingList.innerHTML=""
}
function onReload() {
    clearItemsEl()
    // Your custom code here
    console.log("Window is being reloaded");
    var storedData = localStorage.getItem("item");
    var parsedArray = storedData ? JSON.parse(storedData) : [];
    //clearItemsEl();

    var items = [];
    if(parsedArray.length!=0){
            var news=localStorage.getItem("item");
            for(let i=0;i<parsedArray.length;i++){
                shoppingList.innerHTML+= `<li>${parsedArray[i]}</li>`;
        }   
    }
 }

function appendItemsToShoppingListEl(inputValue){

    var storedArray = localStorage.getItem("item");
    var parsedArray = storedArray ? JSON.parse(storedArray) : [];
    parsedArray.push(`${inputValue}`);
   
    var jsonString = JSON.stringify(parsedArray);
    var parsedArray = JSON.parse(jsonString);
    localStorage.setItem("item", JSON.stringify(parsedArray));
    console.log(localStorage.getItem("item[0]"))
    shoppingList.innerHTML+= `<li>${inputValue}</li>`;

}
var shoppinglist = document.getElementById("shopping-list");
shoppinglist.addEventListener("click", function(event) {
  var clickedElement = event.target;
  if (clickedElement.nodeName === "LI" && clickedElement.parentNode === shoppinglist) {
    shoppinglist.removeChild(clickedElement);
    var storedArray = localStorage.getItem("item");
   var parsedArray = storedArray ? JSON.parse(storedArray) : [];
    var elementIndex = parsedArray.indexOf(clickedElement.textContent);
    if (elementIndex > -1) {
        parsedArray.splice(elementIndex, 1);
      }
      localStorage.setItem("item", JSON.stringify(parsedArray));

  }
});


