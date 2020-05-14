const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `${process.env.OKTA_URL_ISSUER}`,
    clientId: `${process.env.OKTA_CLIENT_ID}`,
    assertClaims: {
      aud: 'api://default',
    },
  });
  
  /**
   * A simple middleware that asserts valid access tokens and sends 401 responses
   * if the token is not present or fails validation.  If the token is valid its
   * contents are attached to req.jwt
   **/
  const authenticationRequired = (req, res, next) => {

    const authHeader = req.headers.authorization || "";
    const match = authHeader.match(/Bearer (.+)/);
  
    if (!match) {
      return res.status(401).json({message: "Please Login to Access this page"})
    }
  
    const accessToken = match[1];
    const expectedAudience = 'api://default';
  
    return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
      .then((jwt) => {
        req.jwt = jwt;
        next();
      })
      .catch((err) => {
        res.status(401).json({message: err.message,message: "Your AccessTOKEN is invalid"})
      });
    
  }

module.exports = authenticationRequired;  