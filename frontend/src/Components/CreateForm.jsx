import { useState } from "react";

function CreateForm({ fetchTodos, selectedPart }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止頁面刷新
  
    if (!content.trim()) return; // 確保內容不為空
  
    try {
      const userId = localStorage.getItem("userId"); // 從 localStorage 獲取 userId
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // 使用 Vite 的環境變數
 
      // 發送 POST 請求到 /todos/
      await fetch(`${API_BASE_URL}/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId, // 傳遞 user_id
          part: selectedPart, // 將當前部位傳遞給後端
          content,
          isCompleted: false, // 預設為未完成
        }),
      });
  
      fetchTodos(); // 重新獲取最新的 Todo 清單
      setContent(""); // 清空輸入欄位
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add action..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateForm;
