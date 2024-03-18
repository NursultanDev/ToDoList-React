import Header from "./Header";
import InputBar from "./InputBar";
import List from "./List";
import { v4 as uuidv4} from 'uuid'
import { useState, useEffect } from "react";
uuidv4();

function ToDo()
 {
    const [todos, setTodos] = useState(( ) => {
    // Load tasks from localStorage on component mount
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
    });

    function addTodo(name) {
      const newTodo = {
        id: uuidv4(),
        name: name,
        done: false,

    };
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }

    function onTaskNameChange(id, newName) {
      setTodos(
        prevTodos => 
          prevTodos.map(todo =>
            todo.id === id ? {...todo, name: newName} : todo
          )
      )
    }



    function onCheck(id, check) {
      setTodos(
        prevTodos => 
          prevTodos.map(todo =>
            todo.id === id ? {...todo, done: check} : todo
          )
      )
    }

    function onDelete(id) {
      if(confirm('ARE YOU SURE MAN?')) {
        setTodos(prevTodos => {
          return prevTodos.filter(task => task.id !== id);
        })
      }
    }


    
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos)); 

    },[todos]);

      // Cleanup function to ensure localStorage is updated before component unmounts
  useEffect(() => {
    return () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
  }, []);



  return (
    <div className="todo-list__container">
      <Header title="GET YOUR STUFF DONE"></Header>
      <InputBar  addTodo={addTodo}></InputBar>
        <ul className="list">
            {
                todos.map(item => (
                    <List 
                    onCheck={onCheck} 
                    onTaskNameChange={onTaskNameChange}  
                    task={item} 
                    key={item.id}
                    onDelete={onDelete}
                    />
                ))
                
            }
        </ul>
    </div>
  );
}

export default ToDo;
