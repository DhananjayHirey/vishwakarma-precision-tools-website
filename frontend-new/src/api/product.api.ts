import { apiClient, type ApiSuccessResponse } from "./api-client";

export const getAllProducts = async () => {
    try {
        const res = await apiClient.get<ApiSuccessResponse>('/products');
        return res.data;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw error.message;
    }
}

export const createProduct = async (productData: any) => {
    try {
        const res = await apiClient.post<ApiSuccessResponse>('/products', productData);
        return res.data;
    } catch (error: any) {
        console.error("Error creating product:", error);
        throw error.message;
    }
}

export const updateProduct = async (productId: string, productData: any) => {
    try {
        const res = await apiClient.patch<ApiSuccessResponse>(`/products/${productId}`, productData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return res.data;
    } catch (error: any) {
        console.error("Error updating product:", error);
        throw error.message;
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        const res = await apiClient.delete<ApiSuccessResponse>(`/products/${productId}`);
        return res.data;
    } catch (error: any) {
        console.error("Error deleting product:", error);
        throw error.message;
    }
}