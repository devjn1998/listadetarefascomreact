import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      const data = await response.json(); // convertendo response para json
      setTasks(data);
    };
    // fetchTasks();
  }, []);

  function onSubmitAddTask(title, description) {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
    };

    if (title.trim() === "" || description.trim() === "") {
      return alert("Preencha todos os campos!");
    }
    setTasks([...tasks, newTask]);
  }

  function onClickTask(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function deleteTaskOnClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4 ">
        <Title>Gerenciador de Tarefas</Title>
        <AddTasks onSubmitAddTask={onSubmitAddTask} />
        <Tasks
          tasks={tasks}
          onClickTask={onClickTask}
          deleteTaskOnClick={deleteTaskOnClick}
        />
      </div>
    </div>
  );
}

export default App;
