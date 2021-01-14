import { connectToDatabase } from '../lib/database'

module.exports = async (req, res) => {
  let userSearch

  const db = await connectToDatabase()
  const collection = await db.collection('users')
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok')
  }
  if (req.method === 'POST') {
    try {
      userSearch = await collection.find({ email: req.body.email, passwd: req.body.passwd }).toArray()

      let conf = true
      try {
        userSearch[0].email
      } catch (err) {
        conf = false
        return res.json({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          found: 'false'

        })
      }
      if (conf == true) {
        return res.json({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          email: userSearch[0].email,
          rol: userSearch[0].userType
        })
      }
    } catch (err) {
      return res.json({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        message: 'Internal error (005)'

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
