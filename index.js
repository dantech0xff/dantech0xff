const fs = require("fs");
const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

var checkMarketInfo = async () => {
  let globalResponse = await CoinGeckoClient.global();

  if (globalResponse != null && globalResponse["code"] == 200) {
    const data = globalResponse["data"]["data"];

    const active_cryptocurrencies = data["active_cryptocurrencies"];
    const total_market_cap = data["total_market_cap"];
    const total_volume = data["total_volume"];
    const market_cap_percentage = data["market_cap_percentage"];
    const market_cap_change_percentage_24h_usd =
      data["market_cap_change_percentage_24h_usd"];
    const updateAt = data["updated_at"];

    // console.log(active_cryptocurrencies)
    // console.log(total_market_cap)
    // console.log(total_volume)
    // console.log(market_cap_percentage)
    // console.log(market_cap_change_percentage_24h_usd)
    // console.log(updateAt)

    const str1 = "- Active Crypto: " + active_cryptocurrencies;
    const str2 =
      "- % Market Cap: " +
      '<span style="color: green; font-weight: bold;">BTC ' +
      market_cap_percentage["btc"].toFixed(2) +
      "%</span>" +
      " | " +
      '<span style="color: blue; font-weight: bold;">ETH ' +
      market_cap_percentage["eth"].toFixed(2) +
      "%</span>" +
      " | " +
      '<span style="color: gold; font-weight: bold;">BNB ' +
      market_cap_percentage["bnb"].toFixed(2) +
      "%</span>";
    const str3 =
      "- Total Market Cap Changed 24h: " +
      market_cap_change_percentage_24h_usd.toFixed(2) +
      "%";

    //     console.log(str1)
    //     console.log(str2)
    //     console.log(str3)
    //     console.log(str4)

    var extractReadMe = fs.readFileSync("template.md").toString();
    //     console.log(typeof extractReadMe)
    extractReadMe = extractReadMe.replace(
      "{CRYPTO_DATA_HERE}",
      str1 + "\n" + str2 + "\n" + str3
    );
    fs.writeFileSync("README.md", extractReadMe);
  }
};

checkMarketInfo();
