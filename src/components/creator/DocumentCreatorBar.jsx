import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SaveDocument from '../editor/SaveDocument.jsx';

export default function DocumentCreatorBar({doc, hasChanges, onSaved}) {
    
    const handleSave = async (doc) => {
        const res = await fetch("https://jsramverk-texteditor-jolq24-fthwemdtfvcrfehy.swedencentral-01.azurewebsites.net/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: doc.title !== "" ? doc.title : "Namnlöst Dokument",
                text: doc.text
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
