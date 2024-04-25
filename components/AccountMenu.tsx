import useCurrentuser from "@/hooks/useCurrentuser"
import { signOut } from "next-auth/react"
import React from "react"
interface AccountMenuProps {
    visible?: boolean
}
const AccountMenu: React.FC<AccountMenuProps> = ({
    visible
})=> {
    const {data} = useCurrentuser()
    if (!visible) {
        return null;
    }
    return(
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800">
            <div className="flex flex-col gap-3">
                <div className="px-3 flex flex-row group/item gap-3 items-center w-full">
                    <img className="w-8n rounded-md" src="/images/defaul-blue.png" alt="" />
                    <p className="text-white text-sm group-hover/item:underline">
                        {data?.name}
                    </p>
                </div>
                <hr className="bg-gray-600 h-px my-4 border-0" />
                <div onClick={()=>signOut()} className="text-center text-white px-3 text-sm text-underline">
                    Sign out of Netflix
                </div>
            </div>

        </div>
    )
}

export default AccountMenu