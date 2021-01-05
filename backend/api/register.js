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
          if (req.body.name != undefined && req.body.name.length != 0) {
            if (req.body.lName != undefined && req.body.lName.length != 0) {
              if (req.body.dateOfBirth != undefined && req.body.dateOfBirth.length != 0) {
                if (req.body.department != undefined && req.body.department.length != 0) {
                  if (req.body.passwd != undefined && req.body.passwd.length != 0) {
                    const userN = new User({
                      name: req.body.name,
                      lName: req.body.lName,
                      dateOfBirth: req.body,dateOfBirth,
                      email: req.body.email,
                      department: req.body.department,
                      userName: req.body.name + " " + req.body.lName,
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
                      message: "Must provide a 'passwd' property and value"
                    })
                  }
                }else {
                  return res.json({
                    _links: {
                      self: {
                        href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
                      }
                    },
                    message: "Must provide a 'department' property and value"
                  })
                }
              } else {
                return res.json({
                  _links: {
                    self: {
                      href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
                    }
                  },
                  message: "Must provide a 'dateOfBirth' property and value"
                })
              }
            } else {
              return res.json({
                _links: {
                  self: {
                    href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
                  }
                },
                message: "Must provide a 'lName' property and value"
              })
            }
          } else {
            return res.json({
              _links: {
                self: {
                  href: 'https://backendmain-bt1v07u6c.vercel.app/api/register'
                }
              },
              message: "Must provide a 'name' property and value"
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
          message: "Must provide an 'email' property and value"
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
