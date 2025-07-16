import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { config } from '../config/environment';

const authService = new AuthService();

export class AuthController {
  // Google OAuth login
  googleAuth = (req: Request, res: Response) => {
    // This will be handled by passport middleware
  };

  // Google OAuth callback
  googleCallback = async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      if (!user) {
        return res.redirect(`${config.frontendUrl}/login?error=auth_failed`);
      }

      const token = authService.generateToken(user.id);
      
      // Redirect to frontend with token
      res.redirect(`${config.frontendUrl}/auth/callback?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${config.frontendUrl}/login?error=auth_failed`);
    }
  };

  // Get current user profile
  getProfile = async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
          googleId: user.googleId,
        },
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch profile',
      });
    }
  };

  // Logout
  logout = (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Logout failed',
        });
      }
      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    });
  };

  // Verify token
  verifyToken = async (req: Request, res: Response) => {
    try {
      const user = req.user as any;
      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
  };
}