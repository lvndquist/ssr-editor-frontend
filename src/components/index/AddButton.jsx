import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

export default function AddButton() {
    return (
        <Link
            to={"/create"}
            className= "add-btn"
        >
            <FontAwesomeIcon icon = {faPlus}></FontAwesomeIcon>
        </Link>
    )
}


