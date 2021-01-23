import React from "react";

function Button(props) {
    return (
        <button>
            { props.children}
        </button>
    )
}

export { Button };