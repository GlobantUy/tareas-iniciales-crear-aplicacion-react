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
            TotalLoanSearch = await collectionT.find({ userName: req.body.email }).toArray();
            TrueloanSearch = await collectionT.find({ userName: req.body.email, state: true }).toArray();
            FalseloanSearch = await collectionT.find({ userName: req.body.email, state: false }).toArray();
            let total = TrueloanSearch.length + FalseloanSearch.length
            if (TotalLoanSearch.length == 0) {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                        }
                    },
                    message: "User has no registered loans",
                    test: loanSearch.length
                })
            } else {
                if (TotalLoanSearch.length == total) {
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        message: "User has no loans pending review",
                        test: loanSearch.length
                    })
                }

            }
        } catch {

        }
    }
}