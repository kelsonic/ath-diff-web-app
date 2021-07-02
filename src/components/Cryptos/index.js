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
    };
  }

  componentDidMount() {
    this.fetchCryptos();
  }

  fetchCryptos = async () => {
    // Set the fetching state.
    this.setState({ fetching: true });

    // Fetch the cryptos.
    try {
      const cryptos = await athDiffAPI.getCryptos();
      console.log("cryptos", cryptos);

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
      <Wrapper color="blue">
        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* List of Cryptos */}
        <ul>
          {map(cryptos, (crypto) => {
            // Derive crypto properties.
            const id = crypto?.id;
            const name = crypto?.name;
            const logoURL = crypto?.logoURL;
            const volume24Hours = crypto?.quote?.USD?.volume_24h;
            const currentPriceUSD = crypto?.quote?.USD?.price;
            const athPriceUSD = crypto?.athPriceUSD;
            const athPriceDiffUSD = crypto?.athPriceDiffUSD;
            const athPriceDiffPercent = crypto?.athPriceDiffPercent;

            return (
              <li key={id}>
                <img alt={`${id} icon`} src={logoURL} />
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
                    {athPriceUSD?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>

                <div className="group">
                  <p className="label">ATH Diff</p>
                  <p className="value">
                    {athPriceDiffUSD?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="value">{athPriceDiffPercent}%</p>
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
