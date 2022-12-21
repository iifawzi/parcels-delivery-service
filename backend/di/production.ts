import { Database } from "@/providers/Database";
import { ConsoleLogger } from "@/utils";
import { Lifecycle, container } from "tsyringe";
import { BikerController, BikerRepositoryI, BikerService, BikerRepositoryMongoDB } from "@/services/biker";
import { CustomerController, CustomerRepositoryI, CustomerService, CustomerRepositoryMongoDB } from "@/services/customer";
import { BaseDatabase, BaseLogger } from "@/interfaces";
import { ShipmentRepositoryMongoDB, ShipmentController, ShipmentService } from "@/services/shipment";

export default function regesterDependencies() {
    // Common Dependencies
    container.register<BaseLogger>("logger", { useClass: ConsoleLogger }, { lifecycle: Lifecycle.Singleton });
    container.register<BaseDatabase>("database", { useClass: Database }, { lifecycle: Lifecycle.Singleton });

    // Biker dependencies
    container.register<BikerController>("bikerController", { useClass: BikerController }, { lifecycle: Lifecycle.Singleton });
    container.register<BikerService>("bikerService", { useClass: BikerService }, { lifecycle: Lifecycle.Singleton });
    container.register<BikerRepositoryI>("bikerRepository", { useClass: BikerRepositoryMongoDB }, { lifecycle: Lifecycle.Singleton });

    // Customer dependencies
    container.register<CustomerController>("customerController", { useClass: CustomerController }, { lifecycle: Lifecycle.Singleton });
    container.register<CustomerService>("customerService", { useClass: CustomerService }, { lifecycle: Lifecycle.Singleton });
    container.register<CustomerRepositoryI>("customerRepository", { useClass: CustomerRepositoryMongoDB }, { lifecycle: Lifecycle.Singleton });

    // Shipment dependencies
    container.register<ShipmentController>("shipmentController", { useClass: ShipmentController }, { lifecycle: Lifecycle.Singleton });
    container.register<ShipmentService>("shipmentService", { useClass: ShipmentService }, { lifecycle: Lifecycle.Singleton });
    container.register<ShipmentRepositoryMongoDB>("shipmentRepository", { useClass: ShipmentRepositoryMongoDB }, { lifecycle: Lifecycle.Singleton });
}