"use client";

import { Alert, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "./Loading";
import Error from "./Error";
import { hexToRgba } from "../util/hexToRgba";

interface PageContainerProps {
  title: string;
  description?: string;
  color?: string;
  children: React.ReactNode;
  error?: string;
  success?: string;
  loading?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, description, color, children, error, success, loading }) => {
  return (
        <>
            {loading && <Loading />}
            <Container className="mt-5 d-flex flex-column align-items-center">
              <h1
                className="text-center mb-4"
                style={{
                  color: color || "#000000"
                }}
              >
                {title}
              </h1>
              {description &&
                <p
                  className="text-center mb-5"
                  style={{
                    color: color ? hexToRgba(color, 0.5) : "#000000"
                  }}
                >
                  {description}
                </p>
              }
              {!loading && error && (
                  <Error errorMessage={error} />
              )}
              {!loading && success && (
                  <Alert variant="success">
                  {success}
                  </Alert>
              )}
              {children}
            </Container>
        </>
      );
};

export default PageContainer;
