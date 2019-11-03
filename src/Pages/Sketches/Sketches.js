import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';

import './Sketches.less';

import Loading from 'Components/Loading';
import Close from 'Components/Close';
import sketches from './routines';

@connect
class Sketches extends Component {
  static mapStateToProps = ({ sketches: { loading, catalog } }) => ({
    loading,
    catalog
  })

  static mapDispatchToProps = {
    fetch: sketches
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // todo: arrayOf with shape, look at src/Pages/Projects/Projects.js
    // catalog: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { loading, catalog } = this.props;
    return (
      <Loading loading={loading}>
        <Close />
        <div className="Page__Inner">
          Nice examples with not so good code. TODO: refact
          <br/>
          <br/>
          <div style={{display: 'flex'}} >
            {Object.keys(catalog).map(category => (
              <div key={category} style={{display: 'flex', flexDirection: 'column'}}>
                <h3>{`${category}:`}</h3>
                <br/> {/* :-) */}
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
    )
  }
}

export default Sketches;
