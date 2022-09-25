const addNewNote = document.getElementById("new-note");
const saveNote = document.getElementById("save-note");
const openNoteInput = document.querySelector(".overlay");

showNotes();

addNewNote.addEventListener("click", () => {
    openNoteInput.classList.add("new-note-modal");
})

//saving note
saveNote.addEventListener("click", () => {
    const noteTitle = document.getElementById("input-title");
    const noteBody = document.getElementById("input-body");
    const notes = localStorage.getItem("notes");

    if(noteTitle.value && noteBody.value) {
        if(notes == null) {
            notesArr = [];
        } else {
            notesArr = JSON.parse(notes)
        }
        notesArr.push({title: noteTitle.value, body: noteBody.value})
        localStorage.setItem("notes", JSON.stringify(notesArr));
        showNotes();
    }

    openNoteInput.classList.remove("new-note-modal");
})

// showing all the notes from local storage
function showNotes() {
    const noteTitle = document.getElementById("input-title");
    const noteBody = document.getElementById("input-body");
    const notes = localStorage.getItem("notes");

    if(notes == null) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes)
    }

    let html = "";
    notesArr.forEach((element, index) => {
        html += `
        <div class="note-card">
          <h3>${element.title}</h3>
          <p>${element.body}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="delete-note">Delete note</button>
        </div>
        `;
    });

    const notesElement = document.getElementById("notes");
    if(notesArr.length != 0) {
        notesElement.classList.add("notes-section");
        notesElement.innerHTML = html;
    } else {
        notesElement.classList.remove("notes-section");
        notesElement.innerHTML = `
            <p id="empty-space">There are no notes. start making notes by clicking on 'New note' button</p>
        `;
    }
}

//deleting a note
function deleteNote(id) {
    console.log("I'm deleting", id);

    const notes = localStorage.getItem("notes");

    if(notes == null) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes)
    }

    notesArr.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNotes();
}

// closing note input modal
const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
    openNoteInput.classList.remove("new-note-modal");
})