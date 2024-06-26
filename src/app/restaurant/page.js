"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";

import './style.css';

const Restaurant = () => {
    const [login, setLogin] = useState(true);
    return (
        <>
            <div className="container">
                <RestaurantHeader />
                <h1>Restaurant Login/Signup Page</h1>
                {
                    login ? <RestaurantLogin /> : <RestaurantSignup />
                }
                <div>
                    <button className="button-link" onClick={() => setLogin(!login)}>
                        {
                            login ? "Not have an account? Signup." : "Already have a account? Login."
                        }
                    </button>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Restaurant;