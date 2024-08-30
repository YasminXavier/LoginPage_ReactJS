import { useEffect, useState } from 'react';
import './App.css';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = "http://localhost:3000";

function App() {

    /* Aplication states */
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [todos, setTodo] = useState([])
    const [loading, setLoading] = useState(false)

  /* load todos on page */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true) /* carregando os dados */

      const res = await fetch(API + "/todos")
      .then((res) => res.json())
      /* retorna os dados, espera a resposta e transforma ela em json */
      .then((data) => data)
      .catch((err) => console.log(err)); /* opicional, retorna erros */

      setLoading(false); /* finalizou de carregar os dados */

      setTodo(res) /* salva os dados na state */
    };
    loadData(); /* recarrega a página e executa o loadData */

  }, []) /* quando [] ta vazio, ele é executado quando a página carrega */

    const handleSubmit = async (e) => { /* requisição assincrona: vai para
      o servidor e não sabe quando volta */
      /* e = don't reload the page when this event happend */
      e.preventDefault(); /* -> stop the event "form" but not all the aplication  */

      const todo = {
        id: Math.random(),
        title,
        time,
        done: false, /* define como tarefa nao concluída */
      };

      /* modo JSON de se comunicar */
      await fetch(API + "/todos",{
        method: "POST" /* inserindo dados */,
        body: JSON.stringify(todo)/* apenas texto
        lá ele converte para objeto */,
        headers:{
          "Content-Type": "application/json",
        }
      });

      setTodo((prevState) => [...prevState, todos]);

      setTitle("");
      setTime("");
    };

    const handleDelete = async (id) => {
      await fetch(API + "/todos/" +id,{
        method: "DELETE",
      });

      setTodo((prevState) => prevState.filter((todos) => todos.id)!== id)
    };
    

    if(loading){
      <p> Carregando... </p>
    }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1> React To Do List </h1>
      </div>
      <div className='form-todo'>
        <h2> Crie uma nova tarefa: </h2>
        <form onSubmit={handleSubmit} className='form-control'>
          <label htmlFor='title'> Nome da tarefa: </label>
          <input required
          type='text' 
          name='title' 
          placeholder='O que voê irá fazer?' 
          onChange={(e) => setTitle(e.target.value)}
          value={title || '' /* title is empty */}
          /* onChange get the value on the input and 
          replace the Title value and then clean the input */ />
          <br/> 
          <label htmlFor='time'> Duração: </label>
          <input required
          type='text' 
          name='time' 
          placeholder='Tempo estimado em horas' 
          onChange={(e) => setTime(e.target.value)}
          value={time || ''}/>
          <br/>
          <input type='submit' value="Criar tarefa"/>
        </form>
      </div>
      <div className='list-todo'>
        <h3> Lista de tarefas </h3>
        {todos.length === 0 && <p> Não há tarefas. </p>
        /* If todos return no items, then have the paraghaph */}
        {todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <h4 className={todo.done ? "todo-done" : ""}> {todo.title} </h4>
            <p> Duração: {todo.time}</p>
            <div className='action'> 
              <span> 
                {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
