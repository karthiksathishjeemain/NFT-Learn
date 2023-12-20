import { useState } from 'react';

import './App.css';
import { ethers } from 'hardhat';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import MarketplaceAbi from '../contractsData/MarketPlace.json'
import MarketplaceAddress from '../contractsData/MarketPlace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import Navigation from './Navigation.js';
import Home from './Home.js'
import Create from './Create.js'
import MyList from './MyList.js'
import MyPurchase from './MyPurchase.js'

 
function App() {
  const [wallet,setWallet] = useState([])
  const [marketplace,setMarketplace]= useState([])
  const [nft,setNFT]= useState([])
  const [loading,setLoading] = useState([])

  async function handleweb3 (){ 
 let account = await  window.ethereum.request({
  method :"eth_RequestAccount"})
  setWallet(account)
  let provider = await ethers.providers.Web3Provider(window.ethereum)
  const signer= await provider.getSigner()
loadmarketplaceandNft(signer)
 }
async function loadmarketplaceandNft(signer){
 
  
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  

}

  return (
<BrowserRouter>
 <Navigation handleweb3={handleweb3} account={wallet[0]}/>//Navigation will contain a button "Connect Wallet"which on connected shows the address
 {!loading ? 
 (<Routes>
  <Route path='/' element={<Home marketplace={marketplace} nft={nft}/>}/>
  <Route path='/myList' element={<MyList marketplace={marketplace} nft={nft}/>}/>
  <Route path='/myPurchase' element={<MyPurchase marketplace={marketplace} nft={nft}/>}/>
  <Route path='/Create' element={<Create marketplace={marketplace} nft={nft}/>}/>
 </Routes>)
 : ("Awaiting for metamask connection")}

   </BrowserRouter>
  );
}

export default App;
