import {Pencil, Trash2} from "lucide-react";
import TextField from "./TextField.jsx";
import Button from "./Button.jsx";
import PropTypes from "prop-types";


function TodoList({onChangeVisibility, isVisible, todoList, handleDelete, isLoading, handleSearch, handleChangeSearchText, searchText, changeToEditMode}) {

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg py-2 text-blue-950">Todo Activities</h2>
            <div className="flex gap-4 justify-between py-1 items-center">
                <TextField className="flex-1"
                   placeholder="search"
                   type="search"
                   name=""
                   onKeyup={() => handleSearch(searchText)}
                   onChange={handleChangeSearchText}
                />
                { !isVisible && <Button onClick={onChangeVisibility}> Add Todo</Button> }
            </div>

            {
                isLoading ?
                    ( <div className="text-blue-900 flex justify-center items-center text-xs">
                        <svg className="animate-ping h-3 w-3 mr-3 bg-blue-600" viewBox="0 0 24 24"></svg>
                         Fetching...
                    </div> ) :
                    (
                        <div className="flex flex-col gap-2">
                            {
                                todoList.map((todo) => {
                                    return <div key={todo.id}
                                                className="bg-slate-100 border-l-4 border-blue-700 rounded-sm p-2 flex gap-3">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <h3 className="text-[16px]">{todo.title}</h3>
                                            <p className="text-xs">{todo.description}</p>
                                        </div>
                                        <div className="text-white flex gap-2 items-end p-1">
                                            <Pencil
                                                size={18}
                                                className="stroke-blue-600 hover:cursor-pointer"
                                                onClick={()=>changeToEditMode(todo)}
                                            />
                                            <Trash2
                                                size={18}
                                                className="stroke-red-600 hover:cursor-pointer"
                                                onClick={() => handleDelete(todo.id)}
                                            />
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    )
            }

        </div>
    )
}

TodoList.propTypes = {
    onChangeVisibility: PropTypes.func,
    isVisible: PropTypes.bool,
    todoList: PropTypes.array,
    handleDelete: PropTypes.func,
    handleSearch: PropTypes.func,
    isLoading: PropTypes.bool,
    handleChangeSearchText: PropTypes.func,
    searchText: PropTypes.string,
    changeToEditMode: PropTypes.func,
}

export default TodoList;