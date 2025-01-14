import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from './jwt'
import { RoleName } from '../types'
export const secretKey = 'secret-key'

class TokenVerifier {
  private static verifyToken(role: string, token: string): any {
    return verifyAccessToken(token, role as RoleName)
  }

  public static verifyRole(role: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const authHeader = req.headers?.authorization

      if (!authHeader) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'No token provided'
        })
        return
      }

      const token = authHeader.split(' ')[1]
      const dataToken = this.verifyToken(role, token)

      if (!dataToken) {
        res.status(401).json({
          error: 'Invalid Token',
          message: `Role ${role} is not authorized`
        })
        return
      };
      //console.log(dataToken,"=");
      res.locals.user = dataToken;
      (req as any).user = dataToken;

      next()
    }
  }

  public static verifyRoleToken() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const authHeader = req.headers?.authorization

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'No or invalid token provided'
        })
        return
      }

      const token = authHeader.split(' ')[1]

      try {
        // Decode token for get role
        const decodedToken: any = jwt.decode(token)

        if (!decodedToken || !decodedToken.role) {
          res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid token payload'
          })
          return
        }

        const role = decodedToken.role as RoleName

        const verifiedToken = this.verifyToken(role, token)
        //console.log(decodedToken, role, verifiedToken)

        if (!verifiedToken) {
          res.status(401).json({
            error: 'Invalid Token',
            message: `Role ${role} is not authorized`
          })
        }
        res.locals.user = verifiedToken
        next()
      } catch (error) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid or expired token'
        })
      }
    }
  }
}

export default TokenVerifier
