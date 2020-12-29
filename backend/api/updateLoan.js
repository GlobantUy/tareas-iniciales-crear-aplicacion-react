import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
    let arrayTest
    let totalLoanSearch
    let trueloanSearch
    let falseloanSearch
    let total
    const db = await connectToDatabase();
    const collectionT = await db.collection("loans");
    const collectionU = await db.collection("users");
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    if (req.method === 'POST') {
        try {
            totalLoanSearch = await collectionT.find({ userName: req.body.email }).toArray();
            trueloanSearch = await collectionT.find({ userName: req.body.email, state: true }).toArray();
            falseloanSearch = await collectionT.find({ userName: req.body.email, state: false }).toArray();
            total = trueloanSearch.length + falseloanSearch.length
            if (totalLoanSearch.length == 0) {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                        }
                    },
                    message: "User has no registered loans",
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
                    })
                } else {
                    arrayTest = await collectionT.find({userName: req.body.email}).sort({date: 1}).toArray();
                   
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        result: arrayTest

                    })
                }

            }
        } catch {

        }
    }
}