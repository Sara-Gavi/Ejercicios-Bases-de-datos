import { useEffect, useState } from 'react';
import TaskCreate from './manage/TaskCreate';
import Filters from './filters/Filters';
import TaskList from './listing/TaskList';
import '../scss/App.scss';

function App() {
  const [ tasks, setTasks ] = useState( [] );

  const [ searchTask, setSearchTask ] = useState( '' );
  const [ newTask, setNewTask ] = useState( '' );

  const handleInputSearchTask = (text) => {
    setSearchTask(text);
  }

  const handleInputNewTask = (text) => {
    setNewTask(text);
  }
  

  useEffect(() => {
    // FETCH Listado con todas las tareas

    fetch('//localhost:4000/api/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      });

  },[])
  


  const handleSearch = () => {
    // FETCH Listado con las filtradas

    fetch(`//localhost:4000/api/tasks?search=${searchTask}`)
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      });

  }

  const handleCreate = () => {
    // FETCH Crear una tarea nueva

    fetch('//localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        text: newTask
        }
      )
    })
      .then(response => response.json())
      .then(data => {
        //  data = {
        //    success: true,
        //    id: 93
        //  }
        if( data.success ) {
          const newTaskId = data.id;
          const taskCreated = {
            id: newTaskId,
            text: newTask,
            completed: false
          };
          setTasks([
            ...tasks,
            taskCreated
          ]);
          setNewTask('');
        }
      });

  }

  const handleEdit = (id, text, completed) => {
    // FETCH Editar una tarea (completed) pasando el id de tarea

    fetch(`//localhost:4000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          text: text,
          completed: completed
        }
      )
    })
      .then(response => response.json())
      .then(data => {
        if( data.success ) {
          const clonnedTasks = [...tasks];
          const editedTask = clonnedTasks.find(t => t.id === parseInt(id));
          editedTask.completed = completed;

          setTasks( clonnedTasks );
        }
      });

  }

  const handleDelete = (id) => {
    // FETCH Borrar una tarea pasando id de la tarea

    fetch(`//localhost:4000/api/tasks/${id}`, {
      method: 'DELETE'})
      .then(response => response.json())
      .then(data => {
        if( data.success ) {
          const clonnedTasks = [...tasks];
          const deletedTaskIndex = clonnedTasks.findIndex(t => t.id === parseInt(id));
          clonnedTasks.splice(deletedTaskIndex, 1);

          setTasks( clonnedTasks );
        }
      });


  }



  return (
    <div className='page'>
      <header className='header'>
        <h1 className='title'>AdaTasks</h1>
      </header>
      <main className='main'>
        <TaskCreate text={newTask} onInput={handleInputNewTask} onCreate={handleCreate} />

        <section className='container'>
          <Filters text={searchTask} onInput={handleInputSearchTask} onSearch={handleSearch} />
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

export default App;
