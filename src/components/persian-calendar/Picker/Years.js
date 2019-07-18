import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from 'react';
import { mapToFarsi } from '../dateUtils';
import jalaali from 'jalaali-js';
var jalaaliYearArray = [],
    gregorianYearArray = [];
{
  var now = new Date();
  var j = jalaali.toJalaali(now);
  var n = j.jy + 20;

  for (var i = 1370; i < n; i++) {
    jalaaliYearArray.push({
      year: i,
      yearString: mapToFarsi(i)
    });
  }

  n = now.getFullYear() + 20;

  for (var _i = 1980; _i < n; _i++) {
    gregorianYearArray.push({
      year: _i,
      yearString: mapToFarsi(_i)
    });
  }
}

var Years =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Years, _React$Component);

  function Years(props) {
    var _this;

    _classCallCheck(this, Years);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Years).call(this, props));

    _this.nextYear = function (e) {
      e.preventDefault();

      _this.props.changeEvent(_this.props.year + 1);
    };

    _this.prevYear = function (e) {
      e.preventDefault();

      _this.props.changeEvent(_this.props.year - 1);
    };

    _this.nextDecade = function (e) {
      e.preventDefault();

      _this.props.changeEvent(_this.props.year + 10);
    };

    _this.prevDecade = function (e) {
      e.preventDefault();

      _this.props.changeEvent(_this.props.year - 10);
    };

    _this.state = {};
    return _this;
  }

  _createClass(Years, [{
    key: "render",
    value: function render() {
      var year = this.props.year;
      var yearString = mapToFarsi(year);
      return React.createElement("div", {
        className: "JC-Section"
      }, React.createElement("div", {
        className: "JC-Nav",
        onClick: this.prevDecade
      }, "<<"), React.createElement("div", {
        className: "JC-Nav",
        onClick: this.prevYear
      }, "<"), React.createElement("span", {
        className: "JC-Title"
      }, yearString), React.createElement("div", {
        className: "JC-Nav",
        onClick: this.nextYear
      }, ">"), React.createElement("div", {
        className: "JC-Nav",
        onClick: this.nextDecade
      }, ">>"));
    }
  }]);

  return Years;
}(React.Component);

export default Years;