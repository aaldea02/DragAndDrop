import { draggableList } from "./dragdrop.js";
document.addEventListener("DOMContentLoaded", () => {
  let choice = -1;

  const div1 = document.getElementById("div1");
  const autocomplete = document.createElement("span"); // make an array later on
  const autocomplete_result = document.createElement("span");
  const hiddenParagraph = document.createElement("span");
  const autocomplete_input = document.createElement("span");

  const getCaretCoordinates = () => {
    let x = 0,
      y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      // Check if there is a selection (i.e. cursor in place)
      if (selection.rangeCount !== 0) {
        // Clone the range
        const range = selection.getRangeAt(0).cloneRange();
        // Collapse the range to the start, so there are not multiple chars selected
        range.collapse(true);
        // getCientRects returns all the positioning information we need
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left; // since the caret is only 1px wide, left == right
          y = rect.top; // top edge of the caret
        }
      }
    }
    return { x, y };
  };

  const moveAutocompleteResult = (event, contenteditable) => {
    const tooltip = document.getElementById("autocomplete_result");
    if (contenteditable.contains(event.target)) {
      const { x, y } = getCaretCoordinates();
      tooltip.setAttribute("aria-hidden", "false");
      tooltip.setAttribute(
        "style",
        `display: inline-block; left: ${x}px; top: ${y - 200}px` // unfortunately this is a magic number
      );
    } else {
      tooltip.setAttribute("aria-hidden", "true");
      tooltip.setAttribute("style", "display: none;");
    }
  };

  const clearPopup = () => {
    autocomplete_result.innerHTML = "";
    autocomplete_result.style.display = "none";
  };

  const placeIbeamAfterNode = (node) => {
    if (typeof window.getSelection != "undefined") {
      const range = document.createRange();
      range.setStartAfter(node);
      range.collapse(true);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const completeInput = (node) => {
    setTimeout(function () {
      div1.focus();
    }, 0);

    placeIbeamAfterNode(autocomplete);
    div1.setAttribute("contentEditable", true);
    autocomplete.setAttribute("contentEditable", false);

    clearPopup();
  };

  const selectChoice = (node, choices) => {
    if (choice >= 0) {

      const child = autocomplete_result.children[choice];
      child.style.backgroundColor = "pink";
     // node.innerText = child.innerText;
    }
  };
  const clickChoice = (node, choices) => {
    console.log("cool");
    
    node.innerText = choices.innerText;
    autocomplete_result.innerHTML = "";
    autocomplete_result.style.display = "none";
    placeIbeamAfterNode(autocomplete);
    div1.setAttribute("contentEditable", true);
    autocomplete.setAttribute("contentEditable", false);
    completeInput();
    clearPopup();
  };

  const popup = (node) => {
    const innertext = autocomplete.innerText;
    const regExp = new RegExp("^" + node.innerText, "i");
    console.log(innertext);
    const fragment = document.createDocumentFragment();

    let flag = false;

    for (let x = 0; x < draggableList.length; x++) {
      if (regExp.test(draggableList[x].content)) {
        flag = true;
        
        const choices = document.createElement("p");
        choices.innerText = draggableList[x].content;
        choices.setAttribute("class", "choices");
        choices.addEventListener("click", () => clickChoice(node, choices));
        // make into an event listener

        fragment.appendChild(choices);
      }
    }

    if (!flag) {
      clearPopup();
    }
    autocomplete_result.innerHTML = "";
    autocomplete_result.style.display = "block";
    autocomplete_result.appendChild(fragment);
  };

  const insertNode = (node) => {
    let sel, range;

    if (window.getSelection) {
      sel = window.getSelection();

      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        const fragment = document.createDocumentFragment();
        const sign = document.createTextNode("@");
        const wordsAfter = document.createElement("span");

        fragment.appendChild(sign);
        if (node.classList.contains("AutoComplete")) fragment.appendChild(node);
        fragment.appendChild(wordsAfter);

        range.insertNode(fragment);

        range.collapse(true);
        setTimeout(() => {
          node.focus();
        }, 0);
      }
    }
  };

  const createInput = (node) => {
    autocomplete.setAttribute("id", "autocomplete");
    autocomplete.setAttribute("class", "AutoComplete");
    autocomplete_result.setAttribute("id", "autocomplete_result");

    insertNode(autocomplete);

    div1.appendChild(autocomplete_result);

    div1.setAttribute("contentEditable", false);
    autocomplete.setAttribute("contentEditable", true);
    autocomplete_result.setAttribute("contentEditable", false);
    autocomplete.setAttribute("draggable", true);

    setTimeout(() => {
      autocomplete.focus();
    }, 0);

    autocomplete.addEventListener("keyup", () => popup(autocomplete)); // passing in the node argument breaks it
    autocomplete.addEventListener("change", () => popup(autocomplete));
  };

  const deleteInput = (node) => {
    setTimeout(() => {
      autocomplete.blur();
    }, 0);

    autocomplete.remove(); // might not work on IE

    div1.removeChild(autocomplete_result);
    div1.setAttribute("contentEditable", true);

    setTimeout(() => {
      div1.focus();
    }, 0);

    document.execCommand("selectAll", false, null);

    document.getSelection().collapseToEnd();
  };

  const checkKeyPressed = (evt) => {
    if (evt.key === "@") {
      
      createInput();
      moveAutocompleteResult(evt, div1);
    } else if (
      evt.key === "Backspace" &&
      div1.contains(document.getElementById("autocomplete")) &&
      autocomplete.innerText === ""
    ) {
      deleteInput();
    } else if (
      evt.key === "Enter" && // need to add tab
      div1.contains(document.getElementById("autocomplete"))
    ) {
      completeInput();
    } else if (
      evt.key === "ArrowDown" &&
      div1.contains(document.getElementById("autocomplete"))
    ) {
      choice++;
      selectChoice();
    } else if (
      evt.key === "ArrowUp" &&
      div1.contains(document.getElementById("autocomplete"))
    ) {
      choice--;
      selectChoice();
    }
  };

  div1.addEventListener("keydown", checkKeyPressed, false);
});
