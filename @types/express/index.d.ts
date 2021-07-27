export {}

declare global {
  namespace Express {
      interface Request {
          user?: {
            email?: string,
            handle?: string,
            uid: string
          }
      }
  }
}
