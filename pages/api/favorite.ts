import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method !== 'POST') {
    //     return res.status(405).end();
    // }
    try {

        if (req.method === 'POST') {
            const { currentuser } = await serverAuth(req);

            const { movieId } = req.body;

            if (typeof movieId !== 'string') {
                throw new Error('Invalid Id');
            }

            if (!movieId) {
                return res.status(400).json({ error: 'Missing movieId' });
            }

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!existingMovie) {
                throw new Error('Invalid ID');
                // return res.status(400).json({ error: 'Invalid movieId' });
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentuser.email || '',
                },
                data: {
                    favouriteIds: {
                        push: movieId
                    }
                }
            });

            return res.status(200).json(user);
        }

        if (req.method === 'DELETE') {
            const { currentuser } = await serverAuth(req);

            const {movieId} = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            const updatedFavoriteIds = without(currentuser.favouriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentuser.email || '',
                },
                data: {
                    favouriteIds: updatedFavoriteIds,
                }
            });

            return res.status(200).json(updatedUser);
        }

        return res.status(405).end();

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
        // console.error('Error handling favorite:', error);
        // return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// import { NextApiRequest, NextApiResponse } from 'next'
// import prismadb from '@/lib/prismadb';
// import serverAuth from '@/lib/serverAuth';
// import { without } from 'lodash';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         if (req.method === 'POST') {

//             const { currentuser } = await serverAuth(req);
//             const { movieId } = req.body
//             const existingMovies = await prismadb.movie.findUnique({
//                 where: {
//                     id: movieId,
//                 }
//             })

//             if (!existingMovies) {
//                 throw new Error("Invalid Id");
//             }

//             const user = await prismadb.user.update({
//                 where: {
//                     email: currentuser.email || " "

//                 },
//                 data: {
//                     favouriteIds: {
//                         push: movieId
//                     }
//                 }
//             }
//             )
//             return res.status(200).json(user);
//         }

//         if (req.method === 'DELETE') {

//             const { currentuser } = await serverAuth(req);
//             const { movieId } = req.body
//             const existingMovies = await prismadb.movie.findUnique({
//                 where: {
//                     id: movieId,
//                 }
//             })

//             if (!existingMovies) {
//                 throw new Error("Invalid Id");
//             }

//             const updatedfavoriteids = without(currentuser.favouriteIds, movieId)
//             const updateduser = await prismadb.user.update({
//                 where: {
//                     email: currentuser.email || " "

//                 },
//                 data: {
//                     favouriteIds: {
//                         push: updatedfavoriteids
//                     }
//                 }
//             }
//             )
//             return res.status(200).json(updateduser);
//         }
//         return res.status(405).end();

//     } catch (error) {
//         return res.status(400).json({ error: `Something went wrong: ${error}` });
//     }
// }