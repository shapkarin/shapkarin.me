import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import about from './routines';
import Loading from 'Components/Loading';

import './style.less';

@connect
export default class About extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }

  static mapStateToProps = ({ about: { loading, text } }) => ({
    loading,
    text
  })

  static mapDispatchToProps = {
    fetch: about
  }
  
  state = {
    copied: false
  }
  
  componentDidMount(){
    this.props.fetch();
  }

  render () {
    const { loading, text } = this.props;
    const email = 'yury@shapkarin.me';
    return (
      <>
        <Loading loading={loading}>
          <div className="About">
            {text}
            <div style={{marginTop: '10px'}}>
              You can visit <a href="https://github.com/shapkarin" target="_blank">my Github</a>
              {!this.state.copied ? ' ' : '. '}
              {
                !this.state.copied ?
                <>
                  and maybe you need
                  {' '}
                  <CopyToClipboard text={email}
                    onCopy={() => this.setState({copied: true})}>
                    <span style={{cursor: 'pointer', textDecoration: 'underline'}}>
                      to copy my email.
                    </span>
                  </CopyToClipboard>
                </>
              :
              <span>You copied my email: <a href={`mailto:${email}`}>{email}</a></span>
              }
            </div>
          </div>
        </Loading>  
      </>
    )
  }
}