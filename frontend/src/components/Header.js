
import React, { Component } from 'react';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>
  const userLogin= ()=> {
    try {
    let btnHeader = document.querySelector(".btnHeader");
    let user = document.querySelector(".User");
      if (sessionStorage.getItem('Usuario-Values')){
        btnHeader.style.display= 'none';
        user.style.display= 'block';
      } else {
        btnHeader.style.display= 'block';
        user.style.display= 'none';
      }

    } catch (error) {
      console.log(error)
    }
    
  }
  
 class Header extends React.Component{
   constructor(props){
     super(props)
     this.state = {
       email: '',
       password:''
     };
   }
   changeState (){
     try {
      let email = JSON.parse(sessionStorage.getItem('Usuario-Values')).email
      let arroba = email.indexOf("@");
     this.setState({
       email: email = email.substring(0, arroba)
       })
     } catch (error) {
       
     }
    
   }
   
   render(){
    userLogin();
    this.changeState()
    return (
      <div>
        <header className="header">
          <img className="logoheader" src="/logo.jpg" />
          <a href="http://localhost:3000/ingreso" ><button className="btnHeader" type="submit"> Ingresar</button></a>
       
          <div className='User'>
            <span id='user-name' >{this.state.email}</span>
            <img className="imgUser" src="/Frame.png"/>
          </div>
  
        </header>
  
          <footer>
  
          </footer>
      </div>
    )
    
   }
 }
 export default Header;