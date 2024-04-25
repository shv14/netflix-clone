import useInfoModel from "@/hooks/useInfoModel"
import useMovie from "@/hooks/useMovie"
import React from "react"
import { useState, useEffect, useCallback } from "react"
import { AiOutlineClose } from "react-icons/ai"
import PlayButton from "./PlayButton"

interface InfoModalProps {
    visible?: boolean
    onClose: any
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const [isvisible, setisvisible] = useState(!!visible);
    const { movieId } = useInfoModel()
    const { data = {} } = useMovie(movieId)
    useEffect(() => {
        setisvisible(!!visible)
    }, [visible]);

    const handleClose = useCallback(
        () => {
            setisvisible(false)
            setTimeout(() => {
                onClose()
            }, 300);
        },
        [onClose],
    );

    if (!visible) {
        return null
    }

    return (
        <div className="
        z-50
        transition
        duration-300
        bg-black
        bg-opacity-80
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        ">

            <div className="
            mx-auto
            relative
            max-w-3xl
            rounded-md
            overflow-hidden
            w-auto
            ">
                <div className={`${isvisible ? 'scale-100' : 'scale-0'} 
                transform 
                relative 
                flex-auto 
                drop-shadow-md 
                bg-zinc-900 
                duration-300`}>
                    <div className="
                    relative
                    h-96
                    ">
                        <video className="
                        w-full 
                        brightness-[60%] 
                        object-cover 
                        h-full
                        " 
                        src={data?.videoUrl} poster={data?.thumbnailUrl} autoPlay muted loop>

                        </video>

                        <div className="
                        cursor-pointer 
                        absolute
                        top-3 
                        right-3 
                        h-10 
                        w-10 
                        rounded-full 
                        bg-black 
                        bg-opacity-70 
                        flex 
                        items-center 
                        justify-center
                        " onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20}/>
                        </div>
                        <div className="
                        absolute
                        bottom-[10%]
                        left-10
                        ">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                {data?.title}
                            </p>
                            <div className="flex flex-row items-center gap-4">
                                <PlayButton movieId={data?.id}/>
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8">
                        <p className="text-green-400 font-semibold text-lg">
                            New
                        </p>
                        <p className="text-white text-lg">
                            {data?.duration}
                        </p>
                        <p className="text-white text-lg">
                            {data?.genre}
                        </p>
                        <p className="text-white text-lg">
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal