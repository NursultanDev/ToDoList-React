import { useState} from "react";

function InputBar({addTodo}) {
    const [inputText, setInputText] = useState('');

    function handleClick() {
        
        if(inputText !== '') {
            addTodo(inputText);
            
        } else {
            alert('write something!');
        }
        setInputText('');
    }

    function handleKeyPress(event) {
        if(event.code === 'Enter') {
            handleClick();
        }
    }

    function handleChange(event) {
        setInputText(event.target.value);
    }

    return(
        <div action="" className="input-bar">
            <input onChange={handleChange} className="input-bar__input" value={inputText} onKeyUp={handleKeyPress}  type="text" />
            <button 
            onClick={handleClick} 
            className="input-bar__btn" 
            type="button"
            >ADD</button>
        </div>
    );
}

export default InputBar;