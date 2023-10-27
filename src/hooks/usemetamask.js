import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { BrowserProvider } from "ethers";
import axios from 'axios';
import api from '../settings/api';

import { baseURL } from '../settings/urls';


const useWeb3Auth = () => {

  const [ user, setUser ] = useState()
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
      
      async function getUserData(){

          try {
              const accessToken = localStorage.getItem('friendTraderAccess')
              if(accessToken){
                  const url = `/auth/user/`
                  const request = await api.get(url)
                  setUser(request.data)
              }

          } catch (e){
              setUser(null)
          }

      }

      getUserData()

      return () => {
    }
}, [])

  useEffect(()=>{
    if (!window.ethereum) {
      setErrorMsg('Please install MetaMask to continue. You can download it from here.');
      return;
    }
  }
  )

  const handleSignIn = async () => {
    
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new BrowserProvider(connection)
    // const network = await provider.getNetwork()
    // trigger comment
    try {
        const signer = await provider.getSigner()
        const data = {
            public_address: signer.address,
        }
        const res = await axios.post(`${baseURL}/auth/nonce`, data)
        const message = res.data.message
        const address = signer.address
        const signature = await signer.signMessage(message)
        const authRes = await axios.post(`${baseURL}/auth/authenticate`, {
          signature: signature,
          message: message,
          public_address: address,
        })
        setUser(authRes.data.user)
        localStorage.setItem("friendTraderAccess", authRes.data.access)
    } catch (e){
        localStorage.removeItem("friendTraderAccess")
        console.log(e.response)
    }

  };

  const handleSignOut = ()=>{
    localStorage.removeItem("friendTraderAccess")
    setUser(null)
  }


  return { handleSignIn, handleSignOut, user, errorMsg};
};

export default useWeb3Auth;
