import { useEffect, useState } from "react"

export default function MyPurchase({marketplace,nft,account}){
    const[purchases,SetPurchases]=useState([])
    const[loading,setLoading]=useState([])
    const PurchaseList = async ()=>{
        const filter = marketplace.filters.token_sold(null,null,null,null,null,account)
        const result = marketplace.queryfilter(filter)
        // const purchases = []
        const purchaseItem=[]
        const purchases = await Promise.all(result.map(i => {
            i=i.args;
          const uri = nft.tokenURI(i.tokenID)
          const response = fetch(uri)
          const metadata = response.json()
          let totalPrice ;
          purchaseItem.push({
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          })
          return purchaseItem
        }))
        setLoading(false)
        SetPurchases(purchases)
    }
    useEffect(()=>{
         PurchaseList()
    },[])
    if (loading){
        return "Loading ....."
    }
    return(
        <>
        {purchases.length>0?
        <>
        <>My purchases are:</>
        <div>{purchases.map((purchase,idx)=>{
            <p key={idx}>{purchase.image}</p> //Add additional features to it
        })}
        </div>
        </>
        :<>No Nfts Purchased</>
        }
        </>
    )
}