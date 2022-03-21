import { DealsService, LoggingService } from "../services";
import { Constants } from "../utils";
<<<<<<< HEAD
=======
// import autoBind from "auto-bind";
>>>>>>> fb3a8bc (Updates to make it work)

class DealsController {
  constructor(private dealsService: DealsService, private loggingService: LoggingService) {
    this.createConfig = this.createConfig.bind(this);
    this.startDeal = this.startDeal.bind(this);
<<<<<<< HEAD
    this.closeDeal = this.closeDeal.bind(this);
=======
>>>>>>> fb3a8bc (Updates to make it work)
  }

  async startDeal(req: any, res: any, next: any): Promise<void> {
    const {
      quantity,
      price,
      pair,
    } = req.body;
    await this.dealsService.openDeal(pair, price, quantity);
    return res.status(Constants.StatusCodes.Success).send({ success: true });
  }

  async createConfig(req: any, res: any, next: any): Promise<void> {
    const {
      basePrice,
      lossMargin,
      profitMargin,
      pair
    } = req.body;
    await this.dealsService.createConfig(basePrice, lossMargin, profitMargin, pair);
    return res.status(Constants.StatusCodes.Success).send({ success: true });
<<<<<<< HEAD
  }

  async closeDeal(req: any, res: any, next: any): Promise<void> {
    const {
      price,
      id,
    } = req.body;
    await this.dealsService.closeDeal(id, price);
    return res.status(Constants.StatusCodes.Success).send({ success: true });
=======
>>>>>>> fb3a8bc (Updates to make it work)
  }
}

export default DealsController;
