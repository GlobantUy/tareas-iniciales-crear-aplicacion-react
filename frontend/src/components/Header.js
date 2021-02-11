import React, { Component } from 'react';


class Header extends React.Component {
 
  constructor(props) {
    super(props)
    this.userData = {
      email: '',
      password: '',
      name: '',
      role: '',
      tabla: ''
    };
  }
  getName() {
    try {
      let email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email;
      let arroba = email.indexOf("@");
      this.userData.email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email;
      this.userData.password =  JSON.parse(sessionStorage.getItem('Usuario-Values')).password,
      this.userData.name =  email.substring(0, arroba),
      this.userData.role = JSON.parse(sessionStorage.getItem('Usuario-Values')).role;
      this.userData.tabla = this.getRole();
    } catch (error) {
      // console.log(error);
      return false
    }

  }

  getRole() {
    let role = JSON.parse(sessionStorage.getItem('Usuario-Values')).role;
      console.log(role);
      if (role === 'ADMIN'){
        return process.env.RESTURL_FRONTEND + "/Tableadmin";
      }else{
        return process.env.RESTURL_FRONTEND + "/Tableuser";
      }
  }

  logout() {
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch (error) {
      console.log(error)
    }
  }

  userLogin = () => {
    try {
      if (!sessionStorage.getItem('Usuario-Values')) {
        return false
      } else {
        return true
      }
    }catch (error) {
      //console.log(error);
      return false
    }//error no manejado
  
  }

  render() {
    
    const isLoggedIn = this.userLogin();
    if (isLoggedIn) {
      this.getName();
      return (
        <div>
          <header className="header">
          <div>
          <a href={process.env.RESTURL_FRONTEND}><img className="logoheader" src="/logo.png" /></a>
            <div className='User'>
              <span id='user-name' >{this.userData.name}</span>
              <div className="menu">
                <img className="imgUser" src="/Frame.png" />
                <ul>
                  <li>
                    <a href={this.userData.tabla}>Prestamos</a>
                  </li>
                  <li>
                    <a href={process.env.RESTURL_FRONTEND} onClick={this.logout}>Cerrar Sesion</a>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </header>
        </div>
      )
    } else {
      return (
        <div>
          <header className="header">
            <a href={process.env.RESTURL_FRONTEND}><img className="logoheader" src="/logo.png" /></a>
            <a href={process.env.RESTURL_FRONTEND + "/ingreso"} ><button className="btnHeader" type="submit">Ingresar</button></a>
          </header>
        </div>
      )
    }
  }
}
export default Header;
