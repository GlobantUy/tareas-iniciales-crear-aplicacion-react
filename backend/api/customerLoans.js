const connectToDatabase = require('../lib/database');

module.exports.customer = async (req, res) => {
    let loanSearch
    
    let userSearch

    const db = await connectToDatabase()
    const collectionT = await db.collection('loans')
    const collectionU = await db.collection('users')
    if (req.method === 'OPTIONS') {
        return {status: 200, ok: 'ok'};
    }
    if (req.method === 'POST') {
        try {
            userSearch = await collectionU.find({ email: req.body.email }).toArray()
            loanSearch = await collectionT.find({ userEmail: req.body.email}).toArray()
            let conf = true
            try {
                userSearch[0].email
            } catch {
                conf = false;
                return ({
                    _links: {
                        self: {
                            href: "https://" + req.headers.host + req.url
                        }
                    },
                    status: 404,
                    message: 'User not found'
                })
            }

            if (conf == true) {

                try {
                    loanSearch[0].userName
                } catch (err) {
                    conf = false
                    return ({
                        _links: {
                            self: {
                                href: "https://" + req.headers.host + req.url
                            }
                        },
                        status:200,
                        message: 'No loans found'

                    })
                }

                if (conf == true) {
                    return ({
                        _links: {
                            self: {
                                href: "https://" + req.headers.host + req.url
                            }
                        },
                        status: 200,
                        loans: loanSearch

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
                message: 'Internal error (003)'

            })
        }
    } else if (req.method != 'OPTIONS') {
        return ({
            _links: {
                self: {
                    href: "https://" + req.headers.host + req.url
                }
            },
            status: 405,
            message: 'Invalid method:' + ' "' + req.method + '"'

        })
    }
}
