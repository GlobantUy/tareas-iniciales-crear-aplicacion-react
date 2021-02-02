const connectToDatabase = require('../lib/database');

module.exports.login = async (req, res) => {
  let userSearch

  const db = await connectToDatabase()
  const collection = db.collection('users');
  if (req.method === 'OPTIONS') {
    return {status: 200, ok: 'ok'};
  }
  if (req.method === 'POST') {
    try {
      userSearch = await collection.find({ email: req.body.email, passwd: req.body.passwd }).toArray()
      let conf = true
      try {
        userSearch[0].email
      } catch (err) {
        conf = false
        return ({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          status: 200,
          found: 'false'

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
          email: userSearch[0].email,
          rol: userSearch[0].userType
        })
      }
    } catch (err) {
      return ({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        status: 500,
        message: 'Internal error (005)'

      })
    }
  } else if (req.method != 'OPTIONS'){
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
