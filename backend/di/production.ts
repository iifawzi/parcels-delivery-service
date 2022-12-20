import { ConsoleLogger } from "../utils";
import { Lifecycle, container } from "tsyringe";


container.register("logger", { useClass: ConsoleLogger }, { lifecycle: Lifecycle.Singleton });