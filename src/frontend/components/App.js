import { useState } from 'react';
import logo from './logo.png';
import './App.css';
import { ethers } from 'hardhat';

 
function App() {
  const [wallet,setWallet] = useState([])
  async function handleweb3 (){
 let account = await  window.ethereum.request({
  method :"eth_RequestAccount"})
  setWallet(account)
 }
  return (
<>
   <button onClick={handleweb3}>Connect wallet</button>
   <div>wallet address : {wallet[0]}</div>
   </>
  );
}

export default App;
