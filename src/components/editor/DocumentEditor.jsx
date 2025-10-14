import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentEditorBar from './DocumentEditorBar.jsx';

const apiUrl = import.meta.env.API_URL;

export default function DocumentEditor() {

    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [originalDoc, setOriginalDoc] = useState(null);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/documents/${id}`)
        .then((res) => {
            if (!res.ok){
                throw new Error(`HTTP ERROR: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const documentData = Array.isArray(data) ? data[0] : data;
            setOriginalDoc(documentData);
            setDocument(documentData);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Failed to fetch document: ", err);
            setLoading(false);
            // setError(err);
        });
    }, [id]);

    const showContent = () => {
        if (loading) {
            return {
                title: "Laddar titel...",
                text: "Laddar innehåll...",
                state: "loading",
                createdAt: "",
                updatedAt: ""
            }
        }

        if (error) {
            return {
                title: "Fel uppstod...",
                text: `${error}`,
                state: "error",
                createdAt: "",
                updatedAt: ""
            }
        }

        if (!document) {
            return {
                title: "Dokument hittades ej...",
                text: `Kunde inte hitta dokument: ${id}`,
                state: "not-found",
                createdAt: "",
                updatedAt: ""
            }
        }

        return {
            title: document.title,
            text: document.text || "",
            state: "loaded",
            createdAt: document.createdAt,
            updatedAt: document.updatedAt
        }
    }

    useEffect(() => {
        if (!document ||!originalDoc) {
            return;
        }
        console.log(document.title !== originalDoc.title)
        console.log(document.text !== originalDoc.text)
        setHasChanged (
            document.title !== originalDoc.title ||
            document.text !== originalDoc.text
        );
    }, [document, originalDoc]);

    const handleChange = (val, field) => {
        setDocument({...document, [field]: val, updatedAt: new Date().toISOString()});
    }

    const content = showContent();

    return (
        <div className = "document-editor">
            <div className={`document-editor-container ${content.state}`}>
                <DocumentEditorBar
                    doc={content}
                    id={id}
                    hasChanges={hasChanged}
                    onSaved={() => setOriginalDoc(document)}
                ></DocumentEditorBar>

                <input
                    className="document-editor-title"
                    value = {content.title}
                    readOnly={content.state !== "loaded"}
                    onChange={(e) => handleChange(e.target.value, "title")}
                    placeholder='Titel'
                    >
                </input>

                <textarea
                    className = "document-editor-text"
                    value={content.text}
                    readOnly={content.state !== "loaded"}
                    onChange={(e) => handleChange(e.target.value, "text")}
                >
                </textarea>
                { content.createdAt && content.updatedAt ? (
                    <>
                        <p className='document-editor-date'>
                            <span>Uppdaterad </span>
                            {content.updatedAt.slice(0,10) + " " + content.updatedAt.slice(11,19)}
                        </p>
                        <p className='document-editor-date'>
                            <span>Skapad </span>
                            {content.createdAt.slice(0,10) + " " + content.createdAt.slice(11,19)}
                        </p>
                    </>
                ) : null}

            </div>
        </div>
    )
}
