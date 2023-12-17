import { useState,useEffect } from "react";
export default function Home ({marketplace,nft}){
    const[loading,setLoading] = useState(true)
    const[items,setItems]= useState([])
 async function LoadListedNfts_in_Marketplace(){
    const items = []
     const tokenCount = marketplace.token_Listed_count();
     for (let i = 0;i<=tokenCount;i++){
        let item = marketplace.items(i)
        if (!item.sold){
       const totalPrice =await  item.totalPrice
        const uri =  await nft.tokenURI(item.tokenID)
        const response =  await fetch(uri)
        const metadata = await response.json()
     items.push({
        TotalPrice:totalPrice,
        description:metadata.description,
        owner:item.owner,
        image:metadata.image,
        name:metadata.name
     })}}
     setLoading[!loading]
     setItems[items]
     }

  async function handlePurchase(item){
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    LoadListedNfts_in_Marketplace()
  }
  useEffect(()=>{
    LoadListedNfts_in_Marketplace()
  },[])
  if (loading){
    return(
    <>Loading.....</>)
  }
  return (
    <>{items.length>0 ?
          <div > {...items.map((item,id)=>{<>
      
               <p key={id}>{item.image} </p>
               <p onClick={()=>{handlePurchase(item)}}>Buy this NFT</p>
               <p>Price:{item.Price}</p>
 </>})}
          </div>
        :<div>Not listed</div>
  }</>

 )
}