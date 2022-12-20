import { MongoDBBikerRepository } from "@/services/biker/repository/mongodb";
import { Database } from "@/providers/Database";
import { ConsoleLogger } from "@/utils";
import { Lifecycle, container } from "tsyringe";
import { BikerService } from "@/services/biker";
import { BikerRepositoryI } from "@/services/biker/repository/BikerRepository.contract";
import { BaseDatabase, BaseLogger } from "@/interfaces";
import BikerController from "@/services/biker/Biker.controller";
import CustomerController from "@/services/customer/Customer.controller";
import { CustomerService } from "@/services/customer";
import { MongoDBCustomerRepository } from "@/services/customer/repository/mongodb";

// Common Dependencies
container.register<BaseLogger>("logger", { useClass: ConsoleLogger }, { lifecycle: Lifecycle.Singleton });
container.register<BaseDatabase>("database", { useClass: Database }, { lifecycle: Lifecycle.Singleton });

// Biker dependencies
container.register<BikerController>("bikerController", { useClass: BikerController }, { lifecycle: Lifecycle.Singleton });
container.register<BikerService>("bikerService", { useClass: BikerService }, { lifecycle: Lifecycle.Singleton });
container.register<BikerRepositoryI>("bikerRepository", { useClass: MongoDBBikerRepository }, { lifecycle: Lifecycle.Singleton });

// Customer dependencies
container.register<CustomerController>("customerController", { useClass: CustomerController }, { lifecycle: Lifecycle.Singleton });
container.register<CustomerService>("customerService", { useClass: CustomerService }, { lifecycle: Lifecycle.Singleton });
container.register<MongoDBCustomerRepository>("customerRepository", { useClass: MongoDBCustomerRepository }, { lifecycle: Lifecycle.Singleton });