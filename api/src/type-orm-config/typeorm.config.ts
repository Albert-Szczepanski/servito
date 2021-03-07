import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfigDev: TypeOrmModuleOptions = {
  // docker run --name mongo -p 27017:27017 -d mongo
  type: 'mongodb',
  host: 'localhost:27017',
  username: 'root',
  password: '',
  database: 'servito',
  autoLoadEntities: true,
  synchronize: true,
  useUnifiedTopology: true
};
