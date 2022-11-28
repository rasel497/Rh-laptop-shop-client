import { useEffect, useState } from "react";


const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);


    useEffect(() => {
        fetch(`https://laptop-shop-server.vercel.app/users/buyer/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log('Hello is Buyer', data);
                setIsBuyer(data.isBuyer);
                setIsBuyerLoading(false);
            })
    }, [email])

    return [isBuyer, isBuyerLoading]
}

export default useBuyer;