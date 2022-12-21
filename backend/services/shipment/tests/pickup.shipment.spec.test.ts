import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { createToken } from "@/helpers";

describe("[Shipments APIs] | pickupShipment API", () => {
    const bikerToken = createToken({ username: "bikerTest", fullname: "biker", _id: "598398298198", role: "biker" });
    const customerToken = createToken({ username: "customerTest", fullname: "customer", _id: "99ZKJA98198A", role: "customer" });

    afterAll(() => {
        server.close();
    })
    describe("[Given] Someone is trying to create a shipment", () => {

        describe('[When] Customer is trying to pickup a shipment', () => {
            it("[Then] Should respond with 403", async () => {
                let res = await request(server)
                    .patch("/api/shipment/")
                    .auth(customerToken, { type: 'bearer' })
                    .send({});
                expect(res.statusCode).toEqual(403);
                expect(res.body.message).toEqual('You\'re not authorized to perform this action');
            });
        });

        describe('[When] Biker is trying to create a shipment', () => {

            describe('[When] Biker is not authenticated', () => {
                it("[Then] Should respond with 401", async () => {
                    let res = await request(server)
                        .patch("/api/shipment/")
                        .send({});
                    expect(res.statusCode).toEqual(401);
                    expect(res.body.message).toEqual('You\'re not authenticated');
                });
            });

            describe('[When] Biker is trying to pickup a shipment with missing information', () => {
                it("[Then] Should respond with 400", async () => {
                    let res = await request(server)
                        .patch("/api/shipment/")
                        .auth(bikerToken, { type: 'bearer' })
                        .send({ pickupTime: new Date().getTime() });
                    expect(res.statusCode).toEqual(400);
                });
            });

            describe('[Given] Biker is trying to create a shipment with correct information', () => {
                describe('[When] Shipment is not found', () => {
                    it("[Then] Should respond with 409", async () => {
                        let res = await request(server)
                            .patch("/api/shipment/")
                            .auth(bikerToken, { type: 'bearer' })
                            .send({ pickupTime: new Date().getTime(), deliveryTime: new Date().getTime(), shipmentId: "1029092" });
                        expect(res.statusCode).toEqual(409);
                        expect(res.body.message).toEqual('Shipment is not found');
                    });
                })

                describe('[When] Shipment can\'t be picked', () => {
                    it("[Then] Should respond with 609", async () => {
                        let res = await request(server)
                            .patch("/api/shipment/")
                            .auth(bikerToken, { type: 'bearer' })
                            .send({ pickupTime: new Date().getTime(), deliveryTime: new Date().getTime(), shipmentId: "63a271ebbe91afafb4d48c61" });
                        expect(res.statusCode).toEqual(609);
                        expect(res.body.message).toEqual('Shipment can\'t be picked');
                    });
                })

                describe('[When] Shipment is pickable', () => {
                    it("[Then] Should respond with 200", async () => {
                        let res = await request(server)
                            .patch("/api/shipment/")
                            .auth(bikerToken, { type: 'bearer' })
                            .send({ pickupTime: new Date().getTime(), deliveryTime: new Date().getTime(), shipmentId: "63a271ebbe91afafb4d48c62" });
                        expect(res.statusCode).toEqual(200);
                        expect(res.body.data).toEqual(true);
                    });
                })
            });
        });
    });

});
