// import { NextApiRequest, NextApiResponse } from 'next'
// import prismadb from '@/lib/prismadb';
// import serverAuth from '@/lib/serverAuth';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).end();
//     }
//     try {
//         const { currentuser } = await serverAuth(req);

//         const favoriteMovies = await prismadb.movie.findMany({
//             where:{
//                 id:{
//                     in: currentuser?.favouriteIds
//                 }
//             }
//         })
//         return res.status(200).json(favoriteMovies);
//     } catch (error) {
//         return res.status(400).json({ error: `Something went wrong: ${error}` });
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentuser } = await serverAuth(req);

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentuser?.favouriteIds,
        }
      }
    });

    return res.status(200).json(favoritedMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}