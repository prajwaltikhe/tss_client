import { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Looks } from '../components/catalog/Looks';
import Tags from '../components/common/Tags';
import tssurl from '../port';

const CatalogPage = () => {
  const [catItems, setCatItems] = useState();
  const [looks, setLooks] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${tssurl}/catalog/catalog`);
        const data = await res.json();
        const catalogId = data?.catalogItems?.[0]?.catalog_id;
        setCatItems(data);

        if (catalogId) {
          const res2 = await fetch(`${tssurl}/catalog/looks/${catalogId}`);
          const looksData = await res2.json();
          setLooks(looksData);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const getImageAndLink = (area) => ({
    image: catItems?.catalogItems?.[0]?.[area]?.image?.url,
    link:
      catItems?.catalogItems?.[0]?.[area]?.imagelink ||
      catItems?.catalogItems?.[0]?.[area]?.Title,
    centerText: catItems?.catalogItems?.[0]?.[area]?.centerText || '',
    buttonText: catItems?.catalogItems?.[0]?.[area]?.buttonText || '',
  });

  const cat1 = getImageAndLink('inputArea1');
  const cat2 = getImageAndLink('inputArea2');
  const cat3 = getImageAndLink('inputArea3');
  const cat4 = getImageAndLink('inputArea4');
  const cat5 = getImageAndLink('inputArea5');

  const handleLooks = () => {
    const catalogId = catItems?.catalogItems?.[0]?.catalog_id;
    if (catalogId) {
      navigate(`/catalog/looks/${catalogId}`);
    } else {
      console.error('Catalog ID not found');
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="catslide">
          <Tags />
          <Col md={12}>
            <Image src={cat1.image} alt="catalog" fluid />
          </Col>
        </Row>
        <Looks data={looks} />

        <Row className="cat2">
          <Col md={6}>
            <Image src={cat2.image} fluid />
          </Col>
          <Col md={6} className="m-auto">
            <h4>{cat2.link}</h4>
          </Col>
        </Row>

        <Row className="cat3">
          <Col md={12}>
            <Image src={cat3.image} alt="cat3" fluid />
            <p>{cat3.link}</p>
          </Col>
        </Row>

        <Row className="cat4">
          <Col md={6} className="m-auto">
            <h4>{cat4.link}</h4>
          </Col>
          <Col md={6}>
            <Image src={cat4.image} fluid />
          </Col>
        </Row>

        <Row className="cat5">
          <Col md={12}>
            <Image src={cat5.image} alt="cat5" fluid />
            <div className="cat5text">
              <h5>{cat5.centerText}</h5>
              <Button variant="light" onClick={handleLooks}>
                <span>{cat5.buttonText}</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CatalogPage;
