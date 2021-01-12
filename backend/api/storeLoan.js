import { connectToDatabase } from '../lib/database'
const Loan = require('./models/table')

module.exports = async (req, res) => {
  let loanSearch
  let userSearch
  let conf = true
  const date = new Date()
  let i

  const db = await connectToDatabase()
  const collectionT = await db.collection('loans')
  const collectionU = await db.collection('users')
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok')
  }
  if (req.method === 'POST') {
    try {
      userSearch = await collectionU.find({ email: req.body.email }).toArray()

      if (userSearch.length != 1) {
        return res.json({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          message: 'Provided email does not belong to a registered user'
        })
      } else {
        if (isNaN(req.body.amount)) {
          return res.json({
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            message: 'Provided amount is not a number'
          })
        } else {
          if (req.body.currency != 'U$S' && req.body.currency != '$U') {
            return res.json({
              _links: {
                self: {
                  href: "https://" + req.headers.host + req.url
                }
              },
              message: 'Invalid currency type'
            })
          } else {
            if (isNaN(req.body.payments)) {
              return res.json({
                _links: {
                  self: {
                    href: "https://" + req.headers.host + req.url
                  }
                },
                message: 'Amount of payments is not a number'
              })
            } else {
             /* if (req.body.loanType == undefined || req.body.loanType.length < 4) {
                return res.json({
                  _links: {
                   self: {
                      href: "https://" + req.headers.host + req.url
                    }
                  },
                  message: "Invalid 'loanType' value"
                })
              } else {
                */
                loanSearch = await collectionT.find({ userName: req.body.email }).toArray()

                for (i = 0; i < loanSearch.length; i++) {
                  if (loanSearch[i].state == undefined) {
                    conf = false
                  }
                }

                if (conf == true && req.body.email != undefined) {
                  const dateId = new Date()
                  const day = dateId.getUTCDate()
                  const month = dateId.getUTCMonth()
                  const year = dateId.getUTCFullYear()
                  const hour = dateId.getHours()
                  const minutes = dateId.getMinutes()
                  const seconds = dateId.getSeconds()
                  const id = req.body.email + '/' + year + '/' + month + '/' + day + '|' + hour + '/' + minutes + '/' + seconds
                  const newLoan = new Loan({

                    userName: userSearch[0].name,
                    amount: req.body.amount,
                    date: date,
                    currency: req.body.currency,
                    payments: req.body.payments,
                    state: undefined,
                    stateDate: date,
                    _id: id
                  })
                  try {
                    db.collection('loans').insertOne(newLoan)

                    return res.json({
                      _links: {
                        self: {
                          href: "https://" + req.headers.host + req.url
                        }
                      },
                      message: 'Storage successful'
                    })
                  } catch {
                    return res.json({
                      _links: {
                        self: {
                          href: "https://" + req.headers.host + req.url
                        }
                      },
                      message: 'Storage fail'

                    })
                  }
                } else {
                  return res.json({
                    _links: {
                      self: {
                        href: "https://" + req.headers.host + req.url
                      }
                    },
                    message: 'The user already has a loan pending approval'

                  })
                }
             // }
            }
          }
        }
      }
    } catch (err) {
      return res.json({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        message: 'Internal error (002)'

      })
    }
  }
}
