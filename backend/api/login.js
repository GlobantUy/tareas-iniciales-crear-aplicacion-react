import { connectToDatabase } from '../lib/database'
const cors = require('cors')


module.exports = async (req, res) => {
    let userSearch


    const db = await connectToDatabase();
    const collection = await db.collection("users");
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    if (req.method === 'POST') {
        try {

            userSearch = await collection.find({ email: req.body.email, passwd: req.body.passwd }).toArray();

            let conf = true
            try {
                userSearch[0].email

            } catch (err) {
                conf = false;
                return res.json({
                    _links: {
                        self: {
                            href: 'https://backendmain-bt1v07u6c.vercel.app/api/login'
                        }
                    },
                    found: "false"

                })
            }
            if (conf == true) {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://backendmain-bt1v07u6c.vercel.app/api/login'
                        }
                    },
                    email: userSearch[0].email,
                    rol: userSearch[0].userType
                })
            }


        } catch (err) {
            return res.status(500).json({ error: console.log(err) })
        }
    }



}