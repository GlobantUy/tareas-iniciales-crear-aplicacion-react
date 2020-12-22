import { connectToDatabase } from '../lib/database'
const Loan = require('./models/table')

module.exports = async (req, res) => {
    let loanSearch
    var cDate = new Date()

    const db = await connectToDatabase();
    const collectionT = await db.collection("loans");
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    if (req.method === 'POST') {
        try {
            loanSearch = await collectionT.find({ email: req.body.email, date: req.body.date }).toArray();
            let conf = true
            try {
                loanSearch[0].date
            } catch {
                conf = false
                console.log(req.body.email)

            }

            if (conf == true) {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                        }
                    },
                    message: "The user already has a loan pending approval"

                })
            } else {
                const newLoan = new Loan({

                    userName: req.body.email,
                    amount: req.body.amount,
                    date: cDate,
                    currency: req.body.currency,
                    payments: req.body.payments,
                    state: undefined,
                    _id: req.body.userEmail + cDate
                })
                try {
                    db.collection("loans").insertOne(newLoan, function (err, res) {
                        if (err) {
                            throw err
                            console.log("Failure to insert")
                        } else {
                            return res.json({
                                _links: {
                                    self: {
                                        href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                                    }
                                },
                                message: "Mabye it worked"

                            })
                        }
                    })
                } catch {
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        message: "Storage fail"

                    })
                }

            }
        } catch (err) {
            return res.status(500).json({ error: console.log(err) })
        }
    }

}