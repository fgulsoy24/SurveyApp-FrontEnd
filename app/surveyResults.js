import ReactDOM from "react-dom";
import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import SurveyStore from "./store/SurveyStore";
import SurveyActions from "./actions/SurveyActions";
import { Modal, Button, Tabs, Tab, Panel, Row, Col, Table } from 'react-bootstrap';

class surveyResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: {
          text: "Number of Under The 18's"
        }
      },
      carLicenseOptions: {
        title: {
          text: "Number of Licensed Customers"
        }
      },
      firstCarOptions: {
        title: {
          text: "Between 18 - 25 Years Number of First Car Owners"
        }
      },
      targetableClientsOptions: {
        title: {
          text: "Number of Targetable Clients"
        }}
        ,
      distOptions: {
        title: {
          text: "Model Distrubition"
        }
      }
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    SurveyStore.addChangeListener(this.onChange);
    SurveyActions.getDetailedResults();
  }

  componentWillUnmount() {
    SurveyStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState()
  }


  render() {
    const detailedResults = SurveyStore.getDetailedResults();
    this.state.options['labels'] = detailedResults.ageLabels;
    this.state.carLicenseOptions['labels'] = detailedResults.carLicenseLabels;
    this.state.firstCarOptions['labels'] = detailedResults.firstCarLabels;
    this.state.targetableClientsOptions['labels'] = detailedResults.targetableClientsLabels;
    this.state.distOptions['labels'] = detailedResults.distLabels;
    return (
      <div>
       <div className="container">
          <Col md="auto">
            <h2>
            Average Amount Of BMWs Owned By Targetables: {detailedResults.avgUsedBmw}
          </h2>
          </Col>
          <Col md="auto">
            <h2>
            Percentage Of Targetables That Care About Drifting: %{detailedResults.percentageDrifting}
          </h2>
          </Col>
          <Col md="auto">
            <h2>
            Percentage Of Targetables That Picked FWD or “I don’t know” For Drivetrain: %{detailedResults.percentageDriveTrain}
          </h2>
          </Col>
       
          <br></br>
          <h2>
            Charts
          </h2>
          </div>
          <Row>
          <div className="container">
          <Col md={1}>
              {(detailedResults.distLabels.length != 0) &&
                <Chart
                  options={this.state.distOptions}
                  series={detailedResults.distSeries}
                  type="pie"
                  width="500"
                />
              }  </Col>
              </div>
              </Row>
        <Row>
          <div className="container">
            <Col md={6}>
              {(detailedResults.ageLabels.length != 0) &&
                <Chart
                  options={this.state.options}
                  series={detailedResults.ageSeries}
                  type="pie"
                  width="500"
                />
              }  </Col>
            <Col md={6}>
              {(detailedResults.carLicenseLabels.length != 0) &&
                <Chart
                  options={this.state.carLicenseOptions}
                  series={detailedResults.carLicenseSeries}
                  type="pie"
                  width="500"
                />}
            </Col>
          </div>
        </Row>
        <Row>
          <div className="container">
            <Col md={6}>
              {(detailedResults.firstCarLabels.length != 0) &&
                <Chart
                  options={this.state.firstCarOptions}
                  series={detailedResults.firstCarSeries}
                  type="pie"
                  width="500"
                />}
            </Col>
            <Col md={6}>
              {(detailedResults.targetableClientsLabels.length != 0) &&
                <Chart
                  options={this.state.targetableClientsOptions}
                  series={detailedResults.targetableClientsSeries}
                  type="pie"
                  width="500"
                />}
            </Col>
          </div>
        </Row>

      </div >

    )
  }
}

export default surveyResults;