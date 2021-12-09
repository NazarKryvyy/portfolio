import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import Link from "next/link";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";

const AppLink = ({ children, className, href }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);

const AppNavBar = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data && !hasResponse) {
    if (data.user && !user) {
      setUser(data.user);
    }

    setHasResponse(true);
  }
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          FilipJerga
        </AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/portfolios" className="nav-link mr-3">
              Portfolios
            </AppLink>
            <AppLink href="/forum/categories" className="nav-link mr-3">
              Forum
            </AppLink>
            <AppLink href="/cv" className="mr-3 nav-link">
              Cv
            </AppLink>
          </Nav>
          {hasResponse && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-4">Welcome {user.username}</span>
                  <AppLink href="/login" className="nav-link btn btn-danger">
                    Sign Out
                  </AppLink>
                </>
              )}
              {(error || !user) && (
                <>
                  <AppLink href="/login" className="mr-3 nav-link">
                    Sign In
                  </AppLink>
                  <AppLink
                    href="/register"
                    className="mr-3 btn btn-success bg-green-2 bright"
                  >
                    Sign Up
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withApollo(AppNavBar);
