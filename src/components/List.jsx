import { useState, useEffect } from "react";
import styles from "./List.module.css";

function List({task, onTaskNameChange, onCheck, onDelete}) {
  
  const [isChecked, setIsChecked] = useState(task.done)
  const [taskName, setTaskNameChange] = useState(task.name);


  function handleCheck() {

    setIsChecked(!isChecked); 
    onCheck(task.id, !isChecked);
  }

  
  function onNameChange(event) {
    const newName = event.target.value;
    setTaskNameChange(newName);
    onTaskNameChange(task.id, newName);
  }

  function handleKeyPress(event) {
    if((event.ctrlKey || event.metaKey) && event.key === 'y') {
      onDelete(task.id);
    }
  }
  

  useEffect(() => {
    onTaskNameChange(taskName);

  }, []);

  return (
    <li onKeyDown={handleKeyPress} className="list__item">
    <input
      type="checkbox"
      onChange={handleCheck}
      checked={isChecked}
      className="list__checkbox"
    />
    {isChecked ? (
      <input
        type="text"
        className={styles.list__text_st}
        value={taskName}
        onChange={onNameChange}
      />
    ) : (
      <input 
      type="text"
       className={styles.list__text}
       value={taskName}
        onChange={onNameChange}
         />
    )}
    <button onClick={() => onDelete(task.id)} className="list__btn" type="button">
      DELETE
    </button>
  </li>
  );
}


export default List;
