import useCurrentuser from "@/hooks/useCurrentuser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

const Profiles = () => {
    const router = useRouter();
    const { data:user } = useCurrentuser()
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col">
                <h2 className="text-white text-3xl md:text-5xl text-center">Who's Watching</h2>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="
                            w-44
                            h-44
                            rounded-md
                            flex
                            items-center
                            justify-center
                            border-2
                            border-transparent
                            group-hover:cursor-pointer
                            group-hover:border-white
                            ">
                                <img className="rounded-md" src="images/default-blue.png" alt="" />
                            </div>
                            <div className="text-gray-400 text-2xl mt-4 text-center
                            group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profiles;