import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordDupe, setPasswordDupe] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");

    async function handleRegisterForm(e) {
        e.preventDefault();

        if (!email || !password) {
            setError("Ange email och lösenord.");
        }

        if (password !== passwordDupe) {
            setError("Lösenord matchar inte.");
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
            if (error.message === "User already exists") {
                setError("Användare finns redan.");
            } else if (error.message === "Email or password missing") {
                setError("Du måste ange email och lösenord.");
            } else {
                setError(error.message)
            }
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
                password: password
            })
        });

        if (res?.error) {
            throw new Error({status: res.error.status, message: res.error.title})
        }

        return res.data;
    }

    return (
        <div>
            <h1>Skapa ett konto</h1>
            <form onSubmit={handleRegisterForm}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Upprepa lösenord"
                    value={passwordDupe}
                    onChange={e => setPasswordDupe(e.target.value)}
                    required
                />

                {error &&
                    <p>{error}</p>
                }
                <button type="submit"> Skapa </button>
            </form>
            <p><Link to="/login">Logga in.</Link></p>
        </div>
    );
}
