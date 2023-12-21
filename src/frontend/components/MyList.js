import { useEffect, useState } from "react";

export default function MyList({marketplace,nft,account}){
    const[items,SetItems]=useState([])
 async   function handleItemsUpdate(){
        let items = []
        const token_listed_count = marketplace.token_listed_count()
        for (let i = 1; i <=token_listed_count; i++) {
            const item = marketplace.items(i);
             if( item.seller === account){
                const uri = await nft.tokenuri(item.tokenID)
                const response = await fetch(uri)
                const metadata = await response.json()
                const totalprice= marketplace.getItemPrice(item.itemID)
                items.push({
                    Totalprice:totalprice,
                    price: item.price,
                    itemID:item.itemID,
                    image:metadata.image,
                    name:metadata.name,
                    description:metadata.description
                })
             }
        }
        SetItems(items)
    }
useEffect(()=>{
    handleItemsUpdate()
},[])    
return(
    <>
    <p>My Listed NFTs:</p>
    <div >
   {items.map((item,idx)=>{
    <p key = {idx}>{item.image}</p>//also add name and decription
   })}
     </div>
    </>
)
}