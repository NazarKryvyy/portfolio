import { useRouter } from "next/router";
import Link from "next/link";
import withApollo from "hoc/withApollo";
import withAuth from "hoc/withAuth";
import BaseLayout from "layouts/BaseLayout";
import { Card, Button } from "react-bootstrap";
import { useDeletePortfolio, useGetUserPortfolios } from "apollo/actions";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { formatDate } from "utils/functions";

const InstructorDashboard = withAuth(
  () => {
    const { data } = useGetUserPortfolios();
    const userPortfolios = (data && data.userPortfolios) || [];
    const [deletePortfolio] = useDeletePortfolio();
    const router = useRouter();
    const instructorId = router.query.id || "";

    return (
      <BaseLayout>
        <div className="bwm-form mt-5">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">Instructor Portfolios</h1>
              {userPortfolios.map((p) => (
                <Card key={p._id} className="mb-2">
                  <Card.Header>{p.jobTitle}</Card.Header>
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>
                      {formatDate(p.startDate)} -{" "}
                      {(p.endDate && formatDate(p.endDate)) || "Present"}
                    </Card.Text>
                    {/* TODO: Delete Update Buttons */}
                    <Link
                      href="/portfolios/[id]/edit"
                      as={`/portfolios/${p._id}/edit`}
                    >
                      <a className="btn btn-warning mr-1">Update</a>
                    </Link>
                    <Button
                      onClick={() =>
                        deletePortfolio({ variables: { id: p._id } })
                      }
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  },
  ["admin", "instructor"],
  { ssr: true }
);

export default withApollo(InstructorDashboard, { getDataFromTree });
