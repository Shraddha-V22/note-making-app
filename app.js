const addNewNote = document.getElementById("new-note");
const saveNote = document.getElementById("save-note");
const openNoteInput = document.querySelector(".overlay");
const noteTitle = document.getElementById("input-title");
const noteBody = document.getElementById("input-body");

showNotes();

addNewNote.addEventListener("click", () => {
  noteTitle.value = "";
  noteBody.value = "";
  openNoteInput.classList.add("new-note-modal");
});

//saving note
saveNote.addEventListener("click", () => {
  const notes = localStorage.getItem("notes");

  if (noteTitle.value && noteBody.value) {
    if (notes == null) {
      notesArr = [];
    } else {
      notesArr = JSON.parse(notes);
    }
    notesArr.push({ title: noteTitle.value, body: noteBody.value });
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNotes();
  }

  noteTitle.value = "";
  noteBody.value = "";
  openNoteInput.classList.remove("new-note-modal");
});

// showing all the notes from local storage
function showNotes() {
  const notes = localStorage.getItem("notes");

  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }

  let html = "";
  notesArr.forEach((element, index) => {
    html += `
        <div class="note-card" id="note-${index}" onclick="openNote(this.id)">
          <div>
            <h3>${element.title}</h3>
            <p class="note-text">${element.body.length < 150 ? element.body : element.body.slice(0, 150) + "..."}</p>
          </div>
          <button id="${index}" onclick="deleteNote(this.id)" class="delete-note">Delete note</button>
        </div>
        `;
  });

  const notesElement = document.getElementById("notes");
  if (notesArr.length != 0) {
    notesElement.classList.add("notes-section");
    notesElement.innerHTML = html;
  } else {
    notesElement.classList.remove("notes-section");
    notesElement.innerHTML = `
            <p id="empty-space">There are no notes. start making notes by clicking on 'New note' button</p>
            <img src="bg-empty.png" alt="" id="empty-bg"/>
        `;
  }
}

//deleting a note
function deleteNote(id) {
  const notes = localStorage.getItem("notes");

  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }

  notesArr.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  showNotes();
}

//opening a note
function openNote(id, e) {
  if(e && e.stopPropagation) {
    e.stopPropagation();
  }
  const note = document.getElementById(id);

  const notes = localStorage.getItem("notes");

  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }

  const index = id.split("-")[1]
  const noteOpened = notesArr.slice(index, index+1);

  noteTitle.value = noteOpened[0].title;
  noteBody.value = noteOpened[0].body;

  openNoteInput.classList.add("new-note-modal");
}

//closing note input modal
const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", () => {
  openNoteInput.classList.remove("new-note-modal");
});

//to copy text
function copyText() {
  // Select the text field
  noteBody.select();
  noteBody.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(noteBody.value);
}
const copyBtn = document.getElementById("copy-text");
copyBtn.addEventListener("click", copyText);

function boldText() {
  if(boldBtn.checked) {
    noteBody.style.fontWeight = "bold";
  } else {
    noteBody.style.fontWeight = "";
  }
}

const boldBtn = document.getElementById("bold-text");
boldBtn.addEventListener("click", boldText);


function underlineText() {
  if(underlineBtn.checked) {
    noteBody.style.textDecoration = "underline";
  } else {
    noteBody.style.textDecoration = "none";
  }
}

const underlineBtn = document.getElementById("underline-text");
underlineBtn.addEventListener("click", underlineText);














// function boldText() {
//   const sel = window.getSelection();
//   if (sel.rangeCount) {
//     // Creates a new element, and insert the selected text with the chosen style
//     var e = document.createElement("span");
//     e.classList.add("bold"); // Selected style (class)
//     e.innerHTML = sel.toString(); // Selected text

//     var range = sel.getRangeAt(0);
//     range.deleteContents(); // Deletes selected text…
//     range.insertNode(e); // … and inserts the new element at its place
//   }
// }
// const boldBtn = document.getElementById("bold-text");
// boldBtn.addEventListener("click", boldText);

// //making text underlined
// function underlineText() {
//   const sel = window.getSelection();
//   if (sel.rangeCount) {
//     // Creates a new element, and insert the selected text with the chosen style
//     var e = document.createElement("span");
//     e.classList.add("underline"); // Selected style (class)
//     e.innerHTML = sel.toString(); // Selected text

//     var range = sel.getRangeAt(0);
//     range.deleteContents(); // Deletes selected text…
//     range.insertNode(e); // … and inserts the new element at its place
//   }
// }
// const underlineBtn = document.getElementById("underline-text");
// underlineBtn.addEventListener("click", underlineText);