export const NodeProcesses = () => ({
    PORT: process.env.PORT,
    RDS_DIALECT: process.env.RDS_DIALECT,
    RDS_PORT: process.env.RDS_PORT,
    RDS_USERNAME: process.env.RDS_USERNAME,
    RDS_PASSWORD: process.env.RDS_PASSWORD,
    RDS_HOSTNAME: process.env.RDS_HOSTNAME,
    RDS_DB_NAME: process.env.RDS_DB_NAME,
});
