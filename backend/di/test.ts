import 'module-alias/register';
import "reflect-metadata"
import { Lifecycle, container } from "tsyringe";
import { BikerService } from "@/services/biker";
import { BikerRepositoryI } from "@/services/biker/repository/BikerRepository.contract";
import { BaseDatabase, BaseLogger } from "@/interfaces";
import BikerController from "@/services/biker/Biker.controller";
import CustomerController from "@/services/customer/Customer.controller";
import { CustomerService } from "@/services/customer";
import { CustomerRepositoryMongoDB } from "@/services/customer/repository/mongodb";
import { DatabaseMock } from "@/tests/mocks";
import { BikerRepositoryMock } from "@/services/biker/tests/mocks";
import TestLogger from '@/tests/mocks/Logger.mock';
import { CustomerRepositoryMock } from '@/services/customer/tests/mocks';
import { CustomerRepositoryI } from '@/services/customer/repository/CustomerRepository.contract';
import { ShipmentController, ShipmentRepositoryMongoDB, ShipmentService } from '@/services/shipment';

export default function regesterDependencies() {
    // Common Dependencies
    container.register<BaseLogger>("logger", { useClass: TestLogger }, { lifecycle: Lifecycle.Singleton });
    container.register<BaseDatabase>("database", { useClass: DatabaseMock }, { lifecycle: Lifecycle.Singleton });
    
    // Biker dependencies
    container.register<BikerController>("bikerController", { useClass: BikerController }, { lifecycle: Lifecycle.Singleton });
    container.register<BikerService>("bikerService", { useClass: BikerService }, { lifecycle: Lifecycle.Singleton });
    container.register<BikerRepositoryI>("bikerRepository", { useClass: BikerRepositoryMock }, { lifecycle: Lifecycle.Singleton });
    
    // Customer dependencies
    container.register<CustomerController>("customerController", { useClass: CustomerController }, { lifecycle: Lifecycle.Singleton });
    container.register<CustomerService>("customerService", { useClass: CustomerService }, { lifecycle: Lifecycle.Singleton });
    container.register<CustomerRepositoryI>("customerRepository", { useClass: CustomerRepositoryMock }, { lifecycle: Lifecycle.Singleton });

    // Shipment dependencies
    container.register<ShipmentController>("shipmentController", { useClass: ShipmentController }, { lifecycle: Lifecycle.Singleton });
    container.register<ShipmentService>("shipmentService", { useClass: ShipmentService }, { lifecycle: Lifecycle.Singleton });
    container.register<ShipmentRepositoryMongoDB>("shipmentRepository", { useClass: ShipmentRepositoryMongoDB }, { lifecycle: Lifecycle.Singleton });
}
