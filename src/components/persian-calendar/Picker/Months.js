import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from 'react';
var jalaaliMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
var gregorianMonths = ['ژانویه', 'فوریه', 'مارچ', 'آپریل', 'می', 'جون', 'جولای', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];

var Months =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Months, _React$Component);

  function Months(props) {
    var _this;

    _classCallCheck(this, Months);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Months).call(this, props));

    _this.nextMonth = function (e) {
      _this.monthClicked(_this.props.month + 1, e);
    };

    _this.prevMonth = function (e) {
      _this.monthClicked(_this.props.month - 1, e);
    };

    _this.state = {
      monthPickerView: false,
      selectedMonth: _this.props.month
    };
    return _this;
  }

  _createClass(Months, [{
    key: "monthClicked",
    value: function monthClicked(i, e) {
      e.preventDefault();
      var clickEvent = this.props.clickEvent;
      if (clickEvent) clickEvent(i);
      this.setState({
        monthPickerView: false,
        selectedMonth: i
      });
    }
  }, {
    key: "closeMonthPreview",
    value: function closeMonthPreview(e) {
      e.preventDefault();
      this.setState({
        monthPickerView: false
      });
    }
  }, {
    key: "renderMonths",
    value: function renderMonths() {
      var _this2 = this;

      var gregorian = this.props.gregorian;
      var selectedMonth = this.state.selectedMonth;
      var result = [];
      var months = gregorian ? gregorianMonths : jalaaliMonths;

      var _loop = function _loop(i) {
        if (selectedMonth === i) {
          result.push(React.createElement("div", {
            key: i,
            className: "MonthItems selected",
            onClick: function onClick(e) {
              return _this2.closeMonthPreview(e);
            }
          }, months[i - 1]));
        } else {
          result.push(React.createElement("div", {
            key: i,
            className: "MonthItems",
            onClick: function onClick(e) {
              return _this2.monthClicked(i, e);
            }
          }, months[i - 1]));
        }
      };

      for (var i = 1; months.length >= i; i++) {
        _loop(i);
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          month = _this$props.month,
          gregorian = _this$props.gregorian;
      var monthPickerView = this.state.monthPickerView;
      var months = gregorian ? gregorianMonths : jalaaliMonths;
      return React.createElement("div", {
        className: "JC-Section"
      }, React.createElement("div", {
        className: "JC-Nav",
        onClick: this.prevMonth
      }, "<"), React.createElement("div", {
        className: "JC-Title",
        onClick: function onClick(e) {
          e.preventDefault();

          _this3.setState({
            monthPickerView: !monthPickerView
          });
        }
      }, months[month - 1]), React.createElement("div", {
        className: "JC-Nav",
        onClick: this.nextMonth
      }, ">"), monthPickerView && React.createElement("div", {
        className: "MonthPicker"
      }, this.renderMonths()));
    }
  }]);

  return Months;
}(React.Component);

export default Months;