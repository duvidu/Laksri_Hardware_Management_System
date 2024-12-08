import { useEffect, useState } from "react";

const LowStockProductList = () => {
    const[products, setProducts] = useState(null)
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/lowStock')
            const json = await response.json()

            if (response.ok){
                setProducts(json)
            }
        }

        fetchProducts()
    }, [])

    return ( 
        
            <div>
                {products && products.map((product) => (
                    <p key={product._id}>{product.name}{<br></br>}{product.category}</p>
                ))}
            </div>
        
     );
}
 
export default LowStockProductList;