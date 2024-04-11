import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        let payload = {
            email: email,
            password: password,
            login: true
        };
        let response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        response = await response.json();
        if (response.result) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("userDetails", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        } else {
            alert("Login failed");
        }
    }
    return (
        <>
            <h3>Login</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text"
                        placeholder="Enter email id" className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    {
                        error && !email && <span className="input-error">Please enter valid email</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input type="password"
                        placeholder="Enter password" className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    {
                        error && !password && <span className="input-error">Please enter valid password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button onClick={handleLogin} className="button">Login</button>
                </div>
            </div>
        </>
    )
}

export default RestaurantLogin;