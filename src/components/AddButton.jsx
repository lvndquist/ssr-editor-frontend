import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function AddButton() {
    return (
        <a href = "/create" className = "add-btn">
            <FontAwesomeIcon icon = {faPlus}></FontAwesomeIcon>
        </a>
    )
}


