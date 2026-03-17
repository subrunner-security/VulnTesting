// Intentional hardcoded secrets (placeholders - won't trigger GitHub push protection)

const API_KEY = "api_key_placeholder_for_vuln_test";
const DB_PASSWORD = "super_secret_password_123";
const JWT_SECRET = "my-jwt-secret-do-not-share";

const config = {
  stripe: {
    secretKey: "stripe_secret_key_placeholder_for_testing",
  },
  aws: {
    accessKeyId: "aws_access_key_placeholder",
    secretAccessKey: "aws_secret_key_placeholder",
  },
};
