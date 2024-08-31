export interface ApiResponseType<T> {
    success: boolean;
    status: number;
    message: string;
    data: T | null;
    errors: string[] | null; // Optional: Include detailed error information if needed
}

export function ApiResponse<T>(status: number=500, message: string, data: T | null=null, errors: string[] | null = null): ApiResponseType<T> {
    return {
        success: status < 400,
        status,
        message:message ?? (status < 400 ? 'Successful' : 'Something went wrong'),
        data,
        errors
    };
}