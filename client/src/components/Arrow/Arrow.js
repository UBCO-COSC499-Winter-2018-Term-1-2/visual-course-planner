import React, { Component } from 'react';
import PropTypes from 'prop-types';

const i = 1.618;
class Arrow extends Component {

  constructor(props) {
    super(props);

    this.tailOffset = this.props.stroke * i * i;
    this.pointerSize = (this.tailOffset * 2) * i;

    this._init = this._init.bind(this);
    this._getLineOffset = this._getLineOffset.bind(this);
    this._getArrow = this._getArrow.bind(this);
    this._findEl = this._findEl.bind(this);
    this._getPoint = this._getPoint.bind(this);
    this._getCurveOffsets = this._getCurveOffsets.bind(this);

    this.state = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      width: 0,
      height: 0,
      startCurveOffset: { x: 0, y: 0 },
      endCurveOffset: { x: 0, y: 0 },
      endLineOffset: { x: 0, y: 0 },
      arrow: null,
    };
  }
  componentDidMount() {
    this._init();
    window.addEventListener('resize', () => {
      this._init();
    }, true);
    window.addEventListener("scroll", () => {
      this._init();
    }, true);
    window.addEventListener("drop", () => {
      console.log("GANDUUUUUUUUUUUUUUUUUUUU");
      this._init();
    }, true);
    document.addEventListener("drop", () => {
      console.log("LORUUUUUUUUUUUUUUUUUUUUU");
      this._init();
    }, true);
  }

  _init() {
    console.log("INITTT BHEEEEENHCODDDDDD");
    const startEl = this._findEl(this.props.fromSelector);
    const endEl = this._findEl(this.props.toSelector);
    if (startEl && endEl) {
      const startPoint = this._getPoint(startEl, this.props.fromSide);
      const endPoint = this._getPoint(endEl, this.props.toSide);
      const startCurveOffset = this._getCurveOffsets(this.props.fromSide, startPoint, endPoint);
      const endCurveOffset = this._getCurveOffsets(this.props.toSide, startPoint, endPoint);
      const endLineOffset = this._getLineOffset(this.props.toSide);
      const arrow = this._getArrow(endPoint, this.props.toSide);

      if (startPoint && endPoint) {
        this.setState({
          startX: startPoint.x,
          startY: startPoint.y,
          endX: endPoint.x,
          endY: endPoint.y,
          width: endPoint.x - startPoint.x,
          height: endPoint.y - startPoint.y,
          startCurveOffset,
          endCurveOffset,
          endLineOffset,
          arrow
        });
      }
    }
  }


  _getLineOffset(side) {
    const S = side ? side : 'top';
    let x = 0;
    let y = 0;
    switch (S) {
    case 'top': {
      y = this.pointerSize;
      return { x, y };
    }
    case 'bottom': {
      y = -this.pointerSize;
      return { x, y };
    }
    case 'left': {
      x = this.pointerSize;
      return { x, y };
    }
    case 'right': {
      x = -this.pointerSize;
      return { x, y };
    }
    default: {
      return null;
    }
    }

  }

  _getArrow(endPoint, side) {
    const S = side ? side : 'top';
    switch (S) {
    case 'top': {
      return `${endPoint.x},${endPoint.y} ${endPoint.x - this.tailOffset},${endPoint.y - this.pointerSize}  ${endPoint.x + this.tailOffset},${endPoint.y - this.pointerSize}`;
    }
    case 'bottom': {
      return `${endPoint.x},${endPoint.y} ${endPoint.x - this.tailOffset},${endPoint.y + this.pointerSize}  ${endPoint.x + this.tailOffset},${endPoint.y + this.pointerSize}`;
    }
    case 'left': {
      return `${endPoint.x},${endPoint.y} ${endPoint.x - this.pointerSize},${endPoint.y - this.tailOffset} ${endPoint.x - this.pointerSize},${endPoint.y + this.tailOffset}`;
    }
    case 'right': {
      return `${endPoint.x},${endPoint.y} ${endPoint.x + this.pointerSize},${endPoint.y - this.tailOffset} ${endPoint.x + this.pointerSize},${endPoint.y + this.tailOffset}`;
    }
    default: {
      return null;
    }
    }

  }

  _findEl(selector) {
    return document.querySelector(selector);
  }

  _getPoint(el, side) {
    const S = side ? side : 'top';
    const rect = el.getBoundingClientRect();
    // console.log('window.scrollY', window.scrollY)
    switch (S) {
    case 'top': {
      const x = rect.x + (rect.width / 2);
      const y = rect.y;
      return { x, y };
    }
    case 'bottom': {
      const x = rect.x + (rect.width / 2);
      const y = rect.y + rect.height;
      return { x, y };
    }
    case 'left': {
      const x = rect.x;
      const y = rect.y + (rect.height / 2);
      return { x, y };
    }
    case 'right': {
      const x = rect.x + rect.width;
      const y = rect.y + (rect.height / 2);
      return { x, y };
    }
    default: {
      break;
    }
    }

    return null;
  }

  _getCurveOffsets(side, startPoint, endPoint) {
    const S = side ? side : 'top';
    let distance = Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow((endPoint.y - startPoint.y), 2));
    const curveindex = distance * 0.2;

    switch (S) {
    case 'top': {
      return { x: 0, y: curveindex };
    }
    case 'bottom': {
      return { x: 0, y: -curveindex };
    }
    case 'left': {
      return { x: curveindex, y: 0 };
    }
    case 'right': {
      return { x: -curveindex, y: 0 };
    }
    default: {
      return { x: 0, y: 0 };
    }
    }
  }


  render() {
    const path = `M${this.state.startX},${this.state.startY}C${this.state.startX - this.state.startCurveOffset.x},${this.state.startY - this.state.startCurveOffset.y} ${this.state.endX - this.state.endCurveOffset.x},${this.state.endY - this.state.endCurveOffset.y} ${this.state.endX - this.state.endLineOffset.x},${this.state.endY - this.state.endLineOffset.y}`;
    return (
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none'
        }}
        width={window.innerWidth}
        height={window.innerHeight}
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        preserveAspectRatio="none"
      >
        <path d={path} stroke={this.props.color ? this.props.color : '#000'} strokeWidth={this.props.stroke} fill="transparent" />
        <polygon points={this.state.arrow} fill={this.props.color ? this.props.color : '#000'} />
      </svg>
    );
  }
}

Arrow.propTypes = {
  fromSelector: PropTypes.string.isRequired,
  toSelector: PropTypes.string.isRequired,
  fromSide: PropTypes.string.isRequired,
  toSide: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  stroke: PropTypes.number.isRequired
};

export default Arrow;