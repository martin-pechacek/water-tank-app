const errors = [
  {
    "error": "NOT_CONNECTED",
    "status": 0,
    "message": "Can't connect to server",
    "detail": "Please check your internet connection"
  },
  {
    "error": "BAD_REQUEST",
    "status": 400,
    "message": "Communication with server went wrong",
    "detail": "Please contact administrator"
  },
  {
    "error": "UNAUTHORIZED",
    "status": 401,
    "message": "Device unauthorized",
    "detail": "Please contact administrator"
  },
  {
    "error": "SERVER_ERROR",
    "status": 500,
    "message": "Server Error",
    "detail": "Please try later or contact administrator"
  }
];

export default errors;
