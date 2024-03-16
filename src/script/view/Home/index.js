import Notes from '../../data/notes.js';
import Utils from '../../utils.js';

const Home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const loadNote = () => {
    const result = Notes.getAll();
    console.log(result);
    displayResult(result);

    showNoteList();
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.note = note;
      return noteItem;
    });
    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };
  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };
  // searchFormElement.addEventListener('search', onSearchHandler);
  // document.addEventListener('DOMContentLoaded', () => {
  //   console.log('asd');
  // });

  loadNote();
};

export default Home;
