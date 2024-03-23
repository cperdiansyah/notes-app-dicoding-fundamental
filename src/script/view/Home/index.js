import ApiNotes from '../../../api/index.js';
import Utils from '../../utils.js';

const Home = () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const flyingButtonElement = document.querySelector('flying-button');
  const noteFormElement = document.querySelector('note-form');

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

  /* Handle submit notes form */
  const onSubmitNoteHandler = async (event) => {
    try {
      event.preventDefault();

      const { title, body } = event.detail.data;

      const noteData = {
        title,
        body,
      };
      const result = await ApiNotes.addNote(noteData);

      if (result.status === 'fail') {
        throw Error(result.message);
      }

      window.alert('add note success');
      // toggleNoteForm('hide');
      loadNote();
    } catch (error) {
      window.alert(error);
    }
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
      noteFormElement.setAttribute('show', 'true');
    }
    if (toggle === 'hide') {
      noteFormElement.setAttribute('show', 'false');
    }
  };

  /* flying button and form show handler */
  flyingButtonElement.addEventListener('click', (evt) => {
    const isEelementShow = noteFormElement.getAttribute('show');
    if (isEelementShow === 'true') {
      toggleNoteForm('hide');
    } else {
      toggleNoteForm('show');
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (
      !target.closest('note-form') &&
      !target.closest('flying-button') &&
      noteFormElement.getAttribute('show') === 'true'
    ) {
      toggleNoteForm('hide');
    }
  });

  /* Load note handler */
  window.addEventListener('DOMContentLoaded', () => {
    init();
  });

  window.addEventListener('resize', resizeGridLayout);

  noteFormElement.addEventListener('addNote', onSubmitNoteHandler);
};

export default Home;
