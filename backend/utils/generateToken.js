import jwt from 'jsonwebtoken';

export const generateToken = (req, res, userId) => {
  // Generating a JWT token for the authenticated user
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h'
  });

  // Setting the JWT as an HTTP-only cookie for enhanced security
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // ✅ Render uses HTTPS, so this must be true
    sameSite: 'none', // ✅ Required for cross-origin cookies
    maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
    
  });
};
