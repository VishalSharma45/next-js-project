"use client";
import Link from "next/link";
import Logo from "../../../public/restaurant.jpg"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const RestaurantHeader = () => {
    const [details, setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        let data = localStorage.getItem("userDetails");
        if (!data && pathName === "/restaurant/dashboard") {
            router.push("/restaurant");
        } else if (data && pathName === "/restaurant") {
            router.push("/restaurant/dashboard");
        } else {
            setDetails(JSON.parse(data));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("userDetails");
        router.push("/restaurant");
    }
    return (
        <div className="header-wrapper">
            <div className="logo">
                <Image
                    src={Logo}
                    width={100}
                    height={100}
                    alt="logo"
                />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {
                    details && details.name
                        ?
                        <>
                            <li>
                                <Link href="/">Profile</Link>
                            </li>
                            <li><button onClick={logout} className="logoutBtn">Logout</button></li>
                        </>
                        :
                        <li>
                            <Link href="/">Login/Signup</Link>
                        </li>
                }
            </ul>
        </div>
    )
}

export default RestaurantHeader;