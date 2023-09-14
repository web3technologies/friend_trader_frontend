import Web3Modal from 'web3modal';
import { BrowserProvider } from "ethers";
import axios from 'axios';
import { useState } from 'react';


const useWeb3Auth = () => {

  const [ user, setUser ] = useState()

  const handleSignIn = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new BrowserProvider(connection)
    const network = await provider.getNetwork()
    try {
        const signer = await provider.getSigner()
        const data = {
            public_address: signer.address,
        }
        const res = await axios.post(`http://localhost:8000/auth/nonce`, data)
        const message = res.data.message
        const address = signer.address
        const signature = await signer.signMessage(message)
        const authRes = await axios.post("http://localhost:8000/auth/authenticate", {
          signature: signature,
          message: message,
          public_address: address,
        })
        setUser(authRes.data.user)
    } catch (e){
        console.log(e.response)
    }

  };


  return { handleSignIn, user};
};

export default useWeb3Auth;
