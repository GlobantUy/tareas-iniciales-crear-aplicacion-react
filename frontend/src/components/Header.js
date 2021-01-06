
import  React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const userLogin = () => {
  try {
    let btnHeader = document.querySelector(".btnHeader");
    let user = document.querySelector(".User");
    if (sessionStorage.getItem('Usuario-Values')) {
      return true;
      // btnHeader.style.display = 'none';
      // user.style.display = 'block';
    } else {
      return false
      // btnHeader.style.display = 'block';
      // user.style.display = 'none';
    }

  } catch (error) {
    // console.log(error)
  }

}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }
  changeState() {
    try {
      let email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email
      let arroba = email.indexOf("@");
      this.setState({
        email: email = email.substring(0, arroba)
      })
    } catch (error) {

    }

  }

  logout() {
    try {
      sessionStorage.removeItem('Usuario-Values');
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const isLoggedIn = userLogin();
    this.changeState();
    const topHeader =  '<div> <header className="header"> <img className="logoheader" src="/logo.jpg" />';
    // const topHeader = ReactDOM. .parse(htmlString); // , "text/html");
    const bottomHeader = '</header> </div >';
    if (isLoggedIn) {
      return ( ReactHtmlParser(topHeader).toString() + 
      <div className='User'>
        <span id='user-name' >{this.state.email}</span>
        <div className="menu">
          <img className="imgUser" src="/Frame.png" />
          <ul>
            <li>
              <a href='http://localhost:3000/ingreso' onClick={this.logout}>Log out </a>
            </li>
          </ul>
        </div>
      </div>
      +  ReactHtmlParser(bottomHeader) );
    ;

    } else {
      return ( ReactHtmlParser(topHeader).toString()   + <a href="http://localhost:3000/ingreso" ><button className="btnHeader" type="submit"> Ingresar</button></a> +  ReactHtmlParser(bottomHeader)) ;

    }
    // this.changeState()
    /*return (
      <div>
        <header className="header">
          <img className="logoheader" src="/logo.jpg" />
          <a href="http://localhost:3000/ingreso" ><button className="btnHeader" type="submit"> Ingresar</button></a>

          <div className='User'>
            <span id='user-name' >{this.state.email}</span>
            <div className="menu">
              <img className="imgUser" src="/Frame.png" />
              <ul>
                <li>
                  <a href='http://localhost:3000/ingreso' onClick={this.logout}>Log out </a>
                </li>
              </ul>
            </div>
          </div>

        </header>

        <footer>

        </footer>
      </div >
    ) */

  }
}
export default Header;