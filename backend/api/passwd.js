const connectToDatabase = require('../lib/database');

module.exports.passwd = async (req, res) => {
  let userSearch

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
      dataSearch = await collection.find({ email: req.body.email, dateOfBirth: req.body.dateOfBirth }).toArray()
      let conf = true
      try {
        dataSearch[0].email
      } catch (err) {
        conf = false
        return ({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          status: 200,
          messsage: 'Provided email and date did not match any user.'

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
          passwd: dataSearch[0].dateOfBirth
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