import PropTypes from "prop-types";


function TextArea({name, label, onChange, value, placeholder, onKeyup, cols=5, rows=5}) {


    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">{label}</label>
            <textarea className="border-gray-500 border-[1.5px] rounded-md text-xs px-3 py-2" onChange={onChange} value={value} onKeyUp={onKeyup} placeholder={placeholder}  name={name} cols={cols} rows={rows}>
            </textarea>
        </div>
    )

}

TextArea.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyup: PropTypes.func,
    cols: PropTypes.number,
    rows: PropTypes.number,
    label: PropTypes.string,
}

export default TextArea;