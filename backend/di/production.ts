import { ConsoleLogger } from "../utils";
import { container } from "tsyringe";


container.register("logger", { useClass: ConsoleLogger });