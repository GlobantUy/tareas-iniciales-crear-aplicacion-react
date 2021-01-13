import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
  let loanSearch
  let userSearch

  const db = await connectToDatabase()
  const collectionT = await db.collection('loans')
  const collectionU = await db.collection('users')
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok')
  }
  if (req.method === 'POST') {
    try {
      userSearch = await collectionU.find({ email: req.body.email }).toArray()
      loanSearch = await collectionT.find({}).toArray()
      let conf = true
      try {
        userSearch[0].email
      } catch {
        conf = false
        console.log(req.body.email)
        return res.json({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          message: 'User not found'

        })
      }

      if (conf == true) {
        if (userSearch[0].userType == 'ADMIN') {
          try {
            loanSearch[0].userName
          } catch (err) {
            conf = false
            return res.json({
              _links: {
                self: {
                  href: "https://" + req.headers.host + req.url
                }
              },
              message: 'No loans found'

            })
          }

          if (conf == true) {
            return res.json({
              _links: {
                self: {
                  href: "https://" + req.headers.host + req.url
                }
              },
              loans: loanSearch

            })
          }
        } else {
          return res.json({
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            message: 'Access denied'

          })
        }
      }
    } catch (err) {
      return res.json({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        message: 'Internal error (003)'

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
