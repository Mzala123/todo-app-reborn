import AddTodo from "./components/AddTodo.jsx";
import TodoList from "./components/TodoList.jsx";
import {useReducer, useState} from "react";


let nextId = 1

function App() {

  const[isVisible, setIsVisible] = useState(false);

  const[todoItems, dispatch] = useReducer(todoDispatch,[])
  const[originalTodoItems, dispatcher] =  useReducer(todoDispatch,[])


  const[todo, setTodo] = useState({
        title: "",
        description: "",
        id: null
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

    function handleSubmit(e, todoObj){
        e.preventDefault();
        if(todo.title && todo.description){
              todoObj = {
                 title: todo.title,
                 description: todo.description,
                 id: nextId++
             }
            dispatch(
                {
                    type: "added",
                    payload: todoObj
                })

            dispatcher(
                {
                    type: "added",
                    payload: todoObj
                }
            )
        }else{
            console.log("Fill in the mandotory fields")
        }

        setTodo(
            {
                ...todoObj,
                description: "",
                title: ""
            }
        )

    }


    function handleDelete(id){
        dispatch({
            type: "deleted",
            id: id
        })
    }



    function handleChangeSearchText(e) {
        setSearchText(e.target.value)
    }

    function handleSearch(searchItem) {
      setIsLoading(true)
        setTimeout(()=>{
            dispatch(
                {
                    type: "search",
                    searchItem: searchItem,
                    originalItems : originalTodoItems
                }
            )
            setIsLoading(false)
        }, 1000)

    }

    function handleEditTodo(todoObj){
        dispatch(
            {
                type: "edited",
                payload: todoObj
            }
        )

        dispatcher(
            {
                type: "edited",
                payload: todoObj
            }
        )

        setTodo(
            {
                ...todoObj,
                description: "",
                title: ""
            }
        )

        setIsVisible(false)
        setIsEdit(false)
    }




    function changeToEditMode(todo){
        setTodo(todo)
        setIsEdit(true)
        setIsVisible(true)
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
            isEdit={isEdit}
        />
    </div>
  )
}

export default App


function todoDispatch(todoItems, action){
    switch(action.type){
        case "added":
        {
            return  [
                ...todoItems,
                action.payload
            ]
        }
        case "edited":
        {
            return todoItems.map((item) => {
                if(item.id === action.payload.id){
                    return action.payload
                }else{
                    return item
                }
            })
        }
        case "deleted":
        {
            return todoItems.filter((todo)=>{
                return todo.id !== action.id
            })
        }
        case "search":
        {
            if(!action.searchItem){
                return action.originalItems;
            }else{
                return  todoItems.filter((todo) => {
                    return todo.title.toLowerCase().includes(action.searchItem.toLowerCase()) ||
                        todo.description.toLowerCase().includes(action.searchItem.toLowerCase())
                })
            }
        }
    }

}
