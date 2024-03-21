import React, { useEffect, useState } from "react";
import SignInForm from '../layouts/signIn-form/signIn-form'
import styles from './app.module.scss';
import { getProfile } from "../../services/api/profile";
import Main from "../layouts/Main/Main";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const userAuthentication = async () => {
    const user = await getProfile()
      if(user?.name) setIsAuthenticated(true)
      else setIsAuthenticated(false)
  }
  
  useEffect(() => {
    userAuthentication()
  }, [])
  
  return (
    <div className={styles.app}>
      <div className={styles['signIn-form-wrapper']}>
        {isAuthenticated ? 
          <Main setIsAuthenticated={setIsAuthenticated}/> : 
          <SignInForm setIsAuthenticated={setIsAuthenticated}/>}
      </div>
    </div>
  );
}

export default App;
