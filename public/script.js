function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

document.addEventListener('DOMContentLoaded', () => {

  alert("turtle");
  // ]gets the input div
  const div1 = document.getElementById('div1');
  div1.setAttribute("contentEditable", true);

  // creates draggables
  const draggableList = [
    {
      id: create_UUID(),
      content: "Apt Date"
    },
    {
      id: create_UUID(),
      content: "Apt Time"
    },
    {
      id: create_UUID(),
      content: "Location"
    },
    {
      id: create_UUID(),
      content: "Patient Name"
    },
  ];
  
  // creates draggables
  for (var x = 0, b = document.createDocumentFragment(), c = false; x < draggableList.length; x++) 
  {
   
    var d = document.createElement("span");
    d.setAttribute("class","draggables");
    d.setAttribute("id", draggableList[x].id);

    d.innerText = draggableList[x].content;
    d.setAttribute("contentEditable", false); 
    d.setAttribute("draggable", true);
    b.appendChild(d);
    
  }
  div1.after(b);




  
  // event listeners for drag drop
  document.addEventListener("dragover", function(ev) {
    ev.preventDefault();
  });
  
  document.addEventListener("dragstart", function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  });
  
  // specifies event listener to div1
  div1.addEventListener("drop", function(ev) {
      ev.preventDefault();
      const data = ev.dataTransfer.getData("text");
      if(document.getElementById("div1").contains(document.getElementById(data))) {
        ev.target.appendChild(document.getElementById(data));
    } else {
      const nodeCopy = document.getElementById(data).cloneNode(true);
      // technically we need to create a new id but code breaks if I do
      // nodeCopy.id = uuid();
      ev.target.appendChild(nodeCopy);
    }
  });

  // @ sign
  div1.addEventListener("keydown", checkKeyPressed, false);
  
  function checkKeyPressed(evt) 
  {
      if (evt.keyCode == "50") 
      {
        const autocomplete = document.createElement("span");
        autocomplete.setAttribute("id", "autocomplete");
        const autocomplete_result = document.createElement("span");
        autocomplete_result.setAttribute("id", "autocomplete_result");
        div1.appendChild(autocomplete);  
        div1.appendChild(autocomplete_result); 
        div1.setAttribute("contentEditable", false);
        autocomplete.setAttribute("contentEditable", true);
        
        
        autocomplete.addEventListener("keyup", updPopup);
        autocomplete.addEventListener("change", updPopup);
        autocomplete.addEventListener("focus", updPopup);


      }
  }
  
  
  //Create and append select list
  
  

  div1.addEventListener('input', () => {
    // setTimeout(clearSpan("words"),2000);
  });

  function clearSpan(className){
   
    div1.innerHTML = div1.innerHTML.replace(/<\/?span[^>]*>/g,"");
    // const elements = document.getElementsByClassName(className);
    // while(elements.length > 0){
    //     elements[0].parentNode.removeChild(elements[0]);
    //     // take the innerText of the child then add it back
    // }
  }

  // replacement code
  // some timer code
  let typingTimer;                //timer identifier
  let doneTypingInterval = 1000;  //time in ms (1 second)


  // on keyup, start the countdown
  div1.addEventListener('keyup', () => {
      clearTimeout(typingTimer);
        //typingTimer = setTimeout(doneTyping, doneTypingInterval);     
      
  });

  // replaces all the span tags, need to not replace the draggables
  function doneTyping () {
  
    div1.innerHTML = div1.innerText.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="words">$2</span>');
    // replace only  the draggables next to get back attributes?
  }

  
  // adds span might update to something better
  // ummm i need to change it so it doesnt affect the draggables
  div1.innerHTML = div1.innerText.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="words">$2</span>');
  


  function popupClearAndHide() {
    autocomplete_result.innerHTML = "";
    autocomplete_result.style.display = "none";
  }
  
  function updPopup() {
    console.log(autocomplete.innerText);
    if(!autocomplete.innerText) {
      
      popupClearAndHide();
      return;
    }
  
    var a = new RegExp("^" + autocomplete.innerText, "i");
    
    for(var x = 0, b = document.createDocumentFragment(), c = false; x < draggableList.length; x++) {
      if(a.test(draggableList[x])) {
        c = true;
        // adds in the element
        var d = document.createElement("p");
        d.innerText = draggableList[x];
        d.setAttribute("onclick", "autocomplete.innerText=this.innerText;autocomplete_result.innerHTML='';autocomplete_result.style.display='none';");
        b.appendChild(d);
        
      }
    }
    if(c == true) {
      autocomplete_result.innerHTML = "";
      autocomplete_result.style.display = "block";
      autocomplete_result.appendChild(b);
      return;
    }
    popupClearAndHide();
    autocomplete.setAttribute("contentEditable", false);
    div1.setAttribute("contentEditable", true);
  }
  
  function onClick(d){
    console.log("meowwww");
    autocomplete.innerText=this.innerText;autocomplete_result.innerHTML='';autocomplete_result.style.display='none';autocomplete.setAttribute("contentEditable", false);
    div1.setAttribute("contentEditable", true);
  
  }
  
  // if it alerts the code works
  alert("meow");

});


function myFunction(event) {

}
// ouside functions




  
