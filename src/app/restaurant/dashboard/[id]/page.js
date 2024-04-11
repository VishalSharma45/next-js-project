"use client"
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditFoodItems = (props) => {

    const router = useRouter();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        handleLoadFoodItems();
    }, []);

    const handleLoadFoodItems = async () => {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id);
        response = await response.json();

        if (response.success) {
            setName(response.result.name);
            setPrice(response.result.price);
            setDescription(response.result.description);
            setPath(response.result.img_path);
        }
    }

    const handleEditFood = async () => {

        if (!name || !price || !path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        const payload = {
            name: name,
            price: price,
            description: description,
            img_path: path
        };

        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id, {
            method: "PUT",
            body: JSON.stringify(payload)
        });

        response = await response.json();
        if (response.success) {
            router.push("../dashboard");
        }else{
            alert("Data is not updated please try again");
        }

    }
    return (
        <div className="container">
            <RestaurantHeader />
            <h1>Update Food Item🍔🌭🍤🎂🍺</h1>
            <div className="input-wrapper">
                <input className="input-field"
                    type="text"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                {error && !name && <span className="input-error">Please enter valid name</span>}
            </div>
            <div className="input-wrapper">
                <input className="input-field"
                    type="text"
                    placeholder="Enter food price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                {error && !price && <span className="input-error">Please enter valid price</span>}
            </div>
            <div className="input-wrapper">
                <input className="input-field"
                    type="text"
                    placeholder="Enter image path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)} />
                {error && !path && <span className="input-error">Please enter valid path</span>}
            </div>
            <div className="input-wrapper">
                <input className="input-field"
                    type="text"
                    placeholder="Enter food description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                {error && !description && <span className="input-error">Please enter valid description</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleEditFood}>Edit Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={() => router.push("../dashboard")}>Back to Food Lists</button>
            </div>
        </div>
    )
}

export default EditFoodItems;