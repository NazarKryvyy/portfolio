import axios from "axios";
import PortfolioCard from "./PortfolioCard";
import Link from "next/link";
import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useGetPortfolios } from "@/apollo/actions";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/client/react/ssr";

const Portfolios = () => {
  const { data } = useGetPortfolios();

  const portfolios = (data && data.portfolios) || [];

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <button onClick={createPortfolio} className="btn btn-primary">
        Create Portfolio
      </button>

      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default withApollo(Portfolios, { getDataFromTree });
