import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";

import TruffleContract from "truffle-contract";
import BetterMarket from "../../build/contracts/BetterMarket.json";
// import SmartPay from "../../build/contracts/SmartPay.json";
import data from "../data.json";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import { Route } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/app.css";

import Menu from "./Menu.js";
import $ from "jquery";
import utf8 from "utf8";
import ProductCarousel from "./container/ProductCarousel.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemid: 0,
      itemPrice: 0,
      buyerAddress: "",
      buyerName: "",
      buyerAge: "",
      events: [{ buyer: "", id: "" }]
    };

    this.pic = [];

    if (typeof web3 != "undefined") {
      this.web3Provider = web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545"
      );
    }

    this.web3 = new Web3(this.web3Provider);

    this.contracts = TruffleContract(BetterMarket);
    this.contracts.setProvider(this.web3Provider);
  }

  componentDidMount() {
    $(this.buyModalBox).on("show.bs.modal", e => {
      let modalId = e.relatedTarget.value;
      let obj = data.filter(c => {
        if (c.id == modalId) return c;
      });
      let id = obj[0].id;
      let price = this.web3.toWei(parseFloat(obj[0].price || 0), "ether");

      this.setState({ itemid: id, itemPrice: price });
    });

    $(this.buyerInfoModal).on("show.bs.modal", e => {
      let id = e.relatedTarget.value;

      this.contracts
        .deployed()
        .then(instance => {
          return instance.getBuyerInfo.call(id);
        })
        .then(buyerInfo => {
          this.setState({
            buyerAddress: buyerInfo[0],
            buyerName: web3.toUtf8(buyerInfo[1]),
            buyerAge: buyerInfo[2].toString()
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    });

    this.web3.eth.getAccounts((error, accounts) => {
      if (error) console.log(error);

      this.listenToEvents();
    });
  }

  listenToEvents = () => {
    this.contracts.deployed().then(instance => {
      instance
        .LogBuyBetterMarket({}, { fromBlock: 0, toBlock: "latest" })
        .watch((error, event) => {
          if (!error) {
            this.setState({
              events: this.state.events.concat({
                buyer: event.args._buyer,
                id: event.args._id.toString()
              })
            });
          } else {
            console.error(error);
          }
          this.loadBetterMarket();
        });
    });
  };

  loadBetterMarket = () => {
    this.contracts
      .deployed()
      .then(instance => {
        return instance.getAllBuyers.call();
      })
      .then(buyers => {
        for (let i = 0; i < buyers.length; i++) {
          // item already sold
          if (buyers[i] !== "0x0000000000000000000000000000000000000000") {
            // images search and replace to sold image
            var imgType = $(".panel-betterMarket")
              .eq(i)
              .find("img")
              .attr("src")
              .substr(21);

              console.log('imgType: ' + imgType);

            switch (imgType) {
              case "QmaA49MkdTD5wQmYQz3jABUmjaS7nHJXt7Hdh6Tkw1912u":
                $(".panel-betterMarket")
                  .eq(i)
                  .find("img")
                  .attr("src", "https://ipfs.io/ipfs/QmY1oBSi5EttJQVnwkBNTZ233ZKVzPLWsWtBWxPEojVWcD");
                break;
              case "QmZ799f5fXymwKRyXZHHGW52S512Mr3BwmunUAoMkeBLn4":
                $(".panel-betterMarket")
                  .eq(i)
                  .find("img")
                  .attr("src", "https://ipfs.io/ipfs/QmRzWoDoReXp4iSDRZ8QCwf5NW6eVxiwHnuLp4Ux3yPF4u");
                break;
              case "Qmd7gbpwWiMw5WJ3MiwLnfaoyVpcy5PMWBY9QdeUgwo5SA":
                $(".panel-betterMarket")
                  .eq(i)
                  .find("img")
                  .attr("src", "https://ipfs.io/ipfs/Qmdq7wms3rCaNagp9iN1naUK3PcipsFhx2iRCuoqCAUfP1");
                break;
            }

            $(".panel-betterMarket")
              .eq(i)
              .find(".btn-buy")
              .text("Sold")
              .attr("disabled", true);
            $(".panel-betterMarket")
              .eq(i)
              .find(".btn-buyerInfo")
              .removeAttr("style");
          }
        }
      })
      .catch(function(err) {
        console.log(err.message);
      });
  };

  BuyBetterMarket = e => {
    let id = $("#id").val();
    let name = $("#name").val();
    let price = $("#price").val();
    let age = 22;

    this.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      let account = accounts[0];
      this.contracts
        .deployed()
        .then(instance => {
          let nameUtf8Encoded = utf8.encode(name);
          return instance.buyBetterMarket(id, web3.toHex(nameUtf8Encoded), age, {
            from: account,
            value: price
          });
        })
        .then(() => {
          $("#name").val("");
          // $('#age').val('');
          $("#buyModal").modal("hide");
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div
          className="row"
          // style={{ background: "#64b5f6", height: "50px", color: "#FFF" }}
        >
          <div className="col-sm">
            {/* <img
              src="https://ipfs.io/ipfs/Qmb5pp2h9oVUUJDPGTGtBcqNcqZdBNbJzwMj2YPRUNdpeu"
              style={{ paddingTop: "6px" }}
            /> */}
          </div>
          {/* <div className="col-sm-8">
            <div style={{ paddingTop: "7px" }}>
              <Menu />
            </div>
          </div> */}
          <div className="col-sm">
            {/* <div style={{ paddingTop: "7px" }}>Login</div> */}
          </div>
        </div>

        {/* <div id="events">
          {this.state.events.map(c => {
            return (
              <div>
                {c.buyer} From Account {c.id} # bought this product.
              </div>
            );
          })}
        </div> */}

        {/* image toggle based on true or false */}

        <div className="row">
          {data.map((c, idx) => {
            return (
              <div className="col-sm-4 card-body panel-betterMarket">
                <img
                  className="card-img-top"
                  ref={i => (this.pic[idx] = i)}
                  src={c.picture}
                  width="240"
                />

                <div className="card-body">
                  <h5 className="card-title">{c.type}</h5>
                  <p className="card-text">{c.note}</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      ID: <span className="id">{c.id}</span>
                    </li>
                    <li className="list-group-item">
                      Price: <span className="price">{c.price}</span>
                    </li>
                    <li className="list-group-item">Area: {c.area}</li>
                  </ul>

                  <div className="card-body">
                    <button
                      className="btn btn-info btn-buy"
                      type="button"
                      data-toggle="modal"
                      data-target="#buyModal"
                      value={c.id}
                    >
                      Buy
                    </button>{" "}
                    &nbsp;
                    <button
                      className="btn btn-info btn-buyerInfo"
                      type="button"
                      data-toggle="modal"
                      data-target="#buyerInfoModal"
                      value={c.id}
                      style={{ display: "normal" }}
                    >
                      Buyer Info
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="modal fade"
          role="dialog"
          id="buyModal"
          ref={box => (this.buyModalBox = box)}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Buyer Info</h4>
              </div>
              <div className="modal-body">
                <input type="hidden" id="id" value={this.state.itemid} />
                <input type="hidden" id="price" value={this.state.itemPrice} />
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                />
                <br />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.BuyBetterMarket}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          role="dialog"
          id="buyerInfoModal"
          ref={box => (this.buyerInfoModal = box)}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Buyer Info</h4>
              </div>
              <div className="modal-body">
                <strong>Account Info</strong>: {this.state.buyerAddress} <br />
                <strong>Name</strong>: {this.state.buyerName} <br />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

         <div id="events">
          {this.state.events.map(c => {
            return (
              <div>
                {c.buyer} From Account {c.id} # bought this product.
              </div>
            );
          })}
        </div>

      </div>
    );
  }
}

export default App;
