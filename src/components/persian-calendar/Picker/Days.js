import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from 'react';
import { mapToFarsi } from '../dateUtils';
import jalaali from 'jalaali-js';

var Days =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Days, _React$Component);

  function Days(props) {
    var _this;

    _classCallCheck(this, Days);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Days).call(this, props));

    _this.isDateEnabled = function (date) {
      if (_this.props.filterDate) {
        return _this.props.filterDate(date);
      }

      return true;
    };

    _this.state = {
      selectedDay: _this.props.selectedDay
    };
    var now = new Date();
    _this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return _this;
  }

  _createClass(Days, [{
    key: "dayClicked",
    value: function dayClicked(element, e) {
      var _this2 = this;

      if (e) {
        e.preventDefault();
      }

      if (!!this.state.selectedDay) {
        var selectedRef = this.state.selectedDay.getTime().toString();

        if (!!this.refs[selectedRef]) {
          this.refs[selectedRef].className = this.refs[selectedRef].className.replace('selected', '');
        }
      }

      this.setState({
        selectedDay: element
      }, function () {
        _this2.refs[element.getTime().toString()].className += ' selected';

        _this2.props.clickEvent(element);
      });
    }
  }, {
    key: "renderDays",
    value: function renderDays() {
      var _this3 = this;

      var _this$props = this.props,
          gregorian = _this$props.gregorian,
          firstDay = _this$props.firstDay,
          selectedYear = _this$props.selectedYear,
          currentMonth = _this$props.currentMonth,
          selectedDay = _this$props.selectedDay,
          daysCount = _this$props.daysCount;
      var year = selectedYear;
      var month = currentMonth;
      var result = [];

      var _loop = function _loop(i) {
        var addedClass = '';
        var marginRight = '0%';
        var number = mapToFarsi(i);
        if (i === 1) marginRight = firstDay * 14.28 + '%';
        var date = void 0;

        if (gregorian) {
          date = new Date(year, month - 1, i);
        } else {
          var g = jalaali.toGregorian(year, month, i);
          date = new Date(g.gy, g.gm - 1, g.gd);
        } // console.log(this.today, date)


        if (_this3.today && date.getTime() === _this3.today.getTime()) addedClass += ' today';
        if (selectedDay && date.getTime() === selectedDay.getTime()) addedClass += ' selected';

        var enable = _this3.isDateEnabled(date);

        if (!enable) {
          result.push(React.createElement("div", {
            className: 'day-items' + addedClass,
            ref: date.getTime().toString(),
            key: date.getTime().toString(),
            style: {
              background: '#ccc',
              cursor: 'default',
              marginRight: marginRight
            }
          }, number));
        } else if (enable) {
          result.push(React.createElement("div", {
            className: 'day-items' + addedClass,
            ref: date.getTime().toString(),
            key: date.getTime().toString(),
            style: {
              marginRight: marginRight
            },
            onClick: function onClick(e) {
              return _this3.dayClicked(date, e);
            }
          }, number));
        }
      };

      for (var i = 1; i <= daysCount; i++) {
        _loop(i);
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "JC-days"
      }, React.createElement("div", {
        className: "holder"
      }, !!this.props.daysCount && this.renderDays()));
    }
  }]);

  return Days;
}(React.Component);

export default Days;