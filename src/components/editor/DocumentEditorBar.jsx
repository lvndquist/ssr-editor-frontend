import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SaveDocument from './SaveDocument.jsx';


export default function DocumentEditorBar({doc, id, hasChanges, onSaved}) {
    
    const handleSave = async (doc) => {
        const res = await fetch(`http://localhost:3000/document/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: doc.title,
                text: doc.text
            })
        });

        if (!res.ok) {
            throw new Error("Failed to update document");
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
