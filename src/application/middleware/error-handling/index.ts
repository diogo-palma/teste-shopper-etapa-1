export class ErrorHandling {
  static execute = (error, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') console.error(error);
    if(error.statusCode) {
      res.status(error.statusCode).json({
        ...error,
        status: "error",
      });
      return;
    }
    res.status(500).json({
      error: `${error.name} ${error.message}`,
    });
  }
}
