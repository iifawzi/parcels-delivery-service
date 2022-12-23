# Parcels Management System

## Introduction **📺**

Parcels Management Service consists of the backend and the dashboard that will allow the customers to create shipments and bikers to pick and deliver them. 
it's for Saloodo’s task for the Javascript Engineer hiring process.

In this document I will give you an overview about the project, grab a cup of coffee ☕, there're a lot of techncalities and fun.

## Requirements

• A sender should be able to create a parcel to be delivered by specifying pick-up and drop-off address (should be just a text field, no need for address validation)
</br>

• A sender should be able to see the status of his parcels.
</br>

• A biker should be able to see a list of the parcels.
</br>

• A biker should be able to pick up a parcel.
</br>

• Once a parcel is picked up by a biker, it cannot be picked up by other bikers.
</br>

• A biker should be able to input the timestamp of the pickup and the delivery for each order.
</br>

• The status of the order should be updated for the sender.
</br>


</br>
In this rest of the document, I will be discussing how I tried to achieve the requirements. 

## Principles and goals

---

Since day 1, principles and goals were set to deliver a very high quality and fulfill the requirements in an elegant, and modern way 
with giving the testability and modularity the highest priorty. 


## Architecture - Backend

For the backend, I've used `typescript` with `express`, and tried as much as possible to follow the `SOLID` Principles.

### Files Structure 

There're multiple folders and files created to preserve the modularity and for making classes and functions more focused adhering to the `single responsibility`
below is the file strucutre of the services, where each service have its `tests` and `repositories` implementations along with the other `REST` needed files ( router, controller, validation )

<img width="375" alt="Screen Shot 2022-12-23 at 5 04 33 PM" src="https://user-images.githubusercontent.com/46695441/209357229-f95a233c-1ae6-4363-8edb-fcd5bb9910f1.png">

More informations will be explained below: 

### Deep Dive

Firstly, for the server instansition, and the database conneciton creation, I've used the `Singleton` pattern to have a single instance of each, at any time 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/server.ts#L3-L25

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/providers/Database.ts#L7-L34

### Dependency Inversion

The `D` in `SOLID` was one of the most principles that I was focusing on not to break, I've really experienced before, the mess that occurs when we decide after months of work, that we need to change the database for examole! what a mess that would be. I've fallen into it one day.
thus for critical service I've been always keeping the `Prograam to an interface not implementation` rule, in mind.  

I've used https://github.com/microsoft/tsyringe from microsoft as a lightweight `dependency injection` container, which made me able to inject the necessary services or modules in an easier, and controlable way. 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/di/production.ts#L10-L26

Thanks to the decorators, and our base abstractions we can simply program to interfaces and make `tsyringe` handles the rest. 

The diagram below explains how the these layers are communicating with each other, with the help of our `container`:

![parcels-diagram excalidraw](https://user-images.githubusercontent.com/46695441/209352467-a39cd0a2-1599-4c0e-bb6f-0d8ec5322491.png)

By adhering to this archtechture, the Business logic is fully isolated, and can be developed and tested indepndently, this can be seen 
in the `Biker.service`, `Customer.service` and `Shipment.service`, at which you will find that they're only applying business logic, and communicating with the data layer interface ( not an implemntation )

for example, the `customer service`

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/customer/Customer.service.ts#L7-L31

Such implemntation of the `services` with the `Repository pattern`

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/biker/repository/mongodb/BikerRepository.mongodb.ts#L5-L13

is making the `domain` use-casses totally independent from the `infrastructure` decisions, Because from our servicies point of view, 
it does not matter if our data is being stored in `PostgreSQL`, `MongoDB` or even `locally`, as long as we have a class that implements the interface and provides the methods we need everything is supposed to work.

And this's actually what I've made to `Mock` the database in the `e2e` tests.

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/customer/tests/mocks/CustomerRepository.mock.ts#L3-L27

### Controllers and Infrastrucutre

Preservice the decouplance between the components, puts some challenges, as our `services layer`, shouldn't know anything about the infrastructure layer
it shouldn't care or be impacted, if used `Express.js` or `Nest.js`, a `REST` API, or maybe a socket layer as main communication channel!

at our case, i'm using `REST APIs`, with `express.js`, thus the controllers are looking as following, for example the shipment controller: 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/shipment/Shipment.controller.ts#L11-L16

The service is injected, and is managed by the controller, this also have put some challenges into the `services` implemntation, I needed to avoid throwing any `HTTP` Exceptions from them, 
because if we later decided to not using `REST` APIs, those errors from the services will break the decoupling, and we will then need to change the logic in the services, which's not really prefered IMO. We want to make the services fully isolated and independent.

Here's how I managed to avoid throwing errors in the services: 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/shipment/Shipment.service.ts#L39-L54

This's not the best way though, if I had more time, I'd rather prefer to have domain exceptions, that can be thrown from the services, and then with a simple 
switch case for example can be checked this way in the controlelrs: 

```ts

const [status, error] = await this.shipmentService.matchShipment(shimpentInfo);
if (!status) {
    switch (error) {
        case instanceof NotFoundShipment:
            throw new BaseError(409, 'Shipment is not found');
            case instanceof NotAllowedForPickingShipment:
            throw new BaseError(609, 'Shipment can\'t be picked');
    }
}

```

Where `NotFoundShipment` and `NotAllowedForPickingShipment` are domain exceptions. Actually also if I've had more time  I'd prefer to implement a more well-types errors and success responses 
from the services, thanks to khalil stemmler, he have explained it very well here https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling/


## Testing

I've put a huge efforts into testing to make the code fully tested and covered, and i've actually learned from contributing to open source that `tests` is the most important aspect, tests make us able to fix, debug, and add features more faster. 

I've written almost 41 test case, and made it possible to run them against a real database or independently without the need of database connection ( thanks to `DIP` ).

<img width="1208" alt="Screen Shot 2022-12-23 at 5 13 38 PM" src="https://user-images.githubusercontent.com/46695441/209358160-e621c22c-b69f-40d1-baa0-8918d4f67773.png">

You can run the following commands for testing: 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/package.json#L30-L36

```TS
npm run test:e2e // for testing without database
npm run test:integration // communicating with a real database
npm run test:cov // will run both tests and gather the coverage reports. 
```





