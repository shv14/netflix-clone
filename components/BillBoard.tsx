import useBillBoard from "@/hooks/useBillBoard";
import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModel from "@/hooks/useInfoModel";

const BillBoard = () => {
    const { data } = useBillBoard();
    const {openModal} = useInfoModel()
    const handleModal = useCallback(
      () => {
        openModal(data?.id)
      },
      [openModal, data?.id],
    );
    return (
        <div className="relative h-[56.25vw]">
            <video className="h-[56.25vw] w-full object-cover brightness-[60%]" loop autoPlay muted poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">{data?.title}</p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 h-full w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">{data?.description}</p>
                <div className="mt-3 flex flex-row md:mt-4 gap-3 items-center">
                    <PlayButton movieId={data?.id}/>
                    <button onClick={handleModal} className="text-white bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
                        <AiOutlineInfoCircle className="mr-1" />
                        More Info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BillBoard