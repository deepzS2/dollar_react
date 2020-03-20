import React, { Component, Fragment } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

export default class Home extends Component {
  state = {
    didViewCountUp: false
  };

  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({ didViewCountUp: true });
    }
  };

  stringDate(date) {
    if (date) {
      let today = date.slice(5, 8) + date.slice(8, 10) + "-" + date.slice(0, 4);
      const today_form = new Date(today);
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      today = today_form.toLocaleDateString("pt-BR", options);
      return today.charAt(0).toUpperCase() + today.slice(1);
    }
  }

  render() {
    const { value, date } = this.props;

    return (
      <Fragment>
        <div className="mt-5">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="display-4">O dólar hoje alcançou o valor de</h1>
            <div className="counter-div mt-5">
              <div
                className="card text-center"
                style={{ width: "18rem", height: "12rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title display-4">
                    <VisibilitySensor
                      onChange={this.onVisibilityChange}
                      offset={{
                        top: 10
                      }}
                      delayedCall
                    >
                      <CountUp
                        end={
                          !isNaN(value)
                            ? this.state.didViewCountUp
                              ? value
                              : 0
                            : 0
                        }
                        duration={6}
                        separator=" "
                        decimals={2}
                        decimal=","
                        prefix="R$"
                        delay={1}
                        redraw={true}
                      >
                        {({ countUpRef, start }) => <span ref={countUpRef} />}
                      </CountUp>
                    </VisibilitySensor>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">Hoje</h6>
                  <p className="lead">{this.stringDate(date)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
