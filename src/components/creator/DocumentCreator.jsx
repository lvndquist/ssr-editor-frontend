import { useState, useEffect } from 'react';
import DocumentCreatorBar from './DocumentCreatorBar.jsx';

export default function DocumentCreator() {
    
    const [document, setDocument] = useState(null);
    const [originalDoc, setOriginalDoc] = useState(null);
    const [hasChanged, setHasChanged] = useState(false);

    const showContent = () => {
        if (!document) {
            const blankDoc = {
                title: "",
                text: ""
            }
            setOriginalDoc(blankDoc);
            setDocument(blankDoc);
            return blankDoc;
        }
        return {
            title: document.title,
            text: document.text || "",
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
        setDocument({...document, [field]: val});
    }

    const content = showContent();
    console.log(document)
    return (
        <div className = "document-editor">
            <div className={"document-editor-container"}>
                <DocumentCreatorBar
                    doc={content}
                    hasChanges={hasChanged}
                    onSaved={() => setOriginalDoc(document)}
                ></DocumentCreatorBar>

                <input 
                    className="document-editor-title"
                    value = {content.title}
                    onChange={(e) => handleChange(e.target.value, "title")}
                    placeholder='Namnlöst dokument'
                    >
                </input>

                <textarea 
                    className = "document-editor-text"
                    value={content.text}
                    onChange={(e) => handleChange(e.target.value, "text")}
                >
                </textarea>
            </div>
        </div>
    )
}
