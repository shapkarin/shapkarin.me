import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';

import './style.less';

import Loading from 'Components/Loading';
import Close from 'Components/Close';
import sketches from './routines';

@connect
class Sketches extends Component {
  static mapStateToProps = ({ sketches: { loading, catalog } }) => ({
    loading,
    catalog
  })

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // todo: arrayOf with shape, look at src/Pages/Projects/Projects.js
    // catalog: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetch();
  }

  static mapDispatchToProps = {
    fetch: sketches
  }

  render() {
    const { loading, catalog } = this.props;
    return (
      <Loading loading={loading}>
        <Close />
        <div className="Page__Sketches Page__Inner Page__Inner_dark">
          <h1>Drawing with code</h1>
          <p>
            Generative art, animation and music visualization experiments
            <br />
            to lear, research and practice. Usually was build fast.
            It's like a sketch drawing but with code.
            <br />
            <br />
            <h2>Some are implemented with pure JS, other with libraries</h2>
          </p>
          <div className="Gal__Wrapper">
            {Object.keys(catalog).map(category => (
              <div key={category} className="Gal__Column">
                <h3>{`${category}:`}</h3>
                {/* :-) */}
                {catalog[category].map((link, i) => (
                  <a
                    {...link}
                    key={`${category}-${i}`}
                    className="Gal--Item"
                    target="_blank"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Loading>
    );
  }
}

export default Sketches;
