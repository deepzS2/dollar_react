import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    const day = new Date().toLocaleDateString("pt-BR");
    axios
      .get(
        `https://api.exchangeratesapi.io/history?start_at=2019-01-01&end_at=${this.actualDay(
          day.replace("/", "-").replace("/", "-")
        )}&symbols=BRL&base=USD`
      )
      .then(res => {
        const data = res.data.rates;
        let rates = [];
        Object.keys(data).forEach(item => {
          const date = item;
          const value = data[item].BRL.toFixed(2);

          rates.push({
            date,
            value
          });
        });
        rates = this.sortResult(rates);
        const labels = [];
        const values = [];
        rates.forEach(item => {
          labels.push(item.date);
          values.push(item.value);
        });

        this.setState({
          value_today: values[values.length - 1],
          today: labels[labels.length - 1],
          data: {
            labels,
            datasets: [
              {
                label: "Cotação do dólar",
                backgroundColor: "#85bb65",
                data: values,
                pointRadius: 0
              }
            ]
          }
        });
      });
  }

  sortResult(rates) {
    return rates.sort(function(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateA - dateB;
    });
  }

  actualDay(str) {
    const year = str.slice(6);
    const month = str.slice(3, 5);
    const day = str.slice(0, 2);

    return `${year}-${month}-${day}`;
  }

  getChartData = canvas => {
    const data = this.state.data;

    return data;
  };

  render() {
    return (
      <Router>
        <Navbar />
        <div className="container-fluid m-auto">
          <div className="jumbotron jumbotron-fluid">
            <Switch>
              <Route exact path="/">
                <Line
                  options={{
                    responsive: true
                  }}
                  data={this.getChartData}
                />
                <Home
                  value={parseFloat(this.state.value_today)}
                  date={this.state.today}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
