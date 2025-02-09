import { Module } from "@nestjs/common";
import { CompanyController } from "./companies.controller";
import companiesProvider from "./companies.provider";

import MongooseCompanyRepository from "@app/mongoose/repositories/Company";

@Module({
  controllers: [CompanyController],
  providers: [MongooseCompanyRepository, ...companiesProvider],
})
export class CompaniesModule {}
