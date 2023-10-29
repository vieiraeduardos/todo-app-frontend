import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

interface ToDoProps {
  code: string, 
  title: string,
  created_at: Date,
  update_at: Date,
  is_completed: boolean
}

function App() {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<ToDoProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://todo-app-backend-vc90.onrender.com/todos");

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchData();
  }, [tasks]);

  async function addTask(): Promise<void> {
    try {
      await axios.post("https://todo-app-backend-vc90.onrender.com/todos",
      {
        title
      });

      setTasks([]);

    } catch(error) {
      console.error("Error inserting task:", error);
    }
  }

  async function deleteTask(code: string) {
    try {
      await axios.delete("https://todo-app-backend-vc90.onrender.com/todos", {
        data: {
          code
        }
      });

      setTasks([]);
    } catch(error) {
      console.error("Error deleting task:", error);
    }
  }

  async function updateTask(code:string, title: string, isCompleted: boolean) {
    try {
      await axios.put("https://todo-app-backend-vc90.onrender.com/todos",
      {
        code,
        title,
        isCompleted
      });

      setTasks([]);
    } catch(error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <>
  
      <h1>To Do List</h1>
      <div className="card">
        <input
          placeholder="Insira nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={() => addTask()}>
          Adicionar
        </button>
        
      </div>

      {
        tasks.map((task) => (
          <div
            key={task.code}
          >
            {
              task.is_completed ?
              <span style={{textDecoration: 'line-through'}}>{ task.title }</span>
              :
              <span>{ task.title }</span>            
            }

            <button onClick={() => { updateTask(task.code, task.title, !task.is_completed)}}>
              { task.is_completed ? "Desfazer"  : "Concluir" }
            </button>
            <button onClick={() => {}}>
              Editar
            </button>
            <button onClick={() => { deleteTask(task.code)}}>
              Excluir
            </button>
          </div>
        ))
      }
                  
    </>
  )
}

export default App
