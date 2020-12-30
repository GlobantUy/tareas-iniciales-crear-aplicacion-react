import { connectToDatabase } from '../lib/database'
const User = require('./models/user')

module.exports = async (req, res) => {
  let userSearch
  const db = await connectToDatabase()
  const collectionU = await db.collection('users')

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok')
  }
  if (req.method === 'POST') {
    try {
      if (req.body.email != undefined && req.body.email.length != 0) {
        userSearch = await collectionU.find({ email: req.body.email }).toArray()
        if (userSearch.length != 0) {
          return res.json({
            _links: {
              self: {
                href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
              }
            },
            message: 'Email belongs to an existing account'
          })
        } else {
          if (req.body.userName != undefined && req.body.userName.length != 0) {
            if (req.body.passwd != undefined && req.body.passwd.length != 0) {
              const userN = new User({
                email: req.body.email,
                userName: req.body.userName,
                passwd: req.body.passwd,
                userType: 'CUSTOMER',
                _id: req.body.email
              })
              db.collection('users').insertOne(userN)

              return res.json({
                _links: {
                  self: {
                    href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
                  }
                },
                message: 'User registered successfully'
              })
            } else {
              return res.json({
                _links: {
                  self: {
                    href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
                  }
                },
                message: "Must provide a 'passwd' property"
              })
            }
          } else {
            return res.json({
              _links: {
                self: {
                  href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
                }
              },
              message: "Must provide a 'userName' property"
            })
          }
        }
      } else {
        return res.json({
          _links: {
            self: {
              href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
            }
          },
          message: "Must provide an 'email' property"
        })
      }
    } catch {
      return res.json({
        _links: {
          self: {
            href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
          }
        },
        message: 'Internal error (004)'
      })
    }
  }
}
