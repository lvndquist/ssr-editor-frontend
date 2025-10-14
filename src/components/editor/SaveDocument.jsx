import { useState } from 'react';

export default function SaveDocument({document, save, disabled = false, onSaved}) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState("");

    const handleSave = async () => {
        if (!document || disabled) {
            return;
        }

        setIsSaving(true);
        setSaveStatus("");

        try {
            await save(document);
            setSaveStatus("saved");
            setTimeout(() => {
                setSaveStatus("");
                onSaved();

            }, 2500);
        } catch (err) {
            console.log(err);
            setSaveStatus("error");
        } finally {
            setIsSaving(false);
        }
    }

    const buttonText = () => {
        if (isSaving) return "Sparar";
        if (saveStatus === "saved") return "Sparad";
        if (saveStatus === "error") return "Fel...";
        return "Spara";
    }

    const buttonClass = () => {
        let documentSaveClass = "document-save"
        if (isSaving) {
            documentSaveClass += " saving";
        }
        if (saveStatus === "error") {
            documentSaveClass += " error";
        }
        if (saveStatus === "saved") {
            documentSaveClass += " saved";
        }
        if (disabled) {
            documentSaveClass += " disabled";
        }
        return documentSaveClass;
    }

    return (
        <button
            onClick={handleSave}
            disabled={isSaving || disabled}
            className={buttonClass()}
        >
            {buttonText()}
        </button>
    )
}
