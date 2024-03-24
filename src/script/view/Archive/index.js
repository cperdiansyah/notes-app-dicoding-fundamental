import ApiNotes from '../../../api';
import Utils from '../../utils';

const Archive = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  /* show note handler */
  const init = async () => {
    loadNote();
    Utils.resizeGridLayout(noteListElement);
  };

  const loadNote = async () => {
    try {
      noteListElement.setAttribute('loading', true);
      const notes = await ApiNotes.getArchivedNotes();
      const dataNotes = notes.data;

      if (dataNotes.length === 0) {
        noteListElement.setAttribute('loading', false);
        noteListElement.setAttribute('empty', true);
        return;
      } else {
        noteListElement.setAttribute('empty', false);
      }

      setTimeout(() => {
        noteListElement.setAttribute('loading', false);
        Utils.displayResult(notes.data, noteListElement);
        Utils.showNoteList(noteListContainerElement, noteListElement);
      }, [500]);
    } catch (error) {
      noteListElement.setAttribute('loading', false);

      throw error;
    }
  };

  /* Load note handler */
  window.addEventListener('DOMContentLoaded', () => {
    init();
  });

  window.addEventListener('resize', () => Utils.resizeGridLayout(noteListElement));
};

export default Archive;
