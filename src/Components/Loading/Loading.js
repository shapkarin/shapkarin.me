import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Preloader from '../Preloader';

export default class Loading extends PureComponent {
  static propTypes = {
    /** Контент который отображаем, когда загрузка завершилась */
    children: PropTypes.node.isRequired,

    /** Ошибка */
    error: PropTypes.shape({
      /** Код ошибки */
      code: PropTypes.number,

      /** Текст ошибки */
      message: PropTypes.string
    }),

    /** Радиус спиннера */
    loaderSize: PropTypes.number,

    /** Флаг, что идёт загрузка */
    loading: PropTypes.bool.isRequired,

    /**
     * Флаг, включается для маленьких спиннеров.
     * Уменьшает ширину кругов
     */
    small: PropTypes.bool
  };

  static defaultProps = {
    error: {
      code: 0,
      message: ''
    },
    loaderSize: 150,
    small: false
  };

  render() {
    const {
      children,
      error: {
        code,
        message
      },
      loaderSize,
      loading,
      small
    } = this.props;

    if (loading) {
      return <Preloader size={ loaderSize } small={ small } />;
    }

    if (code) {
      return message;
    }

    return children;
  }
}
