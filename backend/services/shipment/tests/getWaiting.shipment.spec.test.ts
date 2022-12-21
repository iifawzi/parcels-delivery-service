import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { createToken } from "@/helpers";

describe("[Shipments APIs] | getWaiting API", () => {
    const bikerToken = createToken({ username: "bikerTest", fullname: "biker", _id: "63a22b00a704bee4b0254f4c", role: "biker" });
    const customerToken = createToken({ username: "customerTest", fullname: "customer", _id: "63a22b00a704bee4b0254f4d", role: "customer" });

    afterAll(() => {
        server.close();
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
                            .auth(bikerToken, { type: 'bearer' })
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.data[0].customer.fullName).toBeDefined()
                        expect(res.body.data[0].customer.password).toBeUndefined()
                        expect(res.body.data[0].pickUpAddress).toBeDefined()
                        expect(res.body.data[0].pickOfAddress).toBeDefined()
                        expect(res.body.data[0].shipmentStatus).toBeDefined()
                        expect(res.body.data[0].shipmentStatus).toBeDefined()
                    });
            });
        });
    });

});
