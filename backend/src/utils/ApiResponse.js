class ApiResponse{
  constructor(status, message = "success", data){
    this.status = status;
    this.message = message,
    this.data = data,
    this.success = status < 400;
  }

  static success(res, { data, message = "Success", status = 200, before = [] }) {
    // middlewares
    before.forEach(func => func(res));

    return res.status(status).json({
      success: true,
      message,
      data
    })
  }

  static setCookie(name, value, options = {}) {
    return (res) => res.cookie(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      ...options
    });
  }

  static clearCookie(name) {
    return (res) => res.clearCookie(name);
  }

}

export default ApiResponse;