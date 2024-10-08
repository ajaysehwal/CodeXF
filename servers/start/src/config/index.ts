import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";

const requiredEnvVars = [
  "PORT",
  "JUDGE0API_KEY",
  "JUDGE0API_HOST",
  "AWS_ACCESS_KEY",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_REGION",
  "AWS_S3_BUCKET",
];

function validateEnv() {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

validateEnv();

const baseConfig = {
  port: parseInt(process.env.PORT || "6000", 10),
  nodeEnv: env,
  judge0ApiKey: process.env.JUDGE0API_KEY as string,
  judge0ApiHost: process.env.JUDGE0API_HOST as string,
  aws_access_key_id: process.env.AWS_ACCESS_KEY as string,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY as string,
  aws_region: process.env.AWS_REGION as string,
  aws_s3_bucket: process.env.AWS_S3_BUCKET as string,
};

const envConfig = {
  development: {
    // Development-specific config
  },
  production: {
    // Production-specific config
  },
  test: {
    // Test-specific config
  },
}[env];

export default { ...baseConfig, ...envConfig };