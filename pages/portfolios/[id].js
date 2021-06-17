import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_PORTFOLIO } from "@/apollo/queries";
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

const PortfolioDetail = ({ query }) => {
  const [getPortfolio, { loading, data }] = useLazyQuery(GET_PORTFOLIO);

  useEffect(() => {
    getPortfolio({ variables: { id: query.id } });
  }, []);
  if (loading || !data?.portfolio) {
    return "Loading...";
  }
  return (
    <div className="portfolio-detail">
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">{data.portfolio.title}</h1>
          <p className="lead">{data.portfolio.jobTitle}</p>
          <p>
            <a
              className="btn btn-lg btn-success"
              href={data.portfolio.companyWebsite}
              role="button"
            >
              See Company
            </a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{data.portfolio.location}</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{data.portfolio.startDate}</p>
          </div>

          <div className="col-lg-6">
            {/* TODO: days later... */}
            <h4 className="title">Days</h4>
            <p className="text">44</p>

            <h4 className="title">End Date</h4>
            <p className="text">{data.portfolio.endDate}</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{data.portfolio.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PortfolioDetail.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(PortfolioDetail, {getDataFromTree});
