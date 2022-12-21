import 'module-alias/register';
import "reflect-metadata"
import { Lifecycle, container } from "tsyringe";
import { BikerService } from "@/services/biker";
import { BikerRepositoryI } from "@/services/biker/repository/BikerRepository.contract";
import { BaseDatabase, BaseLogger } from "@/interfaces";
import BikerController from "@/services/biker/Biker.controller";
import CustomerController from "@/services/customer/Customer.controller";
import { CustomerService } from "@/services/customer";
import { DatabaseMock } from "@/tests/mocks";
import { BikerRepositoryMock } from "@/services/biker/tests/mocks";
import TestLogger from '@/tests/mocks/Logger.mock';
import { CustomerRepositoryMock } from '@/services/customer/tests/mocks';
import { CustomerRepositoryI } from '@/services/customer/repository/CustomerRepository.contract';
import { ShipmentController, ShipmentRepositoryI, ShipmentService } from '@/services/shipment';
import { ShipmentRepositoryMock } from '@/services/shipment/tests/mocks';
import { TOKENS } from './Tokens';

export default function regesterDependencies() {
    // Common Dependencies
    container.register<BaseLogger>(TOKENS.logger, { useClass: TestLogger }, { lifecycle: Lifecycle.Singleton });
    container.register<BaseDatabase>(TOKENS.database, { useClass: DatabaseMock }, { lifecycle: Lifecycle.Singleton });

    // Biker dependencies
    container.register<BikerController>(TOKENS.bikerController, { useClass: BikerController }, { lifecycle: Lifecycle.Singleton });
    container.register<BikerService>(TOKENS.bikerService, { useClass: BikerService }, { lifecycle: Lifecycle.Singleton });
    container.register<BikerRepositoryI>(TOKENS.bikerRepository, { useClass: BikerRepositoryMock }, { lifecycle: Lifecycle.Singleton });

    // Customer dependencies
    container.register<CustomerController>(TOKENS.customerController, { useClass: CustomerController }, { lifecycle: Lifecycle.Singleton });
    container.register<CustomerService>(TOKENS.customerService, { useClass: CustomerService }, { lifecycle: Lifecycle.Singleton });
    container.register<CustomerRepositoryI>(TOKENS.customerRepository, { useClass: CustomerRepositoryMock }, { lifecycle: Lifecycle.Singleton });

    // Shipment dependencies
    container.register<ShipmentController>(TOKENS.shipmentController, { useClass: ShipmentController }, { lifecycle: Lifecycle.Singleton });
    container.register<ShipmentService>(TOKENS.shipmentService, { useClass: ShipmentService }, { lifecycle: Lifecycle.Singleton });
    container.register<ShipmentRepositoryI>(TOKENS.shipmentRepository, { useClass: ShipmentRepositoryMock }, { lifecycle: Lifecycle.Singleton });
}
