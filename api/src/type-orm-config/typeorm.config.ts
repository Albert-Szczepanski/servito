import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfigDev: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost:27017',
  username: 'root',
  password: '',
  database: 'servito',
  autoLoadEntities: true,
  synchronize: true,
  useUnifiedTopology: true
};
