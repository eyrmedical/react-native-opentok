/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { requireNativeComponent, View, Text, findNodeHandle, TouchableHighlight, UIManager } from 'react-native';
import React from 'react';
import SessionViewProps from './SessionViewProps';
import withLoadingSpinner from './withLoadingSpinner';

const noop = () => {};

/**
 * A React component for publishing video stream over OpenTok to the
 * session provided
 *
 * `Publisher` supports default styling, just like any other View.
 *
 * After successfull session creation, the publisher view displaying live
 * preview of a stream will be appended to the container and will take available
 * space, as layed out by React.
 */
class PublisherView extends React.Component {
  static propTypes = {
    ...View.propTypes,
    ...SessionViewProps,
    /**
     * This function is called on publish start
     */
    onPublishStart: React.PropTypes.func,
    /**
     * This function is called on publish error
     */
    onPublishError: React.PropTypes.func,
    /**
     * This function is called on publish stop
     */
    onPublishStop: React.PropTypes.func,
    /**
     * This function is called when new client is connected to
     * the current stream
     *
     * Receives payload:
     * ```
     * {
     *   connectionId: string,
     *   creationTime: string,
     *   data: string,
     * }
     * ```
     */
    onClientConnected: React.PropTypes.func,
    /**
     * This function is called when client is disconnected from
     * the current stream
     *
     * Receives payload:
     * ```
     * {
     *   connectionId: string,
     * }
     * ```
     */
    onClientDisconnected: React.PropTypes.func,
    /**
     * This function is called on mount
     * to provide a reference to a peer component to call cycleCamera
     *
     */
    registerPublisher: React.PropTypes.func,
  };

  static defaultProps = {
    onPublishStart: noop,
    onPublishError: noop,
    onPublishStop: noop,
    onClientConnected: noop,
    onClientDisconnected: noop,
  };

  componentDidMount() {
    if (typeof this.props.registerPublisher === 'function') {
      this.props.registerPublisher(this)
    }
  }

  componentWillUnmount() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this._pubViewManager),
      UIManager.RCTOpenTokPublisherView.Commands.destroy,
      [],
    );
  }

  cycleCamera = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this._pubViewManager),
      UIManager.RCTOpenTokPublisherView.Commands.cycleCamera,
      [],
    );
  }

  mute = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this._pubViewManager),
      UIManager.RCTOpenTokPublisherView.Commands.mute,
      [],
    );
  }

  unmute = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this._pubViewManager),
      UIManager.RCTOpenTokPublisherView.Commands.unmute,
      [],
    );
  }



  render() {
    return (
      <RCTPublisherView
        ref={component => this._pubViewManager = component}
        {...this.props}
      />
    );
  }
}

const RCTPublisherView = requireNativeComponent('RCTOpenTokPublisherView', PublisherView);

export default withLoadingSpinner(PublisherView, 'onPublishStart');
