import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { createToken } from "@/helpers";
import mongoose from "mongoose";
import ShipmentModel from "../repository/mongodb/shipment.model";

describe("[Shipments APIs] | getWaiting API", () => {
    const bikerToken = createToken({ username: "bikerTest", fullname: "biker", _id: "63a22b00a704bee4b0254f4c", role: "biker" });
    const customerToken = createToken({ username: "customerTest", fullname: "customer", _id: "63a22b00a704bee4b0254f4d", role: "customer" });
    
    beforeAll(async () => {
        if (process.env.NODE_ENV === 'integration-coverage') {
            if (process.env.NODE_ENV === 'integration-coverage') {
                await ShipmentModel.deleteMany({});
                await ShipmentModel.create(
                    {
                        _id: new mongoose.Types.ObjectId("63a271ebbe91afafb4d48c67"),
                        customer: new mongoose.Types.ObjectId("63a22b00a704bee4b0254f4d"),
                        pickUpAddress: "Egypt",
                        pickOfAddress: "Germany",
                        shipmentStatus: "WAITING",
                    },
                )
            }
        }
    });

    afterAll(() => {
        server.close();
        mongoose.disconnect();
    })
    describe("[Given] Someone is trying to find the available shipments", () => {

        describe('[When] Customer is trying to find the available shipments', () => {
            it("[Then] Should respond with 403", async () => {
                let res = await request(server)
                    .get("/api/shipment/waiting")
                    .auth(customerToken, { type: 'bearer' })
                    .send({});
                expect(res.statusCode).toEqual(403);
                expect(res.body.message).toEqual('You\'re not authorized to perform this action');
            });
        });

        describe('[When] Biker is trying to find the available shipments', () => {

            describe('[When] Biker is not authenticated', () => {
                it("[Then] Should respond with 401", async () => {
                    let res = await request(server)
                        .get("/api/shipment/waiting")
                    expect(res.statusCode).toEqual(401);
                    expect(res.body.message).toEqual('You\'re not authenticated');
                });
            });

            describe('[Given] Biker is trying to find the available shipments', () => {
                it("[Then] Should respond with available shipments", async () => {
                    let res = await request(server)
                        .get("/api/shipment/waiting")
                        .auth(bikerToken, { type: 'bearer' });
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data[0].customer.fullName).toBeDefined()
                    expect(res.body.data[0].customer.password).toBeUndefined()
                    expect(res.body.data[0].pickUpAddress).toBeDefined()
                    expect(res.body.data[0].pickOfAddress).toBeDefined()
                    expect(res.body.data[0].shipmentStatus).toBeDefined()
                });
            });
        });
    });

});
