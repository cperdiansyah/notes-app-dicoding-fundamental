import Notes from '../data/notes.js';

const Home = () => {
  const getNotes = () => {
    const result = Notes.getAll();
    console.log(result);
  };

  getNotes();
};

export default Home;
