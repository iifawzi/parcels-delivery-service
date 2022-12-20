import { Database } from "../providers/Database";
import { ConsoleLogger } from "../utils";
import { Lifecycle, container } from "tsyringe";


container.register("logger", { useClass: ConsoleLogger }, { lifecycle: Lifecycle.Singleton });
container.register<Database>("database", { useClass: Database }, { lifecycle: Lifecycle.Singleton });