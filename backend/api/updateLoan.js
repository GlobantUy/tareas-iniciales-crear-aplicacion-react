import { connectToDatabase } from '../lib/database'
const Loan = require('./models/table')

module.exports = async (req, res) => {
    let loanSearch
    let userSearch
    let conf = true
    var date = new Date()
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var cDate = year + "/" + month + "/" + day
    var i


    const db = await connectToDatabase();
    const collectionT = await db.collection("loans");
    const collectionU = await db.collection("users");
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    if (req.method === 'POST') {
        try {
            loanSearch = await collectionT.find({email: req.body.email, state: undefined}).toArray();

            if (loanSearch.length != 1) {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                        }
                    },
                    message: "User has no loans pending review",
                    test: loanSearch.length
                })
            }else {

            }
        } catch {

        }
    }
}