const connectToDatabase = require('../lib/database');

module.exports.passwd = async (req, res) => {
    let dateSearch
    let emailSearch = []
    const db = await connectToDatabase()
    const collection = db.collection('users');
    if (req.method === 'OPTIONS') {
        return { status: 200, ok: 'ok' };
    }
    if (req.method === 'POST') {

        if (req.body.email === undefined) {
            return ({
                _links: {
                    self: {
                        href: "https://" + req.headers.host + req.url
                    }
                },
                status: 400,
                message: "No value for 'email' was provided."

            })
        }
        if (req.body.dateOfBirth === undefined) {
            return ({
                _links: {
                    self: {
                        href: "https://" + req.headers.host + req.url
                    }
                },
                status: 400,
                message: "No value for 'dateOfBirth' was provided."

            })
        }
        try {
            emailSearch = await collection.find({ email: req.body.email }).toArray()
            let conf = true
            try {
                emailSearch[0].email
            } catch (err) {
                conf = false
                return ({
                    _links: {
                        self: {
                            href: "https://" + req.headers.host + req.url
                        }
                    },
                    status: 200,
                    messsage: 'Provided email did not match any user.'

                })
            }
            if (conf == true) {
                dateSearch = await collection.find({ email: req.body.email }).toArray()
                let day = dateSearch[0].dateOfBirth.getUTCDate()
                let month = dateSearch[0].dateOfBirth.getUTCMonth() + 1
                let year = dateSearch[0].dateOfBirth.getUTCFullYear()
                let dateOfBirthReq = day + "-" + month + "-" + year
                if (req.body.dateOfBirth === dateOfBirthReq) {

                    return ({
                        _links: {
                            self: {
                                href: "https://" + req.headers.host + req.url
                            }
                        },
                        status: 200,
                        passwd: emailSearch[0].passwd
                    })
                } else {
                    return ({
                        _links: {
                            self: {
                                href: "https://" + req.headers.host + req.url
                            }
                        },
                        status: 200,
                        message: "Value of 'dateOfBirth' did not match." 
                    })
                }
            }
        } catch (err) {
            return ({
                _links: {
                    self: {
                        href: "https://" + req.headers.host + req.url
                    }
                },
                status: 500,
                message: 'Internal error (005).'

            })
        }
    } else if (req.method != 'OPTIONS') {
        return ({
            _links: {
                self: {
                    href: "https://" + req.headers.host + req.url
                }
            },
            status: 400,
            message: 'Invalid method:' + ' "' + req.method + '"'

        })
    }
}