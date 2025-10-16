import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export default function DocumentList() {

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        fetch(`${apiUrl}/documents`,{
                headers: {
                    "x-access-token": `${token}`
                }
            })
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
                <Link
                    to={`/document/${document._id}`}
                    className='document-list-item'
                    key={document._id}
                >
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
                    </span>
                </Link>
            ))}
        </div>
    )
}
