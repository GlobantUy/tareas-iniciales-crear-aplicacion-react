import { connectToDatabase } from '../lib/database'
const user = require('./models/user')
const db = await connectToDatabase();
const collection = await db.collection("users");
let userSearch


if (req.body.email != undefined) {
    userSearch = await collection.find({ email: req.body.email }).toArray();
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