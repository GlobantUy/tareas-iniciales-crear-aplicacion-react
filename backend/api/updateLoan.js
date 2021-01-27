import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
  let arrayTest
  let totalLoanSearch
  let trueloanSearch
  let falseloanSearch
  let total
  const db = await connectToDatabase()
  const collectionT = await db.collection('loans')
  const date = new Date()
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok')
  }
  if (req.method === 'POST') {
    if (req.body.data == undefined || req.body.data.length == 0) {
      return res.status(403).json({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        message: 'Must provide an array named data whose length must be greater than 0. Each object must have an email and state property'
      })
    } else {
      var i
      var x
      let conf = true
      let errorPosition
      for (i = 0; i < req.body.data.length; i++) {
        for (x = 0; x < req.body.data.length; x++) {
          if (req.body.data[x].email == undefined || req.body.data[x].state == undefined || (req.body.data[x].state != true && req.body.data[x].state != false)) {
            conf = false
            errorPosition = x
          }
        }
        if (conf == true) {
          try {
            totalLoanSearch = await collectionT.find({ userEmail: req.body.data[i].email }).toArray()
            trueloanSearch = await collectionT.find({ userEmail: req.body.data[i].email, state: true }).toArray()
            falseloanSearch = await collectionT.find({ userEmail: req.body.data[i].email, state: false }).toArray()
            total = trueloanSearch.length + falseloanSearch.length
            if (totalLoanSearch.length == 0) {
              return res.status(403).json({
                _links: {
                  self: {
                    href: "https://" + req.headers.host + req.url
                  }
                },
                message: 'User ' + req.body.data[i].email + ' has no registered loans'
              })
            } else {
              if (totalLoanSearch.length == total) {
                return res.status(403).json({
                  _links: {
                    self: {
                      href: "https://" + req.headers.host + req.url
                    }
                  },
                  message: 'User ' + req.body.data[i].email + ' has no loans pending review'
                })
              } else {
                if (req.body.state != true && req.body.state != false) {
                  return res.status(400).json({
                    _links: {
                      self: {
                        href: "https://" + req.headers.host + req.url
                      }
                    },
                    message: 'Invalid state for ' + req.body.data[i].email + ' / ' + req.body.data[i].state

                  })
                } else {
                  arrayTest = await collectionT.find({ userEmail: req.body.email }).sort({ date: -1 }).toArray()
                  const loanId = arrayTest[0]._id
                  await collectionT.updateOne({ _id: loanId }, { $set: { state: req.body.state, stateDate: date } })
                  return res.json({
                    _links: {
                      self: {
                        href: "https://" + req.headers.host + req.url
                      }
                    },
                    message: 'Loan state modified successfully'

                  })
                }
              }
            }
          } catch {
            return res.status(500).json({
              _links: {
                self: {
                  href: "https://" + req.headers.host + req.url
                }
              },
              message: 'Internal error (001)'

            })
          }
        } else {
          return res.status(400).json({
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            message: 'Invalid value for state or email in array at position ' + errorPosition

          })
        }
      }
    }
  } else if (req.method != 'OPTIONS') {
    return res.status(405).json({
      _links: {
        self: {
          href: "https://" + req.headers.host + req.url
        }
      },
      message: 'Invalid method:' + ' "' + req.method + '"'

    })
  }
}
