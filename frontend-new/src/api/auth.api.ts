    import { apiClient, type ApiSuccessResponse } from "./api-client";
    import { type ChangePasswordRequest, type LoginRequest, type RegisterRequest } from "@/types/authTypes";

    export const register = async (data: RegisterRequest): Promise<any> => {
        try {
            const form = new FormData()
            form.append("name", data.name)
            form.append("username", data.username)
            form.append("email", data.email)
            form.append("password", data.password)
            // form.append("address", data.address ? JSON.stringify(data.address) : "")
            form.append("isPrimary", "true")
            if (data.avatar) form.append("avatar", data.avatar)
            const res = await apiClient.post<ApiSuccessResponse>('/users/register', form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return res.data;
        } catch (error: any) {
            console.error("Error during registration:", error);
            throw error.message;
        }
    };


    export const login = async (data: LoginRequest): Promise<any> => {
        try {
            const res = await apiClient.post<ApiSuccessResponse>('/users/login', data);
            console.log(res);
            
            return res.data;    
        } catch (error: any) {
            console.error("Error during login:", error);
            throw error.message;
        }
    }

    export const logout = async (): Promise<any> => {
        try {
            const res = await apiClient.post<ApiSuccessResponse>('/users/logout')
            return res.data
        } catch (error: any) {
            console.error("Error during login:", error);
            throw error.message;
        }
    }


    export const changePassword = async (data: ChangePasswordRequest): Promise<any> => {
        try {
            const res = await apiClient.post<ApiSuccessResponse>('/users/change-password', data);
            return res.data;
        } catch (error: any) {
            console.error("Error during change password:", error);
            throw error.message;
        }
    }