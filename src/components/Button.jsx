import PropTypes from "prop-types";

 const typeClasses = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-300 hover:bg-gray-300",
    danger: "bg-red-600 hover:bg-red-700",
}

function Button({children, onClick, type="primary"}) {
    return(
        <button className={`${typeClasses[type]} flex gap-2 font-Poppins px-4 py-2 text-sm transition-all duration-300 focus:outline-none rounded-sm text-white`} onClick={onClick} >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["primary", "secondary", "success", "warning", "danger"]),
}

export default Button;