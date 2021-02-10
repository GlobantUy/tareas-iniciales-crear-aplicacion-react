const connectToDatabase = require('../lib/database');
const User = require('./models/user');

module.exports.register = async (req, res) => {
  let userSearch
  const db = await connectToDatabase()
  const collectionU = await db.collection('users')
  if (req.method === 'OPTIONS') {
    return ({status:200, ok: 'ok'});
  }
  if (req.method === 'POST') {
    try {
      if (req.body.email != undefined && req.body.email.length != 0) {
        userSearch = await collectionU.find({ email: req.body.email }).toArray()
        if (userSearch.length != 0) {
          return ({
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status: 200,
            message: 'Email belongs to an existing account.'
          })
        } else {
          if (req.body.name != undefined && req.body.name.length != 0) {
            if (req.body.lName != undefined && req.body.lName.length != 0) {
              if (req.body.dateOfBirth != undefined && req.body.dateOfBirth.length != 0) {
                if (req.body.department != undefined && req.body.department.length != 0) {
                  if (req.body.passwd != undefined && req.body.passwd.length != 0) {
                    if (req.body.gender != undefined && req.body.gender.length != 0) {
                      if (req.body.preferences != undefined && req.body.preferences.length != 0) {
                        const userN = new User({
                          name: req.body.name,
                          lName: req.body.lName,
                          dateOfBirth: req.body.dateOfBirth,
                          email: req.body.email,
                          department: req.body.department,
                          gender: req.body.gender,
                          preferences: req.body.preferences,
                          userName: req.body.name + ' ' + req.body.lName,
                          passwd: req.body.passwd,
                          userType: 'CUSTOMER',
                          _id: req.body.email
                        })
                        db.collection('users').insertOne(userN)

                        return ({
                          _links: {
                            self: {
                              href: "https://" + req.headers.host + req.url
                            }
                          },
                          status: 200,
                          message: 'User registered successfully.'
                        })
                      } else {
                        return ({
                          _links: {
                            self: {
                              href: "https://" + req.headers.host + req.url
                            }
                          },
                          status: 400,
                          message: "Must provide a 'preferences' property and value."
                        })
                      }
                    } else {
                      return ({
                        _links: {
                          self: {
                            href: "https://" + req.headers.host + req.url
                          }
                        },
                        status: 400,
                        message: "Must provide a 'gender' property and value."
                      })
                    }
                  } else {
                    return ({
                      _links: {
                        self: {
                          href: "https://" + req.headers.host + req.url
                        }
                      },
                      status: 400,
                      message: "Must provide a 'passwd' property and value."
                    })
                  }
                } else {
                  return ({
                    _links: {
                      self: {
                        href: "https://" + req.headers.host + req.url
                      }
                    },
                    status: 400,
                    message: "Must provide a 'department' property and value."
                  })
                }
              } else {
                return ({
                  _links: {
                    self: {
                      href: "https://" + req.headers.host + req.url
                    }
                  },
                  status: 400,
                  message: "Must provide a 'dateOfBirth' property and value."
                })
              }
            } else {
              return ({
                _links: {
                  self: {
                    href: "https://" + req.headers.host + req.url
                  }
                },
                status: 400,
                message: "Must provide a 'lName' property and value."
              })
            }
          } else {
            return ({
              _links: {
                self: {
                  href: "https://" + req.headers.host + req.url
                }
              },
              status: 400,
              message: "Must provide a 'name' property and value."
            })
          }
        }
      } else {
        return ({
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          status: 400,
          message: "Must provide an 'email' property and value."
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
        message: 'Internal server error (005).'
      })
    }
  } else if (req.method != 'OPTIONS'){
    return ({
      _links: {
        self: {
          href: "https://" + req.headers.host + req.url
        }
      },
      status: 405,
      message: 'Invalid method:' + ' "' + req.method + '"'

    })
  }
}
