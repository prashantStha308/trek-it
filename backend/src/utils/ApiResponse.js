class ApiResponse{
  constructor(status, message = "success", data){
    this.status = status;
    this.message = message,
    this.data = data,
    this.success = status < 400;
  }

  static success(res, {data, message = "Success", status = 200}) {
    return res.status(status).json({
      success: true,
      message,
      data
    })
  }
}

export default ApiResponse;