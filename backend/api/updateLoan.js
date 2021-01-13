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
    try {
      totalLoanSearch = await collectionT.find({ userEmail: req.body.email }).toArray()
      trueloanSearch = await collectionT.find({ userEmail: req.body.email, state: true }).toArray()
      falseloanSearch = await collectionT.find({ userEmail: req.body.email, state: false }).toArray()
      total = trueloanSearch.length + falseloanSearch.length
      if (totalLoanSearch.length == 0) {
        return res.json({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          message: 'User has no registered loans'
        })
      } else {
        if (totalLoanSearch.length == total) {
          return res.json({
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            message: 'User has no loans pending review'
          })
        } else {
          if (req.body.state != true && req.body.state != false) {
            return res.json({
              _links: {
                self: {
                  href: "https://" + req.headers.host + req.url
                }
              },
              message: 'Invalid state'

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
      return res.json({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        message: 'Internal error (001)'

      })
    }
  } else if (req.method != 'OPTIONS'){
    return res.json({
      _links: {
        self: {
          href: "https://" + req.headers.host + req.url
        }
      },
      message: 'Invalid method:' + ' "' + req.method + '"'

    })
  }
}
