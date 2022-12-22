import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { createToken } from "@/helpers";
import mongoose from "mongoose";
import ShipmentModel from "../repository/mongodb/shipment.model";

describe("[Shipments APIs] | bikerShipments API", () => {
    const bikerToken = createToken({ username: "bikerTest", fullname: "biker", _id: "63a22b00a704bee4b0254f4c", role: "biker" });
    const customerToken = createToken({ username: "customerTest", fullname: "customer", _id: "63a22b00a704bee4b0254f4d", role: "customer" });

    beforeAll(async () => {
        if (process.env.NODE_ENV === 'integration') {
            if (process.env.NODE_ENV === 'integration') {
                await ShipmentModel.deleteMany({});
                await ShipmentModel.create(
                    {
                        _id: new mongoose.Types.ObjectId("63a271ebbe91afafb4d48c67"),
                        customer: new mongoose.Types.ObjectId("63a22b00a704bee4b0254f4d"),
                        pickUpAddress: "Egypt",
                        shipmentDescription: "WATCH",
                        dropOfAddress: "Germany",
                        shipmentStatus: "PICKED",
                        biker: new mongoose.Types.ObjectId("63a22b00a704bee4b0254f4c"),
                        deliveryTime: new Date().getTime(),
                        pickupTime: new Date().getTime(),
                    },
                )
            }
        }
    });

    afterAll(async () => {
        await mongoose.disconnect();
        server.close();
    })
    describe("[Given] Someone is trying to find the biker shipments", () => {

        describe('[When] Customer is trying to find the biker shipments', () => {
            it("[Then] Should respond with 403", async () => {
                let res = await request(server)
                    .get("/api/shipment/bikerShipments")
                    .auth(customerToken, { type: 'bearer' })
                    .send({});
                expect(res.statusCode).toEqual(403);
                expect(res.body.message).toEqual('You\'re not authorized to perform this action');
            });
        });

        describe('[When] Biker is trying to find his shipments', () => {

            describe('[When] Biker is not authenticated', () => {
                it("[Then] Should respond with 401", async () => {
                    let res = await request(server)
                        .get("/api/shipment/bikerShipments")
                    expect(res.statusCode).toEqual(401);
                    expect(res.body.message).toEqual('You\'re not authenticated');
                });
            });

            describe('[Given] Biker is authenticated', () => {
                it("[Then] Should respond with his shipments", async () => {
                    let res = await request(server)
                        .get("/api/shipment/bikerShipments")
                        .auth(bikerToken, { type: 'bearer' })
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data[0].deliveryTime).toBeDefined()
                    expect(res.body.data[0].pickupTime).toBeDefined()
                    expect(res.body.data[0].pickUpAddress).toBeDefined()
                    expect(res.body.data[0].dropOfAddress).toBeDefined()
                    expect(res.body.data[0].shipmentStatus).toBeDefined()
                });
            });
        });
    });

});
