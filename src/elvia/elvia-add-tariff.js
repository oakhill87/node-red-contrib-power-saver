const { DateTime } = require("luxon");
const { getTariffForPeriod, ping } = require("./elvia-api");
const { roundPrice } = require("../utils");

module.exports = function (RED) {
  function PsElviaAddTariffNode(config) {
    RED.nodes.createNode(this, config);
    this.elviaConfig = RED.nodes.getNode(config.elviaConfig);
    const key = this.elviaConfig.credentials.elviaSubscriptionKey;
    this.tariffKey = config.tariffKey;
    this.range = config.range;
    const node = this;
    ping(node, key);

    node.on("input", function (msg) {
      const prices = msg.payload.priceData;
      if (!prices) {
        node.warn(
          "No price data received on input. Did you use the ps-receive-price node or convert to correct format otherwise?"
        );
        return;
      }
      const fromTime = prices[0].start.substr(0, 19);
      const toTime = DateTime.fromISO(prices[prices.length - 1].start)
        .plus({ hours: 1 })
        .toISO()
        .substr(0, 19);

      getTariffForPeriod(node, key, node.tariffKey, fromTime, toTime).then((json) => {
        const tariff = json;
        const priceInfo = tariff.gridTariff.tariffPrice.priceInfo;
        if (priceInfo.length !== prices.length) {
          node.warn(`Elvia tariff count mismatch. Expected ${prices.length} items, but got ${priceInfo.length}`);
          node.status({ fill: "red", shape: "dot", text: "Tariff error" });
        } else {
          prices.forEach((p, i) => {
            p.powerPrice = p.value;
            p.gridTariffVariable = priceInfo[i].variablePrice.total;
            p.value = roundPrice(p.powerPrice + p.gridTariffVariable);
          });
        }
        node.send([{ payload: { priceData: prices } }]);
      });
    });
  }

  RED.nodes.registerType("ps-elvia-add-tariff", PsElviaAddTariffNode);
};
