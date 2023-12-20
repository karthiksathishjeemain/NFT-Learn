import { useState } from "react"
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
export  function Create ({marketplace,nft}){
    const[nftname,SetNftname] =  useState('')
    const[description,SetDescription] = useState('')
    const[price,SetPrice]=useState(null)
    const[image,SetIMage]=useState(``)
    const[pass,SetPass]=useState(true)
   async function ipfsfunction(event){
      file = event.target.files[0]
      if (file !== undefined){
      result= await client.add(file)
      try {
        console.log(result)
      SetIMage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error) {
       console.log("Error in uploading to IPFS",error)
      }
   }}
   async function ListNFT(){
    if (image&&description&&nftname&&price){
    try {
    const result = await client.add(JSON.stringify({image,nftname,description,price}))
    MintNFT(result)
    } catch (error) {
        console.log("ERROR IN COLLECTING URI OF THE IMAGE",error)
    }
    SetPass(true)

}
else{SetPass(false)}
    
   }
   async function MintNFT(result){
   const uri = `https://ipfs.infura.io/ipfs/${result.path}`
   await(await nft.mint(uri)).wait()
   await(await nft.setApprovalForAll(marketplace.address, true)).wait()
   const id = nft.tokenCount()
   await(await marketplace.ListItem(price,nft,id))  //Arguments passed according Marketplace.sol 
   }
    return(
        <>
        <input onChange={ipfsfunction} />
        <input onChange={(e)=>{SetNftname(e.target.value)}} />//Enter the NFT Nftname
        <input onChange={(e)=>{SetDescription(e.target.value)}}/>//Enter the description
        <input onChange={(e)=>{SetPrice(e.target.value)}}/>//Enter the Price
        <button onClick={ListNFT}>Create and List NFT</button>
        {!pass && <> Complete All the section first </>}
        </>
    )
}