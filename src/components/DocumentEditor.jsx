import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DocumentEditor() {
    
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/document/${id}`)
        .then((res) => {
            if (!res.ok){
                throw new Error("HTTP ERROR: ", res.status);
            }
            return res.json();
        })
        .then((data) => {
            const documentData = Array.isArray(data) ? data[0] : data;
            setDocument(documentData);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Failed to fetch document: ", err);
            setLoading(false);
        });
    }, [id]);

    const showContent = () => {
        if (loading) {
            return {
                title: "Laddar titel...",
                text: "Laddar innehåll...",
                state: "loading"
            } 
        }

        if (error) {
            return {
                title: "Fel uppstod...",
                text: `${error}`,
                state: "error"
            }     
        }

        if (!document) {
            return {
                title: "Dokument hittades ej...",
                text: `Kunde inte hitta dokument: ${id}`,
                state: "not-found"
            }   
        }

        return {
            title: document.title || "Namnlöst dokument",
            text: document.text || "",
            state: "loaded"
        }   
    }

    const handleChange = (val, field) => {
        setDocument({...document, [field]: val});
    }

    const content = showContent();


    console.log(!loading && !error && document)
    console.log(error)
    console.log(loading)
    console.log(document)
    console.log(content.state)

    return (
        <div className = "document-editor">
            <div className={`document-editor-container ${content.state}`}>
                <input 
                    className="document-editor-title"
                    value = {content.title}
                    readOnly={content.state !== "loaded"}
                    onChange={(e) => handleChange(e.target.value, "title")}
                    >
                </input>
                <textarea 
                    className = "document-editor-text"
                    value={content.text}
                    readOnly={content.state !== "loaded"}
                    onChange={(e) => handleChange(e.target.value, "text")}
                >
                </textarea>
            </div>
        </div>
    )
}