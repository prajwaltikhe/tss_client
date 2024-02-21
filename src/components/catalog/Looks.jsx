import { Container, Row, Col, Image } from 'react-bootstrap';

export const Looks = ({ data }) => {
  return (
    <Row>
      {data?.[0]?.map((item, index) => (
        <Col md={2} xs={4} key={index}>
          <Container className="my-3">
            <p className="mb-1">{index + 1}</p>
            {item?.thumbnail && (
              <Image
                className="w-100"
                src={item.thumbnail.url}
                alt={`Thumbnail ${index}`}
              />
            )}
          </Container>
        </Col>
      ))}
    </Row>
  );
};

export const LooksData = ({ data }) => {
  return (
    <>
      <Row className="looksdata">
        {data?.[0]?.map((item, index) => (
          <Col md={3} xs={6}>
            <Container className="my-3" key={index}>
              <p className="mb-1">{index + 1}</p>
              {item?.thumbnail && (
                <Image
                  className="w-100"
                  src={item.thumbnail.url}
                  alt={`Thumbnail ${index}`}
                />
              )}
            </Container>
          </Col>
        ))}
      </Row>
    </>
  );
};
