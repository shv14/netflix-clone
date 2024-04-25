import React, { useCallback } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import useInfoModel from "@/hooks/useInfoModel";
import { IoIosInformation } from "react-icons/io";

interface MovieCardProps {
    data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router = useRouter()
    const { openModal } = useInfoModel()
    const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
            group-hover:opacity-90
            sm:group-hover:opacity-0
            delay-300
            w-full
            h-[12vw]
            "
            onClick={redirectToWatch} src={data.thumbnailUrl} alt="Movie" draggable={false} />

            <div className="
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            invisible
            sm:visible
            delay-300
            w-full
            scale-0
            group-hover:scale-110
            group-hover:-translate-y-[6vw]
            group-hover:translate-x-[2vw]
            group-hover:opacity-100
            ">
                <img onClick={redirectToWatch} draggable={false} className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-t-md
                w-full
                h-[12vw]
                " src={data.thumbnailUrl} alt="thumbnail" />
                <div className="
                z-10
                bg-zinc-800
                p-2
                lg:p-4
                absolute
                w-full
                transition
                shadow-md
                rounded-b-md
                ">
                    <div className="flex flex-row items-center gap-3">
                        <div className="
                        cursor-pointer
                        w-6 
                        h-6
                        rounded-full
                        lg:w-10
                        lg:h-10
                        bg-white
                        justify-center
                        items-center 
                        flex
                        transition
                        hover:bg-neutral-300
                    
                        " onClick={() => router.push(`/watch/${data?.id}`)}>
                            <BsFillPlayFill size={25} />
                        </div>
                        <FavoriteButton movieId={data.id} />
                        <div
                            onClick={() => openModal(data?.id)}
                            className="
                        cursor-pointer
                        w-6 
                        h-6
                        ml-auto
                        group/item
                        rounded-full
                        border-2
                        lg:w-10
                        lg:h-10
                        justify-center
                        items-center 
                        flex
                        transition
                        hover:bg-neutral-300
                        ">
                            <IoIosInformation className="text-white" size={35}/> 
                        </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm ">{data.duration}</p>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm ">{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;