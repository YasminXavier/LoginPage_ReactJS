import { useEffect, useState } from 'react';
import './App.css';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = "http://localhost:5001/";

function App() {

    /* Aplication states */
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [todos, setTodo] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
      /* e = don't reload the page when this event happend */
      e.preventDefault(); /* -> stop the event "form" but not all the aplication  */
      console.log(title);
      setTitle('');
      console.log('Tarefa criada com sucesso!');
    }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1> React To Do List </h1>git 
      </div>
      <div className='form-todo'>
        <h2> Crie uma nova tarefa: </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'> Nome da tarefa: </label>
          <br /* line break */ />
          <input required
          type='text' 
          name='title' 
          placeholder='O que voê irá fazer?' 
          onChange={(e) => setTitle(e.target.value)}
          value={title || '' /* title is empty */}
          /* onChange get the value on the input and replace the Title value and then clean the input */ />
          <br/>
          <input type='submit' value="Enviar"/>
        </form>
      </div>
      <div className='list-todo'>
        <h3> Lista de tarefas </h3>
        {todos.length === 0 && <p> Não há tarefas. </p>
        /* If todos return no items, then have the paraghaph */}
      </div>
    </div>
  );
}

export default App;
