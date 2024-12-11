import PropTypes from "prop-types";

function TextField({name, label, onChange, value, placeholder, onKeyup, type="text"}) {

    return (
        <div className="flex flex-col gap-1 flex-1 align-baseline">
            <label className="text-sm" htmlFor={label}>{label}</label>
            <input  className="border-gray-500 border-[1.5px] rounded-md px-3 py-2 text-xs" type={type} value={value} onChange={onChange} placeholder={placeholder} name={name} onKeyUp={onKeyup}/>
        </div>
    )
}

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyup: PropTypes.func,
    label: PropTypes.string,
    type: PropTypes.string,
}

export default TextField;