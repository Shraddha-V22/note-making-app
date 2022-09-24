const newNote = document.getElementById("new-note-btn");
const inputTitle = document.getElementById("input-title");
const inputbody = document.getElementById("input-body");
const saveNote = document.getElementById("save-btn");

function generateId() {
    let id = Math.floor(Math.random() * 100000);
    return id;
}

newNote.addEventListener("click", () => {
    console.log("new note added!");
})

saveNote.addEventListener("click", () => {
    if(inputTitle.value && inputbody.value) {
        let notes = document.querySelector("#sidebar");
        
        notes.innerHTML += `
            <div class="note" data-note-id="${generateId()}">
                <div class="note-title">${inputTitle.value}</div>
                <div class="note-body">${inputbody.value}</div>              
            </div> 
        `;
    }
})