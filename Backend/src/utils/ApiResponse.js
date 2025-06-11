// The ApiResponse class is the counterpart to the ApiError class. Together, they help you standardize both successful and error responses in your backend API.
//The ApiResponse class is used to wrap successful API responses in a consistent format.
class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }