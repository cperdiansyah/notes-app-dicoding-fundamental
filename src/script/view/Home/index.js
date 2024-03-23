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
    resizeGridLayout();
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
        displayResult(notes.data);
        showNoteList();
      }, [500]);
    } catch (error) {
      noteListElement.setAttribute('loading', false);

      throw error;
    }
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

  const resizeGridLayout = () => {
    const width = window.innerWidth;
    if (width > 768) {
      noteListElement.setAttribute('column', '3');
      noteListElement.setAttribute('gutter', '16');
    } else if (width > 450) {
      noteListElement.setAttribute('column', '2');
      noteListElement.setAttribute('gutter', '13');
    } else {
      noteListElement.setAttribute('column', '1');
      noteListElement.setAttribute('gutter', '10');
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

  /* handle validation */

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

  window.addEventListener('resize', resizeGridLayout);

  /* form submit */
  noteFormElement.querySelector('form').addEventListener('submit', onSubmitNoteHandler);

  /* validate form */
  inputs.forEach((input) => {
    input.addEventListener('change', customValidationInputHandler);
    input.addEventListener('invalid', customValidationInputHandler);
    input.addEventListener('blur', validateFieldHandler);
  });
};

export default Home;
