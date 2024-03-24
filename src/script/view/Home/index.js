import ApiNotes from '../../../api/index.js';
import Utils from '../../utils.js';
import { customValidationInputHandler, validateFieldHandler } from './validation.js';

const Home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const flyingButtonElement = document.querySelector('button.flying-button');
  const noteFormElement = document.querySelector('.form-wrapper');

  const inputs = document.querySelectorAll('form input, form textarea');

  /* show note handler */
  const init = async () => {
    loadNote();

    Utils.resizeGridLayout(noteListElement);
    showNoteList();
  };

  const loadNote = async () => {
    toggleNoteForm('hide');

    try {
      noteListElement.setAttribute('loading', true);
      const notes = await ApiNotes.getNotes();
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
      }, 500);
    } catch (error) {
      noteListElement.setAttribute('loading', false);

      throw error;
    }
  };

  const toggleNoteForm = (toggle) => {
    if (toggle === 'show') {
      Utils.showElement(noteFormElement);
    }
    if (toggle === 'hide') {
      Utils.hideElement(noteFormElement);
    }
  };

  /* Handle submit notes form */
  const onSubmitNoteHandler = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();

      const elements = Array.from(event.target);

      const formData = elements.reduce((acc, el) => {
        if (el.name) {
          acc[el.name] = el.value;
        }

        return acc;
      }, {});

      const { title, body } = formData;

      const noteData = {
        title,
        body,
      };
      const result = await ApiNotes.addNote(noteData);

      if (result.status === 'fail') {
        throw Error(result.message);
      }

      window.alert('add note success');
      loadNote();
      event.target.reset();
    } catch (error) {
      window.alert(error);
    }
  };

  /* Delete note */
  const onDeleteNoteItem = async (id) => {
    try {
      const result = await ApiNotes.deleteNote(id);

      if (result.status === 'fail') {
        throw Error(result.message);
      }

      window.alert('delete note success');
      loadNote();
    } catch (error) {
      window.alert(error);
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

  /* flying button and form show handler */
  flyingButtonElement.addEventListener('click', (evt) => {
    const isElementShow = noteFormElement.style.display === 'block';
    if (isElementShow) {
      toggleNoteForm('hide');
    } else {
      toggleNoteForm('show');
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (
      !target.closest('.form-wrapper') &&
      !target.closest('.flying-button') &&
      noteFormElement.style.display === 'block'
    ) {
      toggleNoteForm('hide');
    }
  });

  /* Load note handler */
  window.addEventListener('DOMContentLoaded', () => {
    init();
  });

  window.addEventListener('resize', () => Utils.resizeGridLayout(noteListElement));

  /* form submit */
  noteFormElement.querySelector('form').addEventListener('submit', onSubmitNoteHandler);

  /* validate form */
  inputs.forEach((input) => {
    input.addEventListener('change', customValidationInputHandler);
    input.addEventListener('invalid', customValidationInputHandler);
    input.addEventListener('blur', validateFieldHandler);
  });

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

export default Home;
