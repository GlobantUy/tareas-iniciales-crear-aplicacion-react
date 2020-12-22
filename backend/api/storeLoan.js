import { connectToDatabase } from '../lib/database'
const Loan = require('./models/table')

module.exports = async (req, res) => {
    let loanSearch
    let conf = true
    var date = new Date()
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var cDate = year + "/" + month + "/" + day
    var i


    const db = await connectToDatabase();
    const collectionT = await db.collection("loans");
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok');
    }
    if (req.method === 'POST') {
        try {
            loanSearch = await collectionT.find({ userName: req.body.email }).toArray();

            for (i = 0; i < loanSearch.length; i++) {
                if (loanSearch[i].state == undefined) {
                    conf = false
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        message: "The user already has a loan pending approval"

                    })
                }
            }

            if (conf == true) {
                const newLoan = new Loan({

                    userName: req.body.email,
                    amount: req.body.amount,
                    date: cDate,
                    currency: req.body.currency,
                    payments: req.body.payments,
                    state: undefined,
                    _id: req.body.email + cDate,
                    stateDate: cDate
                })
                try {
                    let conf2 = true
                    db.collection("loans").insertOne(newLoan, function (err, res) {
                        if (err) {
                            throw err,
                            conf2 = false

                        }
                    })
                    if (conf2 == true) {
                        return res.json({
                            _links: {
                                self: {
                                    href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                                }
                            },
                            message: "Mabye it worked"
                        })
                    }
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