import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { createToken } from "@/helpers";
import mongoose from "mongoose";

describe("[Shipments APIs] | CreateShipment API", () => {
    const bikerToken = createToken({ username: "bikerTest", fullname: "biker", _id: "63a22b00a704bee4b0254f4c", role: "biker" });
    const customerToken = createToken({ username: "customerTest", fullname: "customer", _id: "63a22b00a704bee4b0254f4d", role: "customer" });

    afterAll(async () => {
        await mongoose.disconnect();
        server.close();
    })
    describe("[Given] Someone is trying to create a shipment", () => {

        describe('[When] biker is trying to create a shipment', () => {
            it("[Then] Should respond with 403", async () => {
                let res = await request(server)
                    .post("/api/shipment/")
                    .auth(bikerToken, { type: 'bearer' })
                    .send({});
                expect(res.statusCode).toEqual(403);
                expect(res.body.message).toEqual('You\'re not authorized to perform this action');
            });
        });

        describe('[When] Customer is trying to create a shipment', () => {

            describe('[When] customer is not authenticated', () => {
                it("[Then] Should respond with 401", async () => {
                    let res = await request(server)
                        .post("/api/shipment/")
                        .send({});
                    expect(res.statusCode).toEqual(401);
                    expect(res.body.message).toEqual('You\'re not authenticated');
                });
            });

            describe('[When] Customer is trying to create a shipment with missing information', () => {
                it("[Then] Should respond with 400", async () => {
                    let res = await request(server)
                        .post("/api/shipment/")
                        .auth(customerToken, { type: 'bearer' })
                        .send({ shipmentDescription: "Rolex" });
                    expect(res.statusCode).toEqual(400);
                });
            });

            describe('[When] Customer is trying to create a shipment with correct information', () => {
                it("[Then] Should respond with 201", async () => {
                    let res = await request(server)
                        .post("/api/shipment/")
                        .auth(customerToken, { type: 'bearer' })
                        .send({ shipmentDescription: "Rolex", pickUpAddress: "Egypt", pickOfAddress: "Germany" });
                    expect(res.statusCode).toEqual(201);
                    expect(res.body.data.customer).toEqual('63a22b00a704bee4b0254f4d');
                    expect(res.body.data.pickOfAddress).toEqual('Germany');
                    expect(res.body.data.pickUpAddress).toEqual('Egypt');
                    expect(res.body.data.shipmentStatus).toEqual('WAITING');
                });
            });
        });
    });

});
