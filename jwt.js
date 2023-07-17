const jwt = require('jsonwebtoken');

// Generate JWT
const secretKey = 'yourSecretKey';

const payload = {
  userId: '123456',
  username: 'john.doe'
};

const options = {
  expiresIn: '1h'
};

const token = jwt.sign(payload, secretKey, options);
console.log('Generated JWT:', token);

// Verify JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('JWT verification failed:', err);
    return;
  }

  console.log('Decoded JWT:', decoded);
});




//payloads- additional info
const payload = {
    iss: 'mywebsite.com',
    sub: 'user123',
    aud: 'api.mywebsite.com',
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expires in 1 hour
    iat: Math.floor(Date.now() / 1000),
    jti: 'abc123'
  };
  
  const token = jwt.sign(payload, secretKey);
  