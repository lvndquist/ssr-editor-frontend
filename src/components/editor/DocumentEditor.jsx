import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentEditorBar from './DocumentEditorBar.jsx';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const apiUrl = import.meta.env.VITE_API_URL;

export default function DocumentEditor() {

    const [doc, setDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [originalDoc, setOriginalDoc] = useState(null);
    const [hasChanged, setHasChanged] = useState(false);
    const [isCodeMode, setIsCodeMode] = useState(false);
    const [loadingResult, setLoadingResult] = useState(false);
    const [result, setResult] = useState("");

    const token = localStorage.getItem("authToken");

    useEffect(() => {
        fetch(`${apiUrl}/documents/${id}`, {
            headers: {
                "x-access-token": token
            }
        })
        .then((res) => {
            if (!res.ok){
                throw new Error(`HTTP ERROR: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            setOriginalDoc(data.data);
            setDoc(data.data);
            setLoading(false);
            setIsCodeMode(data.data.document.mode === "code" ? true: false);
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

        if (!doc) {
            return {
                title: "Dokument hittades ej...",
                text: `Kunde inte hitta dokument: ${id}`,
                state: "not-found",
                createdAt: "",
                updatedAt: ""
            }
        }
        return {
            title: doc.document.title,
            text: doc.document.content || "",
            state: "loaded",
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            mode: doc.document.mode
        }
    }

    useEffect(() => {
        if (!doc ||!originalDoc) {
            return;
        }

        setHasChanged (
            doc.document.title !== originalDoc.document.title ||
            doc.document.content !== originalDoc.document.content
        );
    }, [doc, originalDoc]);

    const handleChangeText = (val) => {
        setDoc(p => ({
            ...p,
            document: {
                ...p.document,
                content: val
            },
            updatedAt: new Date().toISOString()
        }));
    }

    const handleChangeTitle = (val) => {

        setDoc(p => ({
            ...p,
            document: {
                ...p.document,
                title: val
            },
            updatedAt: new Date().toISOString()
        }));
    }

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

    const content = showContent();
    return (
        <div className = "document-editor">
            <div className={`document-editor-container ${content.state}`}>
                <DocumentEditorBar
                    doc={content}
                    id={id}
                    hasChanges={hasChanged}
                    onSaved={() => { setOriginalDoc(doc) }}
                    onModeChange={setIsCodeMode}
                ></DocumentEditorBar>

                {isCodeMode ? (
                    <>
                        <CodeMirror
                            value={content.text}
                            className="code-editor"
                            height="50vh"
                            extensions={[javascript()]}
                            onChange={(val) => handleChangeText(val, "text")}
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
                            readOnly={content.state !== "loaded"}
                            onChange={(e) => handleChangeTitle(e.target.value)}
                            placeholder='Titel'
                            >
                        </input>

                        <textarea
                            className = "document-editor-text"
                            value={content.text}
                            readOnly={content.state !== "loaded"}
                            onChange={(e) => handleChangeText(e.target.value)}
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
                    </>
                )}


            </div>
        </div>
    )
}
