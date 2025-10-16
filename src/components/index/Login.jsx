import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    async function handleLoginForm(e) {
        e.preventDefault();

        if (!email || !password) {
            setError("Ange email och lösenord.");
            return;
        }

        try {
            const token = await login(email, password);
            onLogin(token);
            console.log("redirect")
            nav("/");
        } catch (error) {
            console.log(error.message)
            setError(error.message);
        }
    }

    async function login(email, password) {
        const res = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });


        const data = await res.json();
        if (!res.ok) {
            if (data.error.title === "Wrong password") {
                throw new Error("Fel lösenord!");
            }
            if (data.error.title === "User not found") {
                throw new Error("Användare hittades ej!")
            }
            throw new Error("Något blev fel!")
        }
        return data.data.token;
    }

    return (
        <div className="login-container">
            <h1 className="login-form-h1">Logga in</h1>
            <form className="login-form" onSubmit={handleLoginForm}>
                <input
                    className="login-form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    className="login-form-input"
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                {error &&
                    <p className="login-err">{error}</p>
                }
                <button className="login-form-btn" type="submit"> Logga in</button>
            </form>
            <p className="login-form-link"><Link to="/register" >Registrera ett konto</Link></p>
        </div>
    );
}
