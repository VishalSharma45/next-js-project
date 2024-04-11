"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import "./../style.css"
import AddFoodItems from "@/app/_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);

    return (
        <div>
            <RestaurantHeader />
            <div style={{ padding: "20px 50px" }} className="container">
                <div>
                    <button className={addItem ? `dashboard-btn active` : `dashboard-btn`} onClick={() => setAddItem(true)}>Add Food😋</button>
                    {" "}
                    <button className={!addItem ? `dashboard-btn active` : `dashboard-btn`} onClick={() => setAddItem(false)}>Dashboard📑</button>
                </div>
                {
                    addItem
                        ? <AddFoodItems setAddItem={setAddItem} />
                        : <FoodItemList />
                }
            </div>
        </div>
    )
}

export default Dashboard;