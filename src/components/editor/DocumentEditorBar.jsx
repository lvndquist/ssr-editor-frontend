import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPaperPlane, faShareFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import SaveDocument from './SaveDocument.jsx';
import {useState} from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function DocumentEditorBar({doc, id, hasChanges, onSaved}) {
    const [toShare, setToShare] = useState(false);
    const [shareEmail, setShareEmail] = useState("");

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

    const sendInvite = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");

        const res = await fetch(`${apiUrl}/documents/${id}/share`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                mail: shareEmail
            })
        });

        if (!res.ok) {
            console.log("Couldnt send invite.")
        }

        return;
    }

    // console.log(hasChanges)
    return (
        <div className='document-editor-bar'>

            {!toShare ? (
                <Link to={"/"} className='document-editor-back-link'>
                    <FontAwesomeIcon className='document-editor-back-carrot' icon={faChevronLeft}></FontAwesomeIcon>
                </Link>
            ) : (
                <Link to="#" onClick={(e) => {e.preventDefault(); setToShare(false);}} className='document-editor-back-link'>
                    <FontAwesomeIcon className='document-editor-back-carrot' icon={faXmark}></FontAwesomeIcon>
                </Link>
            )}

            {doc.state === "loaded" ? (
                toShare ? (

                    <div className='document-editor-bar-control'>

                        <form className="share-form" onSubmit={sendInvite}>
                            <input
                                className="share-form-input"
                                type="email"
                                placeholder="Email"
                                value={shareEmail}
                                onChange={e => setShareEmail(e.target.value)}
                                required
                            />
                            <button className="share-form-btn" type="submit">
                                <FontAwesomeIcon className='document-editor-back-carrot' icon={faPaperPlane}></FontAwesomeIcon>
                            </button>
                        </form>

                    </div>

                ) : (

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

                        <Link to="#" onClick={(e) => {e.preventDefault(); setToShare(true)}} className='document-editor-share-link'>
                            <FontAwesomeIcon className='document-editor-share-icon' icon={faShareFromSquare}></FontAwesomeIcon>
                        </Link>
                        <SaveDocument
                            document = {doc}
                            save = {handleSave}
                            disabled = {doc.state !== "loaded" || !hasChanges}
                            onSaved = {onSaved}
                        ></SaveDocument>

                    </div>
                )
            ): null}

        </div>
    )
}
