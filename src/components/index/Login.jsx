import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLoginForm(e) {
        e.preventDefault();

        if (!email || !password) {
            setError("Ange email och lösenord.");
        }

        try {
            const token = await login(email, password);
            console.log(token);
            onLogin(token);
            useNavigate("/");
        } catch (error) {
            console.log(error);
            if (error.message === "User not found") {
                setError("Ingen användare hittades.");
            } else if (error.message === "Wrong password") {
                setError("Fel lösenord!");
            } else {
                setError(error.message)
            }
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

        if (res?.error) {
            throw new Error({status: res.error.status, message: res.error.title})
        }

        return data.token;
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
                    <p>{error}</p>
                }
                <button className="login-form-btn" type="submit"> Logga in</button>
            </form>
            <p className="login-form-link"><Link to="/register" >Registrera ett konto</Link></p>
        </div>
    );
}
