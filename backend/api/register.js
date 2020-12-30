import { connectToDatabase } from '../lib/database'
const user = require('./models/user')


module.exports = async (req, res) => {

    let userSearch
    const db = await connectToDatabase();
    const collectionU = await db.collection("users");

    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    if (req.method === 'POST') {
        try {
            if (req.body.email != undefined) {
                userSearch = await collectionU.find({ email: req.body.email }).toArray();
                if (userSearch.length != 0) {
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        message: "Email belongs to an existing account",
                    })
                } else {
                }
            } else {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                        }
                    },
                    message: "Must provide an 'email' property"
                })
            }
        } catch {

        }
    }
}