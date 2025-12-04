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