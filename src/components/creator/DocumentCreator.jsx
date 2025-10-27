import { useState, useEffect } from 'react';
import DocumentCreatorBar from './DocumentCreatorBar.jsx';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function DocumentCreator() {

    const [document, setDocument] = useState(null);
    const [originalDoc, setOriginalDoc] = useState(null);
    const [hasChanged, setHasChanged] = useState(false);
    const [isCodeMode, setIsCodeMode] = useState(false);
    const [result, setResult] = useState("");
    const [loadingResult, setLoadingResult] = useState(false);

    const runCode = async () => {
        try {
            setLoadingResult(true);
            const data = {code: btoa(content.text)}

            const response = await fetch("https://execjs.emilfolino.se/code", {
                body: JSON.stringify(data),
                headers: {
                        'content-type': 'application/json'
                },
                method: 'POST'
            });

            const result = await response.json();
            const decodedAs = atob(result.data);
            setResult(decodedAs);
            setLoadingResult(false);
        } catch (e) {
            console.log(e);
            setResult("Något blev fel: ", e);
            setLoadingResult(false);
        }
    }

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
        //console.log(document.title !== originalDoc.title)
        //console.log(document.text !== originalDoc.text)
        setHasChanged (
            document.title !== originalDoc.title ||
            document.text !== originalDoc.text
        );
    }, [document, originalDoc]);

    const handleChange = (val, field) => {
        setDocument({...document, [field]: val});
    }

    const content = showContent();
    return (
        <div className = "document-editor">
            <div className={"document-editor-container"}>
                <DocumentCreatorBar
                    doc={content}
                    hasChanges={hasChanged}
                    onSaved={() => setOriginalDoc(document)}
                    onModeChange={setIsCodeMode}
                ></DocumentCreatorBar>

                {isCodeMode ? (
                    <>
                    <CodeMirror
                        value={content.text}
                        className="code-editor"
                        height="50vh"
                        extensions={[javascript()]}
                        onChange={(val) => handleChange(val, "text")}
                    />
                    <div className="code-exec">
                        <button onClick={runCode}>Kör</button>
                    </div>
                    {loadingResult ? (
                        <div className="code-result">
                            <span className="spinner-small"></span>
                        </div>
                    ) : (
                        result &&(
                            <div className="code-result">
                                <pre>{result}</pre>
                            </div>

                        )
                    )}

                    </>
                ) : (
                    <>
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
                    </>
                )}

            </div>
        </div>
    )
}
