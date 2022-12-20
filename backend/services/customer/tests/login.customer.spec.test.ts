import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import { decodeToken } from "@/helpers/jwt";

describe("[Customers APIs] | Login API", () => {
    afterAll(() => {
        server.close();
    })
    describe("[Given] Customer is trying to login", () => {
        describe('[When] There is an error on the Schema', () => {
            it("[Then] Should respond with 400", async () => {
                let res = await request(server)
                    .post("/api/customer/login")
                    .send({
                        "username": "customer1",
                    });
                expect(res.statusCode).toEqual(400);
            });
        });

        describe('[When] The customer is not registered', () => {
            it("[Then] Should respond with 401", async () => {
                let res = await request(server)
                    .post("/api/customer/login")
                    .send({
                        "username": "notregistered",
                        "password": "anypassword"
                    });
                expect(res.statusCode).toEqual(401);
                expect(res.body.message).toEqual('You\'re not authenticated');
            });
        });

        describe('[When] The customer is registered but password is incorrect', () => {
            it("[Then] Should respond with 401", async () => {
                let res = await request(server)
                    .post("/api/customer/login")
                    .send({
                        "username": "customer1",
                        "password": "wrongpassword"
                    });
                expect(res.statusCode).toEqual(401);
                expect(res.body.message).toEqual('You\'re not authenticated');
            });
        });

        describe('[When] The customer is registered and password is correct', () => {
            it("[Then] Should respond with 200 and customer info", async () => {
                let res = await request(server)
                    .post("/api/customer/login")
                    .send({
                        "username": "customer1",
                        "password": "password"
                    });
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual('success');
                expect(res.body.data._id).toBeDefined();
                expect(res.body.data.username).toEqual('customer1');
                expect(res.body.data.fullName).toEqual('Customer Number 1');
                expect(res.body.data.password).toBeUndefined();
                expect(res.body.data.token).toBeDefined();
                const decodedToken = decodeToken(res.body.data.token) as Record<string, any>;
                expect(decodedToken._id).toEqual(res.body.data._id);
                expect(decodedToken.username).toEqual(res.body.data.username);
                expect(decodedToken.fullName).toEqual(res.body.data.fullName);
                expect(decodedToken.password).toBeUndefined();
            });
        });
    });

});
