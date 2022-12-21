import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { createToken } from "@/helpers";

describe("[Shipments APIs] | deliverShipment API", () => {
    const bikerToken = createToken({ username: "bikerTest", fullname: "biker", _id: "63a22b00a704bee4b0254f4c", role: "biker" });
    const bikerToken2 = createToken({ username: "bikerTest2", fullname: "biker2", _id: "63a22b00a704bee4b0254f4e", role: "biker" });
    const customerToken = createToken({ username: "customerTest", fullname: "customer", _id: "63a22b00a704bee4b0254f4d", role: "customer" });

    afterAll(() => {
        server.close();
    })
    describe("[Given] Someone is trying to deliver a shipment", () => {

        describe('[When] Customer is trying to deliver a shipment', () => {
            it("[Then] Should respond with 403", async () => {
                let res = await request(server)
                    .patch("/api/shipment/deliver")
                    .auth(customerToken, { type: 'bearer' })
                    .send({});
                expect(res.statusCode).toEqual(403);
                expect(res.body.message).toEqual('You\'re not authorized to perform this action');
            });
        });

        describe('[When] Biker is trying to deliver a shipment', () => {

            describe('[When] Biker is not authenticated', () => {
                it("[Then] Should respond with 401", async () => {
                    let res = await request(server)
                        .patch("/api/shipment/deliver")
                        .send({});
                    expect(res.statusCode).toEqual(401);
                    expect(res.body.message).toEqual('You\'re not authenticated');
                });
            });

            describe('[When] Biker is trying to mark shipment as delivered with missing information', () => {
                it("[Then] Should respond with 400", async () => {
                    let res = await request(server)
                        .patch("/api/shipment/deliver")
                        .auth(bikerToken, { type: 'bearer' })
                        .send({ shipmentStatus: 'DELIVERED' });
                    expect(res.statusCode).toEqual(400);
                });
            });

            describe('[Given] Biker is trying to mark shipment as delivered with correct information', () => {
                describe('[When] Shipment is not found', () => {
                    it("[Then] Should respond with 409", async () => {
                        let res = await request(server)
                            .patch("/api/shipment/deliver")
                            .auth(bikerToken, { type: 'bearer' })
                            .send({ shipmentId: "1029092" });
                        expect(res.statusCode).toEqual(409);
                        expect(res.body.message).toEqual('Shipment is not found');
                    });
                })


                describe('[When] a biker is trying mark the Shipment of another biker as delivered', () => {
                    it("[Then] Should respond with 709", async () => {
                        let res = await request(server)
                            .patch("/api/shipment/deliver")
                            .auth(bikerToken, { type: 'bearer' })
                            .send({ shipmentId: "63a271ebbe91afafb4d48c64" });
                        expect(res.statusCode).toEqual(409);
                        expect(res.body.message).toEqual('Shipment is not found');
                    });
                })

                describe('[When] Shipment is not in the correct state to mark it delivered', () => {
                    it("[Then] Should respond with 609", async () => {
                        let res = await request(server)
                            .patch("/api/shipment/deliver")
                            .auth(bikerToken2, { type: 'bearer' })
                            .send({ shipmentId: "63a271ebbe91afafb4d48c65" });
                        expect(res.statusCode).toEqual(609);
                        expect(res.body.message).toEqual('Shipment can\'t be delivered');
                    });
                })

                describe('[When] Shipment can be marked delivered', () => {
                    it("[Then] Should respond with 200", async () => {
                        let res = await request(server)
                            .patch("/api/shipment/deliver")
                            .auth(bikerToken, { type: 'bearer' })
                            .send({ shipmentId: "63a271ebbe91afafb4d48c63" });
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.data).toEqual(true);
                    });
                })
            });
        });
    });

});