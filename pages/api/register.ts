import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        }

        const { email, name, password } = req.body;

        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return res.status(422).json({ error: "Email taken" })
        }

        const hashedpassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedpassword,
        image: '',
        emailVerified: new Date(),
      }
    })

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}

//         const hashedpassword = await bcrypt.hash(password, 12)

//         const user = prismadb.user.create({
//             data: {
//                 email: email,
//                 name: name,
//                 hashedpassword: hashedpassword,
//                 image: '',
//                 emailVerified: new Date(),
//             }
//         })
//         return res.status(200).json(user);

//     } catch (error) {
//         console.log(error);
//         return res.status(400).end()
//     }
// }