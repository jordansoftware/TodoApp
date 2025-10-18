import { useEffect, useState } from "react";
import TodoItem from "./todoitem";
import { Construction } from "lucide-react";
import React from "react"
import LayoutAnimation from "../components/Layoutanimations";

type Priority = 'Dringend' | 'Mittel' | 'Niedrig';
type todoapp = {
  id: number,
  text: string;
  priority: Priority;
}




function App() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>('Mittel');
  const savedtodos = localStorage.getItem("todos");
  const initialtodos = savedtodos ? JSON.parse(savedtodos) : []
  const [todos, setTodos] = useState<todoapp[]>(initialtodos);
  const [filter, setFilter] = useState<Priority | "Alle">("Alle");



  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);



  function addtodo() {
    if (input.trim() == "") {
      return
    }
    const newtodo: todoapp = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }
    const newtodos = [newtodo, ...todos];
    setTodos(newtodos);
    setInput("");
    setPriority("Mittel");
    console.log(newtodos);
  }

  let filteredtodos: todoapp[] = []
  if (filter === "Alle") {
    filteredtodos = todos;
  } else {
    filteredtodos = todos.filter((todo) => todo.priority === filter);
  }

  const DringendCount = todos.filter((t) => t.priority === "Dringend").length
  const MittelCount = todos.filter((t) => t.priority === "Mittel").length
  const NiedrigCount = todos.filter((t) => t.priority === "Niedrig").length
  const totalCount = todos.length


  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set())


  function toggleSelectTodo(id: number) {
    const newSelected = new Set(selectedTodos)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedTodos(newSelected)
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false
      } else {
        return true
      }
    })

    setTodos(newTodos)
    setSelectedTodos(new Set())
  }

  return (




    <div>
     
    <div className="flex justify-center ">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Aufgabe hinzufügen"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Dringend">Dringend</option>
            <option value="Mittel">Mittel</option>
            <option value="Niedrig">Niedrig</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={addtodo}
          >

            Aufgabe hinzufügen

          </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter === "Alle" ? "btn-primary" : ""}`}
              onClick={() => setFilter("Alle")}
            >
              Alle
            </button>
            <button className={`btn btn-soft ${filter === "Dringend" ? "btn-success" : ""}`}
              onClick={() => setFilter("Dringend")}>
              Dringend
            </button>
            <button className={`btn btn-soft ${filter === "Mittel" ? "btn-warning" : ""}`}
              onClick={() => setFilter("Mittel")}>
              Mittel
            </button>
            <button className={`btn btn-soft ${filter === "Niedrig" ? "btn-info" : ""}`}
              onClick={() => setFilter("Niedrig")}>
              Niedrig
            </button>
          </div>
          {filteredtodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredtodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem
                    todo={todo}
                    isSelected={selectedTodos.has(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                    onToggleSelect={toggleSelectTodo}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-5">
              <div>
                <Construction strokeWidth={1} className="w-40 h-40 text-primary" />
              </div>
              <p className="text-sm">Keine Aufgaben für diesen Filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
      </div>

  )
}

export default App
