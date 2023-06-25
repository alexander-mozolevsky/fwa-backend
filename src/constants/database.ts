import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

import { NodeProcesses } from './processes';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
    type: NodeProcesses.RDS_DIALECT as any,
    host: NodeProcesses.RDS_HOSTNAME,
    port: parseInt(NodeProcesses.RDS_PORT),
    username: NodeProcesses.RDS_USERNAME,
    password: NodeProcesses.RDS_PASSWORD,
    database: NodeProcesses.RDS_DB_NAME,
    entities: [path.join(__dirname, '../entities/**.entity.*')],
    synchronize: true,
});