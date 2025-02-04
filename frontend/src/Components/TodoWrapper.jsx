import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom"; // 用於跳轉頁面

function TodoWrapper() {
  const [selectedPart, setSelectedPart] = useState("Glute1");
  const [todosByPart, setTodosByPart] = useState({});
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // 用於頁面跳轉

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest"); // 取得使用者名稱
    fetchTodos(); // 在載入時自動向後端請求 Todo 資料
  }, []);

  const fetchTodos = async () => {
    try {
      const userId = localStorage.getItem("userId"); // 確保 userId 存在
      if (!userId) {
        console.warn("User ID not found in localStorage");
        return; // 如果 userId 不存在，直接返回
      }
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(
        `${API_BASE_URL}/todos/?user_id=${userId}`
      );
      // console.log("Response status:", response.status); // 檢查 HTTP 狀態碼

      const data = await response.json();
      // console.log("Data fetched:", data); // 檢查返回的數據

      const groupedTodos = data.reduce((acc, todo) => {
        if (!acc[todo.part]) {
          acc[todo.part] = [];
        }
        acc[todo.part].push(todo);
        return acc;
      }, {});

      setTodosByPart(groupedTodos); // 更新狀態
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  const delTodo = async (id) => {
    try {
      const userId = localStorage.getItem("userId"); // 確保用戶只能刪除自己的 todo
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      fetchTodos(); // 更新資料列表
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodo = async (id, updatedTodo) => {
    try {
      const userId = localStorage.getItem("userId"); // 從 localStorage 獲取 userId
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      // 確保包含 user_id
      const updatedTodoWithUserId = {
        ...updatedTodo,
        user_id: parseInt(userId), // 添加 user_id 並轉換為整數
      };
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodoWithUserId), // 傳遞完整數據
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.detail}`);
      }

      fetchTodos(); // 更新資料列表
    } catch (error) {
      console.error("Error editing todo:", error.message);
    }
  };

  const toggleEditing = (id) => {
    setTodosByPart((prevTodos) => {
      const updatedTodos = { ...prevTodos };

      // 遍歷所有部位，找到對應的 Todo 並切換其 isEditing 狀態
      Object.keys(updatedTodos).forEach((part) => {
        updatedTodos[part] = updatedTodos[part].map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        );
      });

      return updatedTodos;
    });
  };

  const toggleCompleted = async (id) => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
        method: "PATCH", // 僅針對 isCompleted 更新
      });

      fetchTodos(); // 重新獲取更新後的 Todo 清單
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const logout = () => {
    // 清除 localStorage 中的用戶資料
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    // 跳轉到 Login Page
    navigate("/");
  };

  return (
    <div>
      <button onClick={logout} className="logout-button">Logout</button>
      <div className="wrapper">
        <h3 className="card-label">Welcome, {username}!</h3>
        <h1 className="card-label">Workout Routine</h1>
        <div>
          {Object.keys(todosByPart).map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`part-button ${selectedPart === part ? "active" : ""}`}
            >
              {part}
            </button>
          ))}
        </div>
        {/* 新增表單 */}
        <CreateForm fetchTodos={fetchTodos} selectedPart={selectedPart} />

        {todosByPart[selectedPart] &&
          todosByPart[selectedPart].map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              delTodo={delTodo}
              toggleCompleted={toggleCompleted}
              toggleEditing={toggleEditing}
              editTodo={editTodo}
            />
          ))}
      </div>
    </div>
  );
}

export default TodoWrapper;
