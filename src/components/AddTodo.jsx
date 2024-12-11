import TextField from "./TextField.jsx";
import TextArea from "./TextArea.jsx";
import Button from "./Button.jsx";
import PropTypes from "prop-types";

export default function AddTodo({isVisible, todoObj={}, handleChange =[], handleSubmit, isEdit, handleEditTodo}) {

    return(
        <>
            {
                isVisible &&
                (<div className="flex flex-col gap-4 mb-4 py-6">
                    <TextField className="flex-1"
                               label="Title"
                               type="text"
                               name="title"
                               onChange={handleChange}
                               value={todoObj.title}
                    />
                    <TextArea
                        onChange={handleChange}
                        value={todoObj.description}
                        name="description"
                        label="Description"
                        rows={3}
                    ></TextArea>

                    <div className="flex justify-end">
                        {!isEdit ? <Button onClick={handleSubmit}>Save</Button> : <Button onClick={handleEditTodo}>Update</Button>  }
                    </div>
                </div> )
            }
        </>
    )
}

AddTodo.propTypes = {
    isVisible: PropTypes.bool,
    onChangeVisibility: PropTypes.func,
    todoList: PropTypes.array,
    todoObj: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    handleEditTodo: PropTypes.func,
}