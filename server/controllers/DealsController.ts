import { DealsService, LoggingService } from "../services";
import { Constants } from "../utils";

class DealsController {
  constructor(
    private dealsService: DealsService,
    private loggingService: LoggingService
  ) {
    this.createConfig = this.createConfig.bind(this);
    this.startDeal = this.startDeal.bind(this);
    this.closeDeal = this.closeDeal.bind(this);
  }

  async startDeal(req: any, res: any, next: any): Promise<void> {
    const { quantity, price, pair } = req.body;
    await this.dealsService.openDeal(pair, price, quantity);
    return res.status(Constants.StatusCodes.Success).send({ success: true });
  }

  async createConfig(req: any, res: any, next: any): Promise<void> {
    const { basePrice, lossMargin, profitMargin, pair } = req.body;
    await this.dealsService.createConfig(
      basePrice,
      lossMargin,
      profitMargin,
      pair
    );
    return res.status(Constants.StatusCodes.Success).send({ success: true });
  }

  async closeDeal(req: any, res: any, next: any): Promise<void> {
    const { price, id } = req.body;
    await this.dealsService.closeDeal(id, price);
    return res.status(Constants.StatusCodes.Success).send({ success: true });
  }
}

export default DealsController;
