import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        foodItemList();
    }, []);

    const id = JSON.parse(localStorage.getItem("userDetails"))._id;
    const foodItemList = async () => {
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`);
        response = await response.json();
        if (response.success) {
            setFoodItems(response.result)
        } else {
            console.log("Item not available");
        }
    }

    const handleDelete = async (id) => {
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
            method: "DELETE"
        });

        response = await response.json();
        if (response.result.deletedCount > 0) {
            foodItemList();
        }
        console.log(response.result);
    }
    return (
        <div>
            <h1>Food items</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems.length > 0 && foodItems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img className="item-img" src={item.img_path} /></td>
                                <td>
                                    <button onClick={() => router.push("dashboard/" + item._id)} className="operation-btn edit-btn">Edit</button>
                                    <button className="operation-btn delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList;