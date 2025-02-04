import { useState } from "react";

function EditItem({ todo, editTodo, toggleEditing }) {
  const [content, setContent] = useState(todo.content);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 建立 updatedTodo 物件，確保格式符合後端要求
    const updatedTodo = {
      ...todo, // 保留原本的 part 和 isCompleted 屬性
      content, // 更新 content
    };

    editTodo(todo.id, updatedTodo); // 發送更新請求
    toggleEditing(todo.id); // 退出編輯模式
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Edit task..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="edit-btn" type="submit">Save</button>
      <button className="edit-btn" type="button" onClick={() => toggleEditing(todo.id)}>
        Cancel
      </button>
    </form>
  );
}

export default EditItem;
