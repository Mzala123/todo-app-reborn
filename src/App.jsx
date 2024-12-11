import AddTodo from "./components/AddTodo.jsx";
import TodoList from "./components/TodoList.jsx";
import {useState} from "react";


let nextId = 1

function App() {

  const[isVisible, setIsVisible] = useState(false);

  const[todoItems, setTodoItems] = useState([])
  const[originalTodoItems, setOriginalTodoItems] =  useState([])
  const[todo, setTodo] = useState({
        title: "",
        description: "",
        id: nextId
    });

  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState("");

  const [isEdit, setIsEdit] = useState(false);

    function toggleVisibility() {
        setIsVisible(!isVisible);
        setIsEdit(isEdit)
    }

    function handleChange(e){
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(todo.title && todo.description){
            const todoObject = {
                title: todo.title,
                description: todo.description,
                id: nextId++,
            }
            setTodoItems([...todoItems, todoObject])
            setOriginalTodoItems([...originalTodoItems, todoObject])
            toggleVisibility()
        }else{
            console.log("Fill in mandatory fields")
        }
        setTodo({
            ...todo,
            description: "",
            title: "",
        })
    }


    function handleDelete(id){
         const remainingTodoItems =  todoItems.filter(item => item.id !== id)
         setTodoItems(remainingTodoItems)
        setOriginalTodoItems(remainingTodoItems)
    }

    function handleChangeSearchText(e) {
        setSearchText(e.target.value)
    }

    function handleSearch(searchItem) {
        setIsLoading(true)
        setTimeout(()=>{
            if (!searchItem) {
                setTodoItems(originalTodoItems);
            } else {
                const foundTodos = todoItems.filter((todo) => {
                    return todo.title.toLowerCase().includes(searchItem.toLowerCase()) || todo.description.toLowerCase().includes(searchItem.toLowerCase())
                })
                setTodoItems(foundTodos)
            }
            setIsLoading(false)
        }, 1000)
    }

    function handleEditTodo(){
        toggleVisibility();
    }

    function changeToEditMode(todo){
        setTodo(todo)
        console.log(todo)
    }

  return (
    <div className="m-0 container mx-auto font-Martian bg-white h-screen p-5 lg:w-[70%] xl:w-[50%]">
        <AddTodo
            isVisible={isVisible}
            todoObj={todo}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEdit={isEdit}
            handleEditTodo={handleEditTodo}
        />
        <TodoList
            isVisible={isVisible}
            onChangeVisibility={toggleVisibility}
            isLoading={isLoading}
            todoList={todoItems}
            handleDelete={handleDelete}
            handleSearch={handleSearch}
            handleChangeSearchText={handleChangeSearchText}
            searchText={searchText}
            changeToEditMode={changeToEditMode}
        />
    </div>
  )
}

export default App
