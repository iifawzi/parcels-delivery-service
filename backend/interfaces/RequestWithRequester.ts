import express from "express"

export interface RequesterInfo {
    _id: string,
    role: string,
    username: string,
    fullname: string
}

export default interface RequestWithRequester extends express.Request {
    requester?: RequesterInfo
}