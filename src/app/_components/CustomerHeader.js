import Logo from "../../../public/restaurant.jpg"
import Image from "next/image";
import Link from "next/link";

const CustomerHeader = () => {
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
                    <Link href="/">Cart(0)</Link>
                </li>
                <li>
                    <Link href="/">Add Restaurant</Link>
                </li>
            </ul>
        </div>
    )
}

export default CustomerHeader;