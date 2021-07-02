// Node modules.
import React, { Component } from "react";
import { find, map, take } from "lodash";
// Relative imports.
import ATHDiffAPI from "../../services/athDiffAPI";
import { Wrapper } from "./styles";

// Derive our coin market cap API SDK.
const athDiffAPI = new ATHDiffAPI();

class Cryptos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: [],
      error: "",
      fetching: false,
      limit: 50,
      start: 1,
    };
  }

  componentDidMount() {
    this.fetchCryptos();
  }

  fetchCryptos = async () => {
    const { limit, start } = this.state;

    // Set the fetching state.
    this.setState({ fetching: true });

    // Fetch the cryptos.
    try {
      const cryptos = await athDiffAPI.getCryptos({
        limit,
        start,
      });
      console.log("cryptos", cryptos);

      // Derive formatted cryptos.
      // const formattedCryptos = map(cryptos, (crypto) => ({
      //   ...crypto,
      //   id: crypto?.asset_id,
      //   iconURL: find(assetIcons, ['asset_id', crypto?.asset_id])?.url,
      //   volume24Hours: crypto?.volume_1hrs_usd,
      //   currentPriceUSD: crypto?.price_usd,
      //   allTimeHighPriceUSD:
      //   athDiff:
      //   athDiffPercent:
      //   icon: assetIcons[crypto.id],
      // }));

      // Set the cryptos and our fetched state.
      this.setState({ cryptos, fetching: false });

      // Handle API request errors.
    } catch (error) {
      this.setState({
        error:
          "Oops, we are unable to get a response from our servers. Our engineers are looking into it now.",
        fetching: false,
      });
      throw new Error(error);
    }
  };

  render() {
    const { cryptos, error, fetching } = this.state;

    // Show a loading indicator when fetching.
    if (fetching) {
      return <Wrapper>Loading...</Wrapper>;
    }

    return (
      <Wrapper>
        {error && <p className="error">{error}</p>}
        <ul>
          {map(cryptos, (crypto) => {
            // Derive crypto properties.
            const id = crypto?.id;
            const name = crypto?.name;
            const iconURL = crypto?.iconURL;
            const volume24Hours = crypto?.volume24Hours;
            const currentPriceUSD = crypto?.currentPriceUSD;
            const allTimeHighPriceUSD = crypto?.allTimeHighPriceUSD;

            // Derive the ATH vs current price diff.
            const athDiff = allTimeHighPriceUSD - currentPriceUSD;
            const athDiffPercent = (athDiff / currentPriceUSD) * 100;

            return (
              <li key={id}>
                <img alt={`${id} icon`} src={iconURL} />
                <h2>
                  {crypto} <span className="crypto-id">{id}</span>
                </h2>

                <div className="group">
                  <p className="label">Price</p>
                  <p className="value">
                    {currentPriceUSD?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>

                <div className="group">
                  <p className="label">24h Volume</p>
                  <p className="value">
                    {volume24Hours?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>

                <div className="group">
                  <p className="label">All Time High (ATH)</p>
                  <p className="value">
                    {allTimeHighPriceUSD?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>

                <div className="group">
                  <p className="label">ATH Diff</p>
                  <p className="value">
                    {athDiff?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="value">{athDiffPercent}%</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    );
  }
}

export default Cryptos;
