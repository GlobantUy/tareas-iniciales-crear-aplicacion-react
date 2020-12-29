import { connectToDatabase } from '../lib/database'
const Loan = require('./models/table')

module.exports = async (req, res) => {
    let loanSearch
    let userSearch
    let conf = true
    var date = new Date()
    var month = date.getUTCMonth() + 1; //months from 1-12
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
            userSearch = await collectionU.find({ email: req.body.email }).toArray();

            if (userSearch.length != 1) {
                return res.json({
                    _links: {
                        self: {
                            href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                        }
                    },
                    message: "Provided email does not belong to a registered user",
                })
            } else {
                if (isNaN(req.body.amount)) {
                    return res.json({
                        _links: {
                            self: {
                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                            }
                        },
                        message: "Provided amount is not a number",
                    })
                } else {

                    if (req.body.currency != "U$S" && req.body.currency != "$U") {
                        return res.json({
                            _links: {
                                self: {
                                    href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                                }
                            },
                            message: "Invalid currency type",
                        })
                    } else {
                        if (isNaN(req.body.payments)) {
                            return res.json({
                                _links: {
                                    self: {
                                        href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                                    }
                                },
                                message: "Amount of payments is not a number",
                            })
                        } else {
                            loanSearch = await collectionT.find({ userName: req.body.email }).toArray();


                            for (i = 0; i < loanSearch.length; i++) {
                                if (loanSearch[i].state == undefined) {
                                    conf = false
                                }
                            }

                            if (conf == true && req.body.email != undefined) {
                                let dateId = new Date()
                                let day = dateId.getUTCDate()
                                let month = dateId.getUTCMonth()
                                let year = dateId.getUTCFullYear()
                                let hour = dateId.getHours()
                                let minutes = dateId.getMinutes()
                                let seconds = dateId.getSeconds()
                                let id = req.body.email + "/" +year + "/" + month + "/" + day + "|" + hour + "/" + minutes + "/" + seconds
                                const newLoan = new Loan({

                                    userName: req.body.email,
                                    amount: req.body.amount,
                                    date: date,
                                    currency: req.body.currency,
                                    payments: req.body.payments,
                                    state: false,
                                    stateDate: date,
                                    _id: id 
                                })
                                try {

                                    db.collection("loans").insertOne(newLoan)

                                    return res.json({
                                        _links: {
                                            self: {
                                                href: 'https://vercelworking-ej6t36ecv.vercel.app/api/storeLoan'
                                            }
                                        },
                                        message: "Storage successful"
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

                            } else {
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
                    }
                }
            }
        } catch (err) {
            return res.status(500).json({ error: console.log("Test") })
        }
    }

}