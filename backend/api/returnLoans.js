const connectToDatabase = require('../lib/database');
const user = require('./models/user');

module.exports.returnLoans = async (req, res) => {
  let loanSearch
  let userSearch

  const db = await connectToDatabase()
  const collectionT = db.collection('loans')
  const collectionU = db.collection('users')
  if (req.method === 'OPTIONS') {
    return { status: 200, ok: 'ok' };
  }
  if (req.method === 'POST') {
    userSearch = await collectionU.find({ email: req.body.email }).toArray()
    if (userSearch.length === 0) {
      return ({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        status: 200,
        message: 'User not found'
      });
    }
    const type = userSearch[0].userType;
    switch (type) {
      case 'ADMIN':

        loanSearchAdm = await collectionT.find({}).toArray()
        if (loanSearchAdm.length === 0) {
          output = {
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status: 200,
            loans: "No loans found"

          };
        } else {
          output = {
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status: 200,
            loans: loanSearchAdm

          };
        }

        break;

      case 'CUSTOMER':
        loanSearchCust = await collectionT.find({ userEmail: req.body.email }).toArray()
        if (loanSearchCust.length === 0) {
          output = {
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status: 200,
            message: "User has no registered loans"

          };
        } else {
          output = {
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status: 200,
            loans: loanSearchCust

          };
        }

        break;

      default:
        output = {
          _links: {
            self: {
              href: "https://" + req.headers.host + req.url
            }
          },
          status: 200,
          message: 'No loans found'

        };
        break;
    }
    return output;
  }
}
