import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import productsArr from '../StaticFile/product.json';
const { Meta } = Card;

function ProductGridView({ addItemToCart }) {

  return (
    <Row>
      {productsArr.map(product => {
        return (
          <Col key={product.productId}>
            <Card
              size="default"
              style={{ marginLeft: '10px', marginTop: '20px' }}
              actions={[
                product.price,
                <a
                  style={{ fontSize: '110%', cursor: 'pointer' }}
                  onClick={() => addItemToCart(product)}
                >
                  Add To Cart
                </a>
              ]}
            >
              <Meta
                avatar={<Avatar />}
                title={product.name}
                description={product.description}
              />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default ProductGridView;