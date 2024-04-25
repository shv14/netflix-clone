import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
// import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

import useCurrentuser from '@/hooks/useCurrentuser';
import useFavorites from '@/hooks/useFavorites';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';

interface FavoriteButtonProps {
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    
    const { data: currentuser, mutate } = useCurrentuser();

    const isFavorite = useMemo(() => {
        const list = currentuser?.favouriteIds || [];

        return list.includes(movieId);
    }, [currentuser, movieId]);
    
    // console.log(isFavorite)
    
    // const isFavorite = currentuser?.favouriteIds?.includes(movieId) || false;
    
    const toggleFavorites = useCallback(async () => {
        let response;
        try {
            if (isFavorite) {
                response = await axios.delete('/api/favorite', { data: { movieId } });
            } else {
                response = await axios.post('/api/favorite', { movieId });
            }
        } catch (error) {
            console.log(error)
        }

        const updatedFavoriteIds = response?.data?.favouriteIds;

        mutate({
            ...currentuser,
            favouriteIds: updatedFavoriteIds,
        });
        mutateFavorites();
    }, [movieId, isFavorite, currentuser, mutate, mutateFavorites]);

    // const toggleFavorites = useCallback(async () => {
    //     try {
    //         let response;
    //         if (isFavorite) {
    //             response = await axios.delete('/api/favorite', { data: { movieId } });
    //         } else {
    //             response = await axios.post('/api/favorite', { movieId });
    //         }

    //         const updatedFavoriteIds = response?.data?.favouriteIds;

    //         mutate({
    //             ...currentuser,
    //             favouriteIds: updatedFavoriteIds,
    //         });
    //         mutateFavorites();
    //     } catch (error) {
    //         console.error('Error toggling favorites:', error);
    //         // Handle error gracefully, e.g., show a toast notification
    //     }
    // }, [movieId, isFavorite, currentuser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
        </div>
    )
}

export default FavoriteButton;


// import useCurrentuser from "@/hooks/useCurrentuser";
// import useFavorites from "@/hooks/useFavorites"
// import axios from "axios";
// import { useCallback, useMemo } from "react";
// import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai"

// interface FavoriteButtonProps {
//     movieId: string
// }

// const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
//     const { mutate: mutateFavorites } = useFavorites();
//     const { data: currentuser, mutate } = useCurrentuser();

//     const isfavorite = useMemo(() => {
//         const list = currentuser?.favouriteIds || []
//         return list.includes(movieId)
//     }, [currentuser, movieId]);

//     const togglefavorites = useCallback(async () => {
//             let response;
//             if (isfavorite) {
//                 response = await axios.delete('/api/favorite', { data: { movieId } })
//             } else {
//                 response = await axios.post('/api/favorite', {movieId})
//             }

//             const updatedfavoriteIds = response?.data?.favouriteIds;

//             mutate({
//                 ...currentuser,
//                 favouriteIds: updatedfavoriteIds
//             })
//             mutateFavorites();
//         },[movieId, isfavorite, currentuser, mutate, mutateFavorites],);

//     const Icon = isfavorite?AiOutlineCheck:AiOutlinePlus;

//     return (
//         <div
//         onClick={togglefavorites} className="cursor-pointer
//         group/item
//         h-6
//         w-6
//         lg:w-10
//         lg:h-10
//         border-white
//         border-2
//         rounded-full
//         flex
//         justify-center
//         items-center
//         transition
//         hover:border-neutral-300">
//             <Icon className="text-white" size={25} />
//         </div>
//     )

// }

// export default FavoriteButton