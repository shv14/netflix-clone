import React from "react"
import { useRouter } from "next/router";

interface NavbarItemProps{
    label: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label
}) => {
    const router = useRouter()
    return (
        <div onClick={() => label=="Home"?router.push("/"):router.push(`/page/${label}`)} className="text-white transition cursor-pointer hover:text-gray-400">
            {label}
        </div>
    )
}

export default NavbarItem;