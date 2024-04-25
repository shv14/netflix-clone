import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }

        const { currentuser } = await serverAuth(req);

        return res.status(200).json(currentuser);
        
    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}