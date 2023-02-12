# Parcels Management System

<img width="1498" alt="Screen Shot 2022-12-23 at 6 20 37 PM" src="https://user-images.githubusercontent.com/46695441/209366911-9e92ea62-e6d5-4b45-bfdb-9dabdc243f48.png">


## Introduction **📺**

Parcels Management Service consists of the backend and the dashboard that will allow the customers to create shipments and bikers to pick and deliver them.

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
In the rest of the document, I will be discussing how I tried to achieve the requirements and the technical decisions around it.

## tl;dr - Installation

All of the system componenets is configured in the `docker-compose.yaml` file, that you don't need anything other than
- Clone the project and `cd` into it
- Docker compose up
- Enjoy!

The backend will be running at `http://localhost:4040/api/`
</br>
The frontend will be running at `http://localhost:3005/auth/`

For the customers login info: 

user: `customer1`, `customer2`, `customer3`, `customer4` or `customer5`
</br>
pass: `password`

For the bikers login info:

user: `biker1`, `biker2`, `biker3`, `biker4`, `biker5`, `biker6`, `biker7`, `biker8`, `biker9` or `biker10`
</br>

pass: `password`


Note: if you're willing to run the backend locally, without docker, don't forget to change the module alias configuration in package.json to:

```JS
  "_moduleAliases": {
    "@": "."
  },
```


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

More technical details and information are explained below.

### Deep Dive

Firstly, for the server instansition, and the database conneciton creation, I've used the `Singleton` pattern to have a single instance of each, at any time 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/server.ts#L3-L25

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/providers/Database.ts#L7-L34

### Dependency Inversion

The `D` in `SOLID` was one of the most principles that I was focusing on not to break, I've really experienced before, the mess that occurs when we decide after months of work, that we need to change the database for example! what a mess that would be. I've fallen into it one day.
thus for critical service I've been always keeping the `Prograam to an interface not implementation` rule, in mind.  

I've used https://github.com/microsoft/tsyringe from microsoft as a lightweight `dependency injection` container, which made me able to inject the necessary services or modules in an easier, and controlable way. 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/di/production.ts#L10-L26

Thanks to the decorators, and our base abstractions we can simply program to interfaces and make `tsyringe` handles the rest. 

The diagram below explains how these layers are communicating with each other, with the help of our `container`:

![parcels-diagram excalidraw](https://user-images.githubusercontent.com/46695441/209352467-a39cd0a2-1599-4c0e-bb6f-0d8ec5322491.png)

By adhering to this archtechture, the Business logic is fully isolated, and can be developed and tested indepndently, this can be seen 
in the `Biker.service`, `Customer.service` or `Shipment.service`, at which you will find that they're only applying business logic, and just communicating with the data layer interface ( not an implemntation )

for example, the `customer service`

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/customer/Customer.service.ts#L7-L31

Such implemntation of the `services` with the `Repository pattern`

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/biker/repository/mongodb/BikerRepository.mongodb.ts#L5-L13

is making the `domain` use-casses totally independent from the `infrastructure` decisions, Because from our servicies point of view, 
it does not matter if our data is being stored in `PostgreSQL`, `MongoDB` or even `locally`, as long as we have a class that implements the interface and provides the methods we need everything is supposed to work.

And this's actually what I've made to `Mock` the database in the `e2e` tests.

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/customer/tests/mocks/CustomerRepository.mock.ts#L3-L27

### Controllers and Infrastrucutre

Preserving the decouplance between the components, puts some challenges, as our `services layer`, shouldn't know anything about the infrastructure layer
it shouldn't care or be impacted, if we used `Express.js` or `Nest.js`, a `REST` API, or maybe just a plain socket layer as main communication channel!

at our case, i'm using `REST APIs`, with `express.js`, thus the controllers are looking as following, for example the shipment controller: 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/shipment/Shipment.controller.ts#L11-L16

The service is injected, and is managed by the controller, this also have put some challenges into the `services` implemntation, as I needed to avoid throwing any `HTTP` Exceptions from them, because if we later decided not to use `REST` APIs, those errors from the services will break the decoupling, and we will then need to change the logic in the services, which's not really prefered IMO. We want to make the services fully isolated and independent.

Here's how I managed to avoid throwing errors in the services: 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/services/shipment/Shipment.service.ts#L39-L54

This's not the best way though, if I had more time, I'd rather prefer to have `domain exceptions`, that can be thrown from the services, and then with a simple switch case for example, errors can be checked in the controlelrs:

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

Where `NotFoundShipment` and `NotAllowedForPickingShipment` are domain exceptions, this way, the service is fully independent and don't need to know anything about the higher modules and layers, and in fact also if I've had more time I'd prefer to implement a more well-typed errors and success responses to returned from the services. Thanks to khalil stemmler, he have explained it very well here https://khalilstemmler.com/articles/enterprise-typescript-nodejs/functional-error-handling/. 


## Testing

I've put a huge efforts into testing to make the code fully covered, and that's what i've actually learned from contributing to open source, `tests` is one of the most important aspect, tests make us able to fix, debug, and add features more faster and easier, with being sure we didn't break anything. 

I've written almost 42 test case, and made it possible to run them against a real database or independently without the need of database connection ( thanks to `DIP` ).

<img width="1208" alt="Screen Shot 2022-12-23 at 5 13 38 PM" src="https://user-images.githubusercontent.com/46695441/209358160-e621c22c-b69f-40d1-baa0-8918d4f67773.png">

You can run the following commands for testing: 

https://github.com/iifawzi/parcels-delivery-service/blob/4094ff475e0ace6c6781f08009c22b03a08bb86d/backend/package.json#L30-L36

```TS
npm run test:e2e // for testing without database
npm run test:integration // communicating with a real database
npm run test:cov // will run both tests and gather the coverage reports. 
```

Note: before running the commands on your local machine, you need to change the module alias configuration in the package.json to: 

```TS
  "_moduleAliases": {
    "@": "."
  },
```


# Architecture - Frontend

For the frontend side, I've used `REACT`, `SCSS` and `Typescript`, resposntivity and modularity were kept in mind too while implemnting the frontend dashboard, I've tried as much as possible to divide THE files and the components in a well-structured manner, for better reusability of the shared components and for making it easier to develop and maintain the code. 

I've also used some components from `Material UI`

Below is the file strucute of the application: 

<img width="432" alt="Screen Shot 2022-12-23 at 5 43 07 PM" src="https://user-images.githubusercontent.com/46695441/209362128-1edbd6c2-dad4-40d9-9805-cf3eb857d1dd.png">


## Architecture - Frontend

### State Management

I've used the `useReducer` hook along with the `Context` for the state management across the application, and the simple `useState` hook, for in-component state. The contexts are defined in the `contexts` folder, and the providers with the reducers are defined in the `providers` folder

https://github.com/iifawzi/parcels-delivery-service/blob/42b2bb538cdcf4eb115633f43f1a108c133a2374/frontend/src/providers/auth/Auth.provider.tsx#L9-L18
https://github.com/iifawzi/parcels-delivery-service/blob/42b2bb538cdcf4eb115633f43f1a108c133a2374/frontend/src/providers/auth/authReducer.ts#L4-L13

### Components, Pages, and containers 

I've put all of the shared components under the `components/shared` folder, and kept the pages as simple as possible and moved all the forms and complex views to the `components` page as well.

for the containers, I'm using them for grouping the related paths and pages together, so I can simply apply the `protection` components against them easily

The main app router, pointing to the container with applying the required protection rules using the proection components: 

https://github.com/iifawzi/parcels-delivery-service/blob/42b2bb538cdcf4eb115633f43f1a108c133a2374/frontend/src/App.tsx#L8-L23

The containers: 

https://github.com/iifawzi/parcels-delivery-service/blob/42b2bb538cdcf4eb115633f43f1a108c133a2374/frontend/src/containers/DashboardContainer.tsx#L5-L14

And lastly the protection components: 

- Guest pages: 
This helper component will not allow authenticated users from opening/navigating/routing to the routes that are allowed only for guests ( a logged in user for examole shouldn't be allowed to navigate to the auth pages ). 
https://github.com/iifawzi/parcels-delivery-service/blob/42b2bb538cdcf4eb115633f43f1a108c133a2374/frontend/src/protection/guestRoute.tsx#L7-L23

- Protected pages: 
This helper component will not allow the guest users from opening/navigating/routing to the pages that require authentication ( dashboard ).
https://github.com/iifawzi/parcels-delivery-service/blob/42b2bb538cdcf4eb115633f43f1a108c133a2374/frontend/src/protection/protectedRoute.tsx#L7-L23

- Allowed for specific roles pages: 
This helper component will only allow the authorized users to opening/navigating/routing to their specific pages ( a biker shouldn't be allowed to navigate to the customers routes - new shipmnent route -  for example. )
https://github.com/iifawzi/parcels-delivery-service/blob/42b2bb538cdcf4eb115633f43f1a108c133a2374/frontend/src/protection/AllowedForRoute.tsx#L5-L11

### Services

I've created a service layer to manage the communication with the APIs, by creating a base `HTTP` abstract class, that's extended by each service: 

The base HTTP Class: 

https://github.com/iifawzi/parcels-delivery-service/blob/917827d1ce752d6c9570c84e8d8e8913e5c3e628/frontend/src/services/base.ts#L4-L22

The `bikerServices` class for example: 
https://github.com/iifawzi/parcels-delivery-service/blob/917827d1ce752d6c9570c84e8d8e8913e5c3e628/frontend/src/services/biker/index.ts#L5-L11


### Some Views of the Application 

<img width="1422" alt="Screen Shot 2022-12-23 at 8 54 53 PM" src="https://user-images.githubusercontent.com/46695441/209394364-3779e347-990c-4e02-8c50-ab0c3c9e5a69.png">
<img width="1494" alt="Screen Shot 2022-12-23 at 5 58 35 PM" src="https://user-images.githubusercontent.com/46695441/209366942-6e1cab96-9250-4a20-999a-68c6d62f4b6d.png">
<img width="1555" alt="Screen Shot 2022-12-23 at 6 18 15 PM" src="https://user-images.githubusercontent.com/46695441/209366952-3bb6b7c5-ac21-4031-a362-ec9e5b606828.png">
<img width="1523" alt="Screen Shot 2022-12-23 at 6 18 37 PM" src="https://user-images.githubusercontent.com/46695441/209366957-2965f93c-0b69-4e29-829d-6cf8f614d4fc.png">
<img width="1535" alt="Screen Shot 2022-12-23 at 6 24 06 PM" src="https://user-images.githubusercontent.com/46695441/209367364-a801dbac-9116-4fb9-943c-2a4e82e0614e.png">
<img width="1494" alt="Screen Shot 2022-12-23 at 6 23 59 PM" src="https://user-images.githubusercontent.com/46695441/209367368-9ea854ae-e4e1-4ba5-9b2c-9f043789ef3a.png">
<img width="1498" alt="Screen Shot 2022-12-23 at 6 20 37 PM" src="https://user-images.githubusercontent.com/46695441/209366973-373f7c7e-d455-475f-ad70-c7c75665c4de.png">
<img width="867" alt="Screen Shot 2022-12-23 at 6 22 13 PM" src="https://user-images.githubusercontent.com/46695441/209367093-d372540a-0a7a-42db-9c5c-1d2e59ed3455.png">
<img width="863" alt="Screen Shot 2022-12-23 at 6 25 29 PM" src="https://user-images.githubusercontent.com/46695441/209367494-b650f72c-2e83-4373-ad93-e3471847c9ec.png">


# Conclusions 

All of the work mentioned above have been done in the past 4 days, I'm pretty sure there're a lot of areas, aspects, and decisions that can be improved. 
but the time was the main constraint: 

- The most important one of them, is the types, I've used `any` at many places because having a proper and correct types would time, so at some places, I decided to use `any`, if I had more time i'd ensure that everything is well typed. 

- I've also planned to add a `Continious integration`, so the `e2e` tests can run on each commit / pull request, which's possible due to the fact that we're testing against a mocked database. 

- The error handling and the domain exceptions, as mentioned above. 

- Using `class-validator` and data-transfer-objects (DTOs) instead of JOI. 

- Adding `Swagger` documintation for the APIs

- Moving the errors messages to a single file, instead of having them directly set in-place.

- Using `socket` for the shipments status updates, so the biker and the customer can see the changes in real time

- Focusing in decreasing the lage components files, by splitting them into more shared components. 

- I'm not that good at `UX`, I'm pretty sure the dashboard components is subject to a lot of improvements too. 

- Applying DDD techniques to have the domain fully isolated, for the current implemntation, I've only focused into having the use-casses isolated, but in fact, there're no domain objects involved, this's huge to be implemented in 4 days, I've planned to work on it, but then relized that this will not be finished in 4 days, thus decided to relax the complixity and focus on the use-casses. 
Btw, here's a sketch of the initial plan before relaxing the complixity ( just initial thoughts, not completed and might have some business-defects ). 

![Untitled-2022-12-19-1817 excalidraw](https://user-images.githubusercontent.com/46695441/209370480-f72f10cd-2d04-469c-94ff-f5c91b89d117.png)


That's it think. I've really enjoyed working on this, and spent too much time ensuring and caring about the testability and the code quality. 

</br>
</br>

You might also love to take a look on some of the other open-source sample projects that I created recently: 
- Learning Platform (`Javascript` with `Express`): https://github.com/iifawzi/learning-platform-backend
- Chatting System (`Typescript` with `Nest.js`) : https://github.com/iifawzi/nestjs-microservices-kafka

</br>

Let's always hope we keep learning, love what we're doing, and more importantly, caring about our users. 
</br>
If you reached this section, thank you for your time going through it, I hope you enjoyed it. 
Thank you!
