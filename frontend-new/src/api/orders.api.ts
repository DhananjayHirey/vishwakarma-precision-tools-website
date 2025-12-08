import { apiClient, type ApiSuccessResponse } from "./api-client";

export const getAllOrders = async () => {
    try {
        const res = await apiClient.get<ApiSuccessResponse>('/orders/getAllOrders');
        return res.data;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw error.message;
    }
}


export const updateOrderStatus = async (orderId: string, statusString: string) => {
    try {
        const res = await apiClient.patch<ApiSuccessResponse>(`/orders/updateOrderStatus`, {
            orderId,
            statusString
        });
        return res.data;
    } catch (error: any) {
        console.error("Error updating order status:", error);
        throw error.message;
    }
}

export const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
        const res = await apiClient.patch<ApiSuccessResponse>(`/orders/updatePaymentStatus`, {
            orderId,
            paymentStatus
        });
        return res.data;
    } catch (error: any) {
        console.error("Error updating payment status:", error);
        throw error.message;
    }
}