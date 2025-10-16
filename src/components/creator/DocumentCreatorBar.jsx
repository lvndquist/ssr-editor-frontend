import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SaveDocument from '../editor/SaveDocument.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

export default function DocumentCreatorBar({doc, hasChanges, onSaved}) {

    const handleSave = async (doc) => {
        const token = localStorage.getItem("authToken");

        const res = await fetch(`${apiUrl}/documents/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                document: {
                    title: doc.title !== "" ? doc.title : "Namnlöst Dokument",
                    content: doc.text
                }
            })
        });

        if (!res.ok) {
            throw new Error("Failed to save document");
        }

        return await res.json();
    };

    console.log(hasChanges)
    return (
        <div className='document-editor-bar'>
            <Link to={"/"} className='document-editor-back-link'>
                <FontAwesomeIcon className='document-editor-back-carrot' icon={faChevronLeft}></FontAwesomeIcon>
            </Link>

            <div className='document-editor-bar-control'>
                {hasChanges ? (
                    <>
                        <p className = "document-editor-bar-changes">Osparade ändringar</p>
                    </>
                ) :
                    <>
                        <p className = "document-editor-bar-changes">Inga osparade ändringar</p>
                    </>
                }
                <SaveDocument
                    document = {doc}
                    save = {handleSave}
                    disabled = {!hasChanges}
                    onSaved = {onSaved}
                ></SaveDocument>
            </div>


        </div>
    )
}
