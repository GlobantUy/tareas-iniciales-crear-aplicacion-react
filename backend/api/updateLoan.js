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
      totalLoanSearch = await collectionT.find({ userName: req.body.email }).toArray()
      trueloanSearch = await collectionT.find({ userName: req.body.email, state: true }).toArray()
      falseloanSearch = await collectionT.find({ userName: req.body.email, state: false }).toArray()
      total = trueloanSearch.length + falseloanSearch.length
      if (totalLoanSearch.length == 0) {
        return res.json({
          _links: {
            self: {
              href: 'https://backendmain-bt1v07u6c.vercel.app/api/storeLoan'
            }
          },
          message: 'User has no registered loans'
        })
      } else {
        if (totalLoanSearch.length == total) {
          return res.json({
            _links: {
              self: {
                href: 'https://backendmain-bt1v07u6c.vercel.app/api/storeLoan'
              }
            },
            message: 'User has no loans pending review'
          })
        } else {
          if (req.body.state != true && req.body.state != false) {
            return res.json({
              _links: {
                self: {
                  href: 'https://backendmain-bt1v07u6c.vercel.app/api/storeLoan'
                }
              },
              message: 'Invalid state'

            })
          } else {
            arrayTest = await collectionT.find({ userName: req.body.email }).sort({ date: -1 }).toArray()
            const loanId = arrayTest[0]._id
            await collectionT.updateOne({ _id: loanId }, { $set: { state: req.body.state, stateDate: date } })
            return res.json({
              _links: {
                self: {
                  href: 'https://backendmain-bt1v07u6c.vercel.app/api/storeLoan'
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
            href: 'https://backendmain-bt1v07u6c.vercel.app/api/storeLoan'
          }
        },
        message: 'Internal error (001)'

      })
    }
  }
}
