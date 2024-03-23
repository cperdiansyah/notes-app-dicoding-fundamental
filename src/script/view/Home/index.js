import Notes from '../../data/notes.js';
import Utils from '../../utils.js';

const Home = () => {
  const notes = new Notes();
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const flyingButtonElement = document.querySelector('flying-button');
  const noteFormElement = document.querySelector('note-form');

  /* show note handler */
  const loadNote = () => {
    const result = notes.getNotes();
    displayResult(result);

    showNoteList();
    resizeGridLayout();
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
  const onSubmitNoteHandler = (event) => {
    event.preventDefault();

    const { title, body } = event.detail.data;

    const date = new Date();

    const noteData = {
      title,
      body,
      id: `notes-${+date}`,
      created_at: date.toISOString(),
    };
    notes.addNote(noteData);
    toggleNoteForm('hide');

    const latestData = notes.getNotes()
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
      noteFormElement.removeAttribute('show');
    }
  };

  /* flying button and form show handler */
  flyingButtonElement.addEventListener('click', (evt) => {
    const isEelementShow = noteFormElement.hasAttribute('show');
    if (isEelementShow) {
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
      noteFormElement.hasAttribute('show')
    ) {
      toggleNoteForm('hide');
    }
  });

  /* Load note handler */
  window.addEventListener('DOMContentLoaded', () => {
    loadNote();
  });

  window.addEventListener('resize', resizeGridLayout);

  noteFormElement.addEventListener('addNote', onSubmitNoteHandler);
};

export default Home;
