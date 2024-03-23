import notesData from './data.js';
class Notes {
  constructor() {
    this.notes = notesData;
  }

  addNote(note) {
    this.notes.push(note);
  }

  getNotes() {
    return this.notes;
  }

  getNoteById(id) {
    return this.notes.find((note) => note.id === id);
  }
}
export default Notes;
