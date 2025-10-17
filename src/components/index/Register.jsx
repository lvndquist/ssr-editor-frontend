import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Register() {
    const location = useLocation();
    const inv = new URLSearchParams(location.search).get("inv");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordDupe, setPasswordDupe] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");

    async function handleRegisterForm(e) {
        e.preventDefault();

        if (!email || !password) {
            setError("Ange email och lösenord.");
            return;
        }

        if (password !== passwordDupe) {
            setError("Lösenord matchar inte.");
            return;
        }

        try {
            const data = await register(email, password);
            if (data.message === "User successfully registered") {
                setEmail("");
                setPassword("");
                setPasswordDupe("");
                setStatus("Användare skapad. Du kan nu logga in.")
            }
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }

    async function register(email, password) {
        const res = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                invite: inv
            })
        });


        const data = await res.json();
        if (!res.ok) {
            if (data.error.title === "User already exists") {
                throw new Error("Användaren finns redan!");
            } else if (data.error.title === "Email or password missing") {
                throw new Error("Användarnamn och lösenord krävs.");
            } else {
                throw new Error("Något blev fel!")
            }
        }
        return data;
    }

    return (
        <div className="register-container">
            <h1 className="register-form-h1">Skapa ett konto</h1>
            <form className="register-form" onSubmit={handleRegisterForm}>
                <input
                    className="register-form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    className="register-form-input"
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <input
                    className="register-form-input"
                    type="password"
                    placeholder="Upprepa lösenord"
                    value={passwordDupe}
                    onChange={e => setPasswordDupe(e.target.value)}
                    required
                />

                {error &&
                    <p className="register-form-err">{error}</p>
                }
                <button className="register-form-btn" type="submit"> Skapa </button>
            </form>
            <p className="register-form-link"><Link to="/login">Logga in</Link></p>
        </div>
    );
}
