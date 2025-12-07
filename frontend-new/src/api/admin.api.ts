import { apiClient, type ApiSuccessResponse } from "./api-client";

export const getSalesMetrics = async () => {
    try {
        const res = await apiClient.get<ApiSuccessResponse>('/admin/getSalesMetrics');
        return res.data;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw error.message;
    }
}


