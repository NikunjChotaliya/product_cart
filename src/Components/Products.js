import React, { useState } from 'react';
import { Button, message, PageHeader } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import ProductGridView from './ProductGridView';
import ProductListView from './ProductListView';
import { CART_LOCAL_NAME, PRODUCT_VIEW } from '../utils/constant';
import inventoryArr from '../StaticFile/inventory.json';
import { clearLocalDetails, getLocalDetails, setLocalDetails } from '../utils/commonUtils';
import CheckoutDrawer from './CheckoutDrawer';

function Products() {
  let [view, setView] = useState(PRODUCT_VIEW.grid);
  let [isDrawer, setDrawer] = useState(false);

  const getProductCartObj = (product) => {
    return {
      [product.productId]: {
        ...product,
        qty: 1
      }
    }
  }

  const showMessage = ({ inventory, product }) => {
    let cart = getLocalDetails(CART_LOCAL_NAME);
    if (cart) {
      cart = JSON.parse(cart);
      let currentCartItem = cart?.[product.productId];
      let qtyDiff = inventory.available - currentCartItem?.qty;
      if (currentCartItem?.qty === inventory.available) {
        message.error('Out of stock');
      } else if (qtyDiff <= 3) {
        message.info(`Item added to cart; Only ${qtyDiff} items available in stock`);
      } else {
        message.success('Item added to cart');
      }
    } else {
      if (inventory.available > 0 && inventory.available <= 3) {
        message.info(`Item added to cart; Only ${inventory.available} items available in stock`);
      } else if (inventory.available > 3) {
        message.success('Item added to cart');
      } else {
        message.success('Out of stock');
      }
    }
  }

  const addItemToCart = (product) => {
    let cart = getLocalDetails(CART_LOCAL_NAME);
    let inventory = inventoryArr.filter(inv => inv.productId === product.productId)[0];
    let cartObj = JSON.parse(cart || '{}');
    if (cart) {
      let currentCartItem = cartObj[product.productId];
      if (currentCartItem && currentCartItem.qty !== inventory.available) {
        cartObj[product.productId] = {
          ...currentCartItem,
          qty: currentCartItem.qty + 1,
        }
      } else if (!currentCartItem) {
        let cartToPrepare = getProductCartObj(product);
        cartObj = {
          ...cartObj,
          ...cartToPrepare
        }
      }
      showMessage({
        inventory,
        product
      });
      setLocalDetails(CART_LOCAL_NAME, JSON.stringify(cartObj));
    } else {
      if (inventory.available > 0) {
        let currentCartItem = getProductCartObj(product);
        let currentCartItemString = JSON.stringify(currentCartItem);
        showMessage({
          inventory,
          product
        });
        setLocalDetails(CART_LOCAL_NAME, currentCartItemString);
      }
    }
  }

  return (
    <div>

      <PageHeader
        ghost={false}
        title="Product List"
        subTitle="Welcome to the e-commerce site"
        extra={[
          <Button onClick={() => setView(PRODUCT_VIEW.list)}>List</Button>,
          <Button onClick={() => setView(PRODUCT_VIEW.grid)}>Grid</Button>,
          <Button onClick={() => clearLocalDetails(CART_LOCAL_NAME)}>Clear Cart</Button>,
          <ShoppingCartOutlined
            onClick={() => setDrawer(true)}
            style={{ fontSize: '150%', cursor: 'pointer' }}
          />,
        ]}
      >
      </PageHeader>

      {
        view === PRODUCT_VIEW.grid
          ?
          <ProductGridView addItemToCart={addItemToCart} />
          :
          <ProductListView addItemToCart={addItemToCart} />
      }

      {isDrawer &&
        <CheckoutDrawer onClose={setDrawer} />
      }

    </div>
  )
}

export default Products;