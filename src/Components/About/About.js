import React, { Component } from 'react';
import connect from 'react-redux-connect';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoIosCheckmarkCircleOutline as NotifyIcon } from "react-icons/io";
import FlashMessage from 'react-flash-message';

import about from './routines';
import Loading from 'Components/Loading';

import './style.less';

@connect
class About extends Component {
  static mapStateToProps = ({ about: { loading, text } }) => ({
    loading,
    text
  })

  static mapDispatchToProps = {
    fetch: about
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }

  state = {
    copied: false
  }
  
  componentDidMount() {
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
              {!this.state.copied ? ' ' : ', '}
              {
                !this.state.copied ?
                <>
                  and maybe you need
                  {' '}
                  <CopyToClipboard text={email}
                    onCopy={() => this.setState({copied: true})}>
                    <span style={{cursor: 'pointer', textDecoration: 'underline'}}>
                      to copy my email to the clipboard
                    </span>
                  </CopyToClipboard>
                </>
              :
              <span>
                <FlashMessage duration={742}><NotifyIcon />You copied </FlashMessage>my email: <a href={`mailto:${email}`}>{email}</a>
              </span>
              }
            </div>
          </div>
        </Loading>
      </>
    )
  }
}

export default About;