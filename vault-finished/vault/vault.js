//CREATE A CLIENT-SIDE (NOT SECURE) SECRET DATA VAULT
    //WE WILL SAVE DATA UNDER A PASSWORD
    //IndexedDB (IDB) TO STORE DATA IN THE VAULT
    //IDB API IS AWFUL, WE WILL USE DEXIE.JS

// IDB 1.0 STORAGE STRUCTURE
    //DATABASE: A PLACE TO STO0RE DATA
    //DATA STORES: "name"
    //OBJECTS: ANY JAVASCRIPT OBJECTS


//CREATE 

var db = new Dexie("secret_vault");
db.version(1).stores({
    
    //WHAT YOU WILL BE INSERTING INTO THE VAULT
    vault: 'label,data'
});

//SELECT THE ELEMENT WITH THE #btnAdd ID
var btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", function() {
    

    //GET VALUE OF THE #label ID
    var label = document.querySelector("#label").value;

    //GET THE VALUE OF THE #data ID
    var data = document.querySelector("#data").value;

    //IF THE LABEL IS LESS THAN 4 CHARACTERS OR THE DATA === 0, THROW AN ALERT
    if (label.length<4 || data.length==0) {
        alert("You need to enter a label and the data");
    } 

    //SAVE THE DATA ON THE DATABASE
    else {
        var object = {
            // 'label:' STORES THE VARIABLE 'label' CREATED ABOVE INTO THE DB 
            label: label,
            data: data
        }

        // AFTER STORING THE DATA INTO THE OBJECT, PUT THE OBJECT IN THE VAULT OF THE DATABASE, AND UPDATE YOUR VAULT'S LIST
        db.vault.put(object).then(function() {
            updateList();  
        });
    }
});


//GET ALL THE DATA IN THE VAULT AND DISPLAY IT IN THE WEB BROWSER
function updateList() {

    //ORDER THE DATA IN THE VAULT ALPHABETICALLY BY LABEL AND CONVERT IT TO AN ARRAY -- .toArray converts the object into an array
    db.vault.orderBy('label').toArray()
        
        //AFTER THE DATA IS ORDERED, THEN EXECUTE THE FUNCTION THAT DISPLAYS IT ON THE SCREEN
        .then(function(collection) {
            var keyphrase = document.querySelector("#keyphrase").value;
            var html = "";
            
            for (var element of collection) {

                //onclick remove the <dt> TAG
                html += "<dt onclick='remove(this)'>" + element.label + "</dt>";
                
                //IF THE LOGIN PASSWORD MATCHES THE KEYPHRASE, THEN SHOW THE DATA
                if (keyphrase=="html5") {
                    html += "<dd>" + element.data + "</dd>";
                
                } else {
                    html += "<dd>********</dd>"
                }
            }
            var list = document.querySelector("#list");
            list.innerHTML = html;

            var empty = document.querySelector("#empty");
            
            //IF THERE IS NO DATA IN THE COLLECTION ARRAY, THEN DISPLAY THE BLOCK, OTHERWISE, HIDE THE DISPLAY
            if (collection.length==0) {
                empty.style.display = "block";
            } else {
                empty.style.display = "none";
            }
        });
}

//THE FUNCTION THAT REMOVES THE ELEMENT LABEL IN THE <dt></dt> TAGS
function remove(dt) {

    //IF THE USER CONFIRMS THEY WANT TO DELETE THE DATA, THEN...
    if (confirm("Do you want to delete this entry?")) {

        //SELECT THE <dt></dt> TAGS WITH THE ID OF #label
        db.vault.where("label").equals(dt.innerHTML)

            //THEN DELETE THEM, AND AFTER YOU DELETE THEM, UPDATE THE LIST
            .delete().then(function() {
                updateList();
            });
    }
}

// We are going to refresh the list when the user is typing
var keyphrase = document.querySelector("#keyphrase");

//EACH TIME THE USER RELEASES A KEY, THE LIST UPDATES ==> DATA SHOWS ONCE THE KEYPHRASE IS TYPE IN
keyphrase.addEventListener("keyup", function() {

    //
    updateList();
})

// When the page loads I want to update the list
updateList();