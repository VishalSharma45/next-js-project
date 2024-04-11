import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        if (!email || !password || !confirmPassword || !name || !city || !address || !contact) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        
        setLoading((prev) => !prev);
        const payload = {
            email: email,
            password: password,
            name: name,
            city: city,
            address: address,
            contact: contact
        }

        let response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify(payload)
        });
        response = await response.json();
        console.log(response);
        if (response.success) {
            setLoading((prev) => !prev);
            const { result } = response;
            delete result.password;
            localStorage.setItem("userDetails", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        }
    }

    return (
        <>
            <h3>Signup</h3>
            <div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter email id"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    {
                        error && !email && <span className="input-error">Please enter valid email</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    {
                        passwordError && <span className="input-error">Password and confirm password not match</span>
                    }
                    {
                        error && !password && <span className="input-error">Please enter valid password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                    {
                        passwordError && <span className="input-error">Password and confirm password not match</span>
                    }
                    {
                        error && !confirmPassword && <span className="input-error">Please enter valid confirm password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter restaurant name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    {
                        error && !name && <span className="input-error">Please enter valid name</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter city"
                        className="input-field"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} />
                    {
                        error && !city && <span className="input-error">Please enter valid city</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter full address"
                        className="input-field"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                    {
                        error && !address && <span className="input-error">Please enter valid address</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Enter contact no."
                        className="input-field"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)} />
                    {
                        error && !contact && <span className="input-error">Please enter valid contact</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button disabled={loading} onClick={handleSignup} className="button">Signup</button>
                </div>
            </div>
        </>
    )
}

export default RestaurantSignup;