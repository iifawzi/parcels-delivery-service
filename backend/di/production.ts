import { Database } from "@/providers/Database";
import { ConsoleLogger } from "@/utils";
import { Lifecycle, container } from "tsyringe";
import { BikerRepositoryI, BikerService, BikerRepositoryMongoDB } from "@/services/biker";
import { CustomerRepositoryI, CustomerService, CustomerRepositoryMongoDB } from "@/services/customer";
import { BaseDatabase, BaseLogger } from "@/interfaces";
import { ShipmentRepositoryMongoDB, ShipmentService } from "@/services/shipment";
import { TOKENS } from "./Tokens";

export default function regesterDependencies() {
    // Common Dependencies
    container.register<BaseLogger>(TOKENS.logger, { useClass: ConsoleLogger }, { lifecycle: Lifecycle.Singleton });
    container.register<BaseDatabase>(TOKENS.database, { useClass: Database }, { lifecycle: Lifecycle.Singleton });

    // Biker dependencies
    container.register<BikerService>(TOKENS.bikerService, { useClass: BikerService }, { lifecycle: Lifecycle.Singleton });
    container.register<BikerRepositoryI>(TOKENS.bikerRepository, { useClass: BikerRepositoryMongoDB }, { lifecycle: Lifecycle.Singleton });

    // Customer dependencies
    container.register<CustomerService>(TOKENS.customerService, { useClass: CustomerService }, { lifecycle: Lifecycle.Singleton });
    container.register<CustomerRepositoryI>(TOKENS.customerRepository, { useClass: CustomerRepositoryMongoDB }, { lifecycle: Lifecycle.Singleton });

    // Shipment dependencies
    container.register<ShipmentService>(TOKENS.shipmentService, { useClass: ShipmentService }, { lifecycle: Lifecycle.Singleton });
    container.register<ShipmentRepositoryMongoDB>(TOKENS.shipmentRepository, { useClass: ShipmentRepositoryMongoDB }, { lifecycle: Lifecycle.Singleton });
}