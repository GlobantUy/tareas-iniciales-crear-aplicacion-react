
import React, { Component } from 'react';

const userLogin = () => {
  try {

    if (sessionStorage.getItem('Usuario-Values')) {

      return true
    } else {

      return false
    }

  } catch (error) {
  }//error no manejado

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

    }//error no manejado

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
    if (isLoggedIn == true) {
      return (
        <div>
          <header className="header">
          <a href={process.env.RESTURL_FRONTEND}><img className="logoheader" src="/logo.png" /></a>
            <div className='User'>
              <span id='user-name' >{this.state.email}</span>
              <div className="menu">
                <img className="imgUser" src="/Frame.png" />
                <ul>
                  <li>
                    <a href={process.env.RESTURL_FRONTEND} onClick={this.logout}>Log out</a>
                  </li>
                </ul>
              </div>
            </div>

          </header>
        </div >
      )
    } else {
      return (
        <div>
          <header className="header">
            <a href={process.env.RESTURL_FRONTEND}><img className="logoheader" src="/logo.png" /></a>
            <a href={process.env.RESTURL_FRONTEND + "/ingreso"} ><button className="btnHeader" type="submit"> Ingresar</button></a>
          </header>
        </div >
      )
    }
  }
}
export default Header;
