import { useState, useEffect } from 'react';

export default function DocumentList() {
    
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/")
            .then((res) => res.json())
            .then((data) => {
            setDocuments(data);
            setLoading(false);
        }).catch((err) => {
            console.log("Failed to fetch documents: ", err);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Laddar dokument...</p>
    }
    return (
        <div className = "document-list-container">
            {documents.map((document) => (
                <a className = "document-list-item" href={`/document/${document._id}`}>
                    <span className="document-list-item-title">
                        {document.title}
                    </span>                    
                    <span className='document-list-item-preview'>
                        <span className="document-list-item-text">
                            {document.text}
                        </span>
                    </span>

                    <span className='document-list-item-container'>
                        <span className="document-list-item-date">
                            @{document.updatedAt.slice(0, 10)}
                        </span>
                        {/* <span className="document-list-item-time">
                            {document.updatedAt.slice(11, 19)}
                        </span> */}
                    </span>
                </a>                
            ))}
        </div>
    )
}