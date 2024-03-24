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

  const onArchiveNoteItem = async (id) => {
    const isArchhivedPage = window.location.href.includes('archive');

    try {
      let result;

      if (isArchhivedPage) {
        result = await ApiNotes.unarchiveNote(id);
      } else {
        result = await ApiNotes.archiveNote(id);
      }

      if (result.status === 'fail') {
        throw Error(result.message);
      }

      window.alert(`${isArchhivedPage ? 'unarchive' : 'archive'} note success`);
      loadNote();
    } catch (error) {
      window.alert(error);
    }
  };

  /* Load note handler */
  window.addEventListener('DOMContentLoaded', () => {
    init();
  });

  window.addEventListener('resize', () => Utils.resizeGridLayout(noteListElement));

  /* delete and archive button handler */
  document.querySelector('main').addEventListener('click', (e) => {
    const noteItemElement = e.target._shadowRoot;
    if (noteItemElement) {
      const cardNoteItem = noteItemElement.querySelector('.note-item');

      const deleteButton = cardNoteItem.querySelector('.delete-button');
      const archiveButton = cardNoteItem.querySelector('.archive-button');
      // console.log(deleteButton);
      deleteButton.addEventListener('click', () => {
        onDeleteNoteItem(cardNoteItem.id);
        return;
      });
      console.log(archiveButton);
      archiveButton.addEventListener('click', () => {
        onArchiveNoteItem(cardNoteItem.id);
        return;
      });
    }
  });
};

export default Archive;
