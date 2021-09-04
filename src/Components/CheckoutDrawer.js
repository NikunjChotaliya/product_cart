import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Result, Row } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { getLocalDetails } from '../utils/commonUtils';
import { CART_LOCAL_NAME } from '../utils/constant';

function CheckoutDrawer({ onClose }) {

  let [cartState, setCartState] = useState({
    cartTotal: 0,
    cartItems: []
  });

  let cartDetails = getLocalDetails(CART_LOCAL_NAME);
  useEffect(() => {
    function setCartDetails() {
      cartDetails = JSON.parse(cartDetails);
      let cartKeys = Object.keys(cartDetails);
      let cartTotal = 0;
      let cartItems = [];
      cartKeys.forEach(key => {
        let product = cartDetails[key];
        let totalAmt = product.qty * product.price;
        cartTotal += totalAmt;
        cartItems.push({ ...product, totalAmt });
      });
      setCartState({
        cartTotal,
        cartItems
      });
    }
    cartDetails && setCartDetails();
  }, []);

  return (
    <Drawer
      title="Cart"
      placement="right"
      size={'large'}
      onClose={() => onClose(false)}
      visible={true}
    >

      {!cartDetails ?
        <Result
          icon={<SmileOutlined />}
          title="Cart is Empty!"
          extra={<Button type="primary" onClick={() => onClose(false)}>Go to product page</Button>}
        />
        :
        <>
          <Row>
            <Col style={{ fontSize: '18px', fontWeight: 700 }}>Products</Col>
          </Row><br />
          <Row>
            <Col>{`Name -> `}</Col>
            <Col>{`Qty -> `}</Col>
            <Col>{`Total Amount`}</Col>
          </Row><br />
          <Row>
            {cartState.cartItems.map(item => {
              return (
                <Col key={item.productId}>
                  {item.name + '->' + item.qty + '->' + item.totalAmt}
                </Col>
              )
            })}
          </Row>
        </>
      }

    </Drawer>
  )
}

export default CheckoutDrawer;