import { apiClient, type ApiSuccessResponse } from "./api-client";

export const getCart = async()=>{
    try{
        const res = await apiClient.get<ApiSuccessResponse>('/cart/details');
        return res.data;
    }catch(error:any){
        console.error("Error fetching cart: ",error);
        throw error.message;
    }
}

export const addToCart = async(product:string,quantity:number)=>{
    try{

        const res = await apiClient.post<ApiSuccessResponse>('/products/addToCart',{product:product,quantity:quantity});
        // console.log(res)
        return res.success;
    }catch(error:any){
        console.error("Error adding to Cart: ",error);
        throw error.message;
    }
}

export const removeFromCart = async(cartItemId:string)=>{
    try{
        const res = await apiClient.post<ApiSuccessResponse>('/products/removeFromCart',{cartItemId:cartItemId});
        return res.success;
    }catch(error:any){
        console.error("Error removing to Cart: ",error);
        throw error.message;
    }

}