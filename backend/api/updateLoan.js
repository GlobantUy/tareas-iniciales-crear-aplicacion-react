import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
    let loanSearch



    const db = await connectToDatabase();
    const collectionT = await db.collection("loans");
    const collectionU = await db.collection("users");
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    if (req.method === 'POST') {
        try {
            let totalLoanSearch = await collectionT.find({ userName: req.body.email }).toArray();
            let trueloanSearch = await collectionT.find({ userName: req.body.email, state: true }).toArray();
            let falseloanSearch = await collectionT.find({ userName: req.body.email, state: false }).toArray();
            let total = trueloanSearch.length + falseloanSearch.length
            if (totalLoanSearch.length == 0) {
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
                if (totalLoanSearch.length == total) {
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        message: "User has no loans pending review",
                        test: loanSearch.length
                    })
                } else {
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        message: "IDK"

                    })
                }

            }
        } catch {

        }
    }
}