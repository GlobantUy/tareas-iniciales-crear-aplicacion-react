const connectToDatabase = require('../lib/database');

module.exports.returnLoans = async (req, res) => {
  let loanSearch
  let userSearch

  const db = await connectToDatabase()
  const collectionT = db.collection('loans')
  const collectionU = db.collection('users')
  if (req.method === 'OPTIONS') {
    return {status: 200, ok:'ok'};
  }
  if (req.method === 'POST') {
    console.log(req.body);
    try {
      userSearch = await collectionU.find({ email: req.body.email }).toArray()
      console.log(userSearch);
      
    } catch (error) {
      return ({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        status: 400,
        message: 'User not found'
      });

    }
    if(userSearch[0].email === req.body.email) {
      const type =  userSearch[0].userType;
      switch (type) {
        case 'ADMIN':

          loanSearchAdm = await collectionT.find({}).toArray()
          console.log(loanSearch);

          output = {
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status: 200,
            loans: loanSearchAdm

          };            
          break;
        
        case 'CUSTOMER':
          loanSearchCust = await collectionT.find({userEmail: req.body.email }).toArray()
          console.log(loanSearch);
          output = {
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status:200,
            loans: loanSearchCust

          };
          
          break;
      
        default:
          output = {
            _links: {
              self: {
                href: "https://" + req.headers.host + req.url
              }
            },
            status:200,
            message: 'No loans found'

          };
          break;
      }
      return output;

    }else{
      return ({
        _links: {
          self: {
            href: "https://" + req.headers.host + req.url
          }
        },
        status: 403,
        message: 'Access denied'

      })
    }
  }}
