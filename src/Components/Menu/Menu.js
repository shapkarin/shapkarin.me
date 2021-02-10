import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'react-redux-connect';

import RandomButton from 'Components/RandomButton';
import menu from './routines';

import './Menu.less';

@connect
export default class Menu extends Component {

  static propTypes = {
    menu: PropTypes.array.isRequired,
  }

  static mapStateToProps = ({ menu }) => menu
  
  static mapDispatchToProps = {
    fetch: menu
  }
    
  componentDidMount(){
    this.props.fetch();
  }
  
  render () {
    const { menu } = this.props;
    console.log({ menu });
    return (
      <nav className="Menu">
        {menu.map(({ title, url, icon }) => {
          return (
            <NavLink
              key={title}
              to={url}
              className="Menu__Item"
              activeClassName="Menu__Item--active"
            >
              {icon()}
              {' '}
              { title }
            </NavLink>
          )
        })}
        <RandomButton />
      </nav>
    )
  }
}