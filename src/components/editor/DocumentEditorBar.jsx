import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SaveDocument from './SaveDocument.jsx';

const apiUrl = import.meta.env.VITE_API_URL;

export default function DocumentEditorBar({doc, id, hasChanges, onSaved}) {

    const handleSave = async (doc) => {

        const token = localStorage.getItem("authToken");

        const res = await fetch(`${apiUrl}/documents/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                document: {
                    title: doc.title,
                    content: doc.text
                }
            })
        });

        if (!res.ok) {
            throw new Error("Failed to update document");
        }

        if (res.status === 204) {
            return { success: true };
        }

        return await res.json();
    };

    // console.log(hasChanges)
    return (
        <div className='document-editor-bar'>
            <Link to={"/"} className='document-editor-back-link'>
                <FontAwesomeIcon className='document-editor-back-carrot' icon={faChevronLeft}></FontAwesomeIcon>
            </Link>

            {doc.state === "loaded" ? (
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
                        disabled = {doc.state !== "loaded" || !hasChanges}
                        onSaved = {onSaved}
                    ></SaveDocument>
                </div>

            ): null}

        </div>
    )
}
