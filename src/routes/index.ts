import { Router } from "express"
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient"
import { ensureAuthenticateDeliveryman } from "../middlewares/ensureAuthenticateDeliveryman"
import { AuthenticateClientController } from "../modules/account/usecases/autenticateClient/AutheitcateClientController"
import { AuthenticateDeliverymanController } from "../modules/account/usecases/autenticateDeliveryman/AutheitcateDeliverymanController"
import { CreateClientController } from "../modules/clients/usecases/createClient/CreateClientController"
import { CreateDeliveryController } from "../modules/deliveries/usecases/createDelivery/CreateDeliveryController"
import { FindAllAvailableDeliveriesController } from "../modules/deliveries/usecases/findAllAvailableDeliveries/FindAllAvailableDeliveriesController"
import { UpdateDeliverymanController } from "../modules/deliveries/usecases/updateDeliveryman/UpdateDeliverymanController"
import { CreateDeliverymanController } from "../modules/deliveryman/usecases/createDeliveryman/CreateDeliverymanController"
import { FindAllDeliveriesController } from "../modules/clients/usecases/deliveries/FindAllDeliveriesController"
import { FindAllDeliveriesController as FindAllDeliveriesByDeliverymanController } from "../modules/deliveryman/usecases/deliveries/FindAllDeliveriesController"
import { UpdateEndDateController } from "../modules/deliveries/usecases/updateEndDate/UpdateEndDateController"

const routes = Router()

const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableDeliveriesController = new FindAllAvailableDeliveriesController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const findAllDeliveriesByDeliverymanController = new FindAllDeliveriesByDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

routes.post("/clients/authenticate", authenticateClientController.handle)
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle)

routes.post("/clients", createClientController.handle)
routes.get("/clients/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle)
routes.post("/deliveryman", createDeliverymanController.handle)
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesByDeliverymanController.handle)

routes.post("/deliveries", ensureAuthenticateClient, createDeliveryController.handle)
routes.get("/deliveries/available", ensureAuthenticateDeliveryman, findAllAvailableDeliveriesController.handle)
routes.patch("/deliveries/finished/:id_delivery", ensureAuthenticateDeliveryman, updateEndDateController.handle)
routes.patch("/deliveries/:id_delivery", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

export { routes }