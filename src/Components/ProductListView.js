import React from 'react';
import { Avatar, List } from 'antd';
import productsArr from '../StaticFile/product.json';

function ProductListView({ addItemToCart }) {

  return (
    <List
      itemLayout="horizontal"
      dataSource={productsArr}
      renderItem={product => (
        <List.Item
          key={product.productId}
          actions={[
            <a
              style={{ fontSize: '110%', cursor: 'pointer' }}
              onClick={() => addItemToCart(product)}
            >
              Add To Cart
            </a>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar />}
            title={<a href="https://ant.design">{product.name}</a>}
            description={product.description}
          />
        </List.Item>
      )}
    />
  )

}

export default ProductListView;