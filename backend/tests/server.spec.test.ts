import "reflect-metadata"
import request from 'supertest';
import server from "@/index"
import mongoose from "mongoose";

describe("[HEALTHY SERVER] | HEALTHY API", () => {
    afterAll(async () => {
        await mongoose.disconnect();
        server.close();
    });

    it("Should respond with 200", async () => {
        let res = await request(server)
            .get("/api/health")
            .send({});
        expect(res.statusCode).toEqual(200);
    });
});
