import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem, CartEmpty } from '../components';

import { selectCart } from '../redux/cart/selectors';
import { clearItems } from '../redux/cart/slice';
import CartIcon from '../assets/img/cart.svg';
import TrashIcon from '../assets/img/trash.svg';
import ArrowRightIcon from '../assets/img/grey-arrow-left.svg';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <img src={CartIcon} alt="cart" />
            Cart
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <img src={TrashIcon} alt="trash" />
            <span>Clear cart</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {' '}
              Pizzas: <b>{totalCount}</b>{' '}
            </span>
            <span>
              {' '}
              Order price: <b>{totalPrice} ₽</b>{' '}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <img src={ArrowRightIcon} alt="arrow" />
              <span>Go back</span>
            </Link>
            <div className="button pay-btn">
              <span>pay now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
