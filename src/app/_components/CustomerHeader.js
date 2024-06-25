import Logo from "../../../public/restaurant.jpg"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {

    const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const [cartNumber, setCartNumber] = useState(cartStorage?.length);
    const [cartItem, setCartItem] = useState(cartStorage);

    useEffect(() => {
        if (props.cartData) {
            if (cartNumber) {
                if (cartItem[0]?.resto_id != props.cartData.resto_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cartData]);
                    localStorage.setItem("cart", JSON.stringify([props.cartData]));
                } else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber + 1);
                    localStorage.setItem('cart', JSON.stringify(localCartItem));
                }
            } else {
                setCartNumber(1);
                setCartItem([props.cartData]);
                localStorage.setItem("cart", JSON.stringify([props.cartData]));
            }
        }
    }, [props.cartData]);

    useEffect(() => {
        if (props.removeFromCart) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != props.removeFromCart
            });
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem))
            if (localCartItem.length == 0) {
                localStorage.removeItem('cart')
            }
        }
    }, [props.removeFromCart]);
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
                <li>
                    <Link href="/">Login</Link>
                </li>
                <li>
                    <Link href="/">SignUp</Link>
                </li>
                <li>
                    <Link href="/">Cart({cartNumber ? cartNumber : 0})</Link>
                </li>
                <li>
                    <Link href="/">Add Restaurant</Link>
                </li>
            </ul>
        </div>
    )
}

export default CustomerHeader;