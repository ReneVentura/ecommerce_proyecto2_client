import React from "react";
import './style.css';
import { auth, firebase } from "../../../config/firebase.config";
import {loginAdmin} from "../someFunctions";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = { logged:null };
    }

    logear = async() =>{
      var provider = new firebase.auth.GoogleAuthProvider();

      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(async () => {
        try {
          const result = await auth.signInWithPopup(provider);
          this.props.history.push("/user/shop");
        } catch (error) {
          alert("Ha sucedido un error con la conexión: " + error.message);
        }
      })
      .catch((error) => {
        alert("Ha sucedido un error con la conexión: "+error.message);
      });
    
    }

    /*async loginAdmin(username,password){
      try {
          // CAMBIAR VALIDACION POR CONSULTA DE FIREBASE
          const endpoint = `http://localhost:5000/api/login?username=${username}&contrasena=${password}`;
          await fetch(endpoint)
              .then(results => results.json())
              .then(json => {
                if(json.login === true){
                  this.setState({logged:true});
                  this.props.history.push('/admin');
                }else{
                  this.setState({logged:false});
                }
              });
       } catch (e) {
           console.error(e);
       } 
    }*/

    render() {
      return (
        <div className="login-body">
            <div className="Main_Login">
                <div className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                    <br />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <button 
                        className="btn btn-lg btn-primary btn-block btn-user" 
                        type="submit" 
                        // eslint-disable-next-line no-undef
                        onClick = { () => {
                          const email = document.getElementById("inputEmail").value
                          const contra = document.getElementById("inputPassword").value
                          loginAdmin(email, contra) 
                          auth.onAuthStateChanged((user) => {
                            if(user){
                              console.log("logeado");
                              //DIRIGIR A LA PAGINA DE USUARIOS
                              this.props.history.push('/admin/home');
                            }else{
                              console.log("no esta logeado");
                            }
                          });}} 
                          //() => this.Registro(document.getElementById("inputEmail").value, document.getElementById("inputPassword").value)
                    >Sign in as Admin</button>
                    <button 
                      className="btn btn-lg btn-primary btn-block btn-admin" 
                      type="submit" 
                      onClick = {() => {
                        this.logear()
                      }
                    }>
                      <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="gugul"/>
                      </div>
                      <p className="btn-text"><b>Sign in with google</b></p>
                    </button>

                    {
                      this.state.logged === false ? <div className="alert alert-danger" role="alert">Credenciales incorrectas.</div> : null
                    }
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Login;