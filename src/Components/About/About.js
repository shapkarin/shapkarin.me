import React, { Component } from 'react';
import connect from 'react-redux-connect';
import { reduxConnect } from 'react-redux';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import { FiExternalLink } from 'react-icons/fi';
import { withRouter } from "react-router";

import about from './routines';
import Loading from 'Components/Loading';
import RandomButton from 'Components/RandomButton';

import './style.less';

@withRouter
@connect
export default class About extends Component {
  static mapStateToProps = ({ about: { loading, text } }) => ({
    loading,
    text
  })

  state = {
    copied: false,
    moreInfo: false
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }

  componentDidMount () {
    this.props.fetch();
  }

  static mapDispatchToProps = {
    fetch: about
  }

  render () {
    const { loading, text, history: { location: { pathname } } } = this.props;
    const { moreInfo, copied } = this.state;
    const email = 'yury@shapkarin.me';

    return (
      <>
        <Loading loading={loading}>
          <div className={`About ${this.props.history.location.pathname === '/' ? 'About_dark' : ''}`}>
            <div 
              dangerouslySetInnerHTML={{__html: text}}
            ></div>
            {!moreInfo ?
            <div className="Link" onClick={() => this.setState({ moreInfo: true })}>About website.</div>
            :
            <div style={{ marginTop: 10 }}>
              <ReactTooltip
                place="right"
              />
              Current website use React, Redux, axios-mock-adapter to mock some requests and Github API. <br />
              The backgound is <RandomButton className="Link" data-tip="click to generate">generated</RandomButton> by pure JS with Canvas API.
              You can have a look at <a href='https://github.com/shapkarin/shapkarin.me' target='_blank'>the source code <FiExternalLink /></a>.<br />
              It's a bit <a href='https://github.com/shapkarin/shapkarin.me/issues' target='_blank' data-tip="known issues">legacy <FiExternalLink /></a>.
              <br />
              I don't think that redux-saga is necessary here
              and it don't has any CSS methodology.{' '}
              <div className="Link" onClick={() => this.setState({ moreInfo: false })} data-tip="collapse">[Hide]</div>
            </div>}
            <div style={{marginTop: '10px'}}>
              You can visit <a href="https://github.com/shapkarin" target="_blank">my Github <FiExternalLink /></a>
              {!copied ? ' ' : '. '}
              {
                !copied ?
                <>
                  and maybe you need
                  {' '}
                  <CopyToClipboard 
                    text={email}
                    onCopy={() => this.setState({copied: true})}
                  >
                    <span style={{cursor: 'pointer', textDecoration: 'underline'}}>
                      to copy my email.
                    </span>
                  </CopyToClipboard>
                </>
              :
              <span>Email in a clipboard: <a href={`mailto:${email}`}>{email}</a></span>
              }
            </div>
          </div>
        </Loading>
      </>
    )
  }
}