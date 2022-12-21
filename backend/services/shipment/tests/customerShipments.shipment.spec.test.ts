import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { createToken } from "@/helpers";

describe("[Shipments APIs] | customerShipments API", () => {
    const bikerToken = createToken({ username: "bikerTest", fullname: "biker", _id: "63a22b00a704bee4b0254f4c", role: "biker" });
    const customerToken = createToken({ username: "customerTest", fullname: "customer", _id: "63a22b00a704bee4b0254f4d", role: "customer" });

    afterAll(() => {
        server.close();
    })
    describe("[Given] Someone is trying to find the customer shipments", () => {

        describe('[When] Biker is trying to find the customer shipments', () => {
            it("[Then] Should respond with 403", async () => {
                let res = await request(server)
                    .get("/api/shipment/customerShipments")
                    .auth(bikerToken, { type: 'bearer' })
                    .send({});
                expect(res.statusCode).toEqual(403);
                expect(res.body.message).toEqual('You\'re not authorized to perform this action');
            });
        });

        describe('[When] Customer is trying to find his shipments', () => {

            describe('[When] Customer is not authenticated', () => {
                it("[Then] Should respond with 401", async () => {
                    let res = await request(server)
                        .get("/api/shipment/customerShipments")
                    expect(res.statusCode).toEqual(401);
                    expect(res.body.message).toEqual('You\'re not authenticated');
                });
            });

            describe('[Given] Customer is authenticated', () => {
                    it("[Then] Should respond with his shipments", async () => {
                        let res = await request(server)
                            .get("/api/shipment/customerShipments")
                            .auth(customerToken, { type: 'bearer' })
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.data[0].pickUpAddress).toBeDefined()
                        expect(res.body.data[0].pickOfAddress).toBeDefined()
                        expect(res.body.data[0].shipmentStatus).toBeDefined()
                    });
            });
        });
    });

});
