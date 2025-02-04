import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import EditItem from "./EditItem";

function TodoItem({ todo, delTodo, toggleCompleted, toggleEditing, editTodo }) {
  return (
    todo.isEditing ? <EditItem todo={todo} editTodo={editTodo} toggleEditing={toggleEditing}/> 
    :<div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <p onClick={() => {toggleCompleted(todo.id)}}>{todo.content}</p>
      <div>
        <MdOutlineModeEdit style={{ cursor: "pointer" }}  onClick={() => {toggleEditing(todo.id)}}/>
        <MdDeleteOutline style={{ cursor: "pointer", marginLeft: '5px' }} onClick={() => {delTodo(todo.id)}}/>
      </div>
    </div>
  );
}

export default TodoItem;
