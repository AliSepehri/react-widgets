'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizers = require('./util/localizers');

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dayFormat = function dayFormat(props) {
  return _localizers.date.getFormat('weekday', props.dayFormat);
},
    dateFormat = function dateFormat(props) {
  return _localizers.date.getFormat('dayOfMonth', props.dateFormat);
};

var optionId = function optionId(id, date) {
  return id + '__month_' + _dates2.default.month(date) + '-' + _dates2.default.date(date);
};

var propTypes = {
  optionID: _react2.default.PropTypes.func,

  culture: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.instanceOf(Date),
  days: _react2.default.PropTypes.array,
  focused: _react2.default.PropTypes.instanceOf(Date),
  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),

  dayComponent: _propTypes2.default.elementType,

  dayFormat: _propTypes2.default.dateFormat,
  dateFormat: _propTypes2.default.dateFormat,
  footerFormat: _propTypes2.default.dateFormat,

  onChange: _react2.default.PropTypes.func.isRequired
};

var isEqual = function isEqual(dateA, days) {
  if (days instanceof Array) {
    return days.some(function (day) {
      if (_dates2.default.eq(dateA, day, 'day')) {
        return true;
      }
    });
  } else {
    return _dates2.default.eq(dateA, days, 'day');
  }
};

var MonthView = _react2.default.createClass({

  displayName: 'MonthView',

  statics: {
    isEqual: isEqual
  },

  mixins: [require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId((0, _widgetHelpers.instanceId)(this), this.props.focused);
    this.ariaActiveDescendant(activeId, null);
  },
  render: function render() {
    var _props = this.props;
    var focused = _props.focused;
    var culture = _props.culture;
    var month = _dates2.default.visibleDays(focused, culture);
    var rows = _3.default.chunk(month, 7);

    var elementProps = _3.default.omit(this.props, Object.keys(propTypes));

    return _react2.default.createElement(
      'table',
      _extends({}, elementProps, {
        role: 'grid'
      }),
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          this._headers(rows[0], dayFormat(this.props), culture)
        )
      ),
      _react2.default.createElement(
        'tbody',
        null,
        rows.map(this._row)
      )
    );
  },
  _row: function _row(row, rowIdx) {
    var _this = this;

    var _props2 = this.props;
    var focused = _props2.focused;
    var today = _props2.today;
    var disabled = _props2.disabled;
    var onChange = _props2.onChange;
    var value = _props2.value;
    var days = _props2.days;
    var culture = _props2.culture;
    var min = _props2.min;
    var max = _props2.max;
    var Day = _props2.dayComponent;
    var id = (0, _widgetHelpers.instanceId)(this);
    var labelFormat = _localizers.date.getFormat('footer');

    return _react2.default.createElement(
      'tr',
      { key: 'week_' + rowIdx, role: 'row' },
      row.map(function (day, colIdx) {

        var isFocused = isEqual(day, focused),
            isSelected = isEqual(day, days),
            isToday = isEqual(day, today),
            date = _localizers.date.format(day, dateFormat(_this.props), culture),
            label = _localizers.date.format(day, labelFormat, culture);

        var currentID = optionId(id, day);

        return !_dates2.default.inRange(day, min, max) ? _react2.default.createElement(
          'td',
          { key: 'day_' + colIdx, role: 'presentation', className: 'rw-empty-cell' },
          ' '
        ) : _react2.default.createElement(
          'td',
          {
            key: 'day_' + colIdx,
            role: 'gridcell',
            id: currentID,
            title: label,
            'aria-selected': isSelected,
            'aria-label': label,
            'aria-readonly': disabled
          },
          _react2.default.createElement(
            'span',
            {
              'aria-labelledby': currentID,
              onClick: onChange.bind(null, day),
              className: (0, _classnames2.default)('rw-btn', {
                'rw-off-range': _dates2.default.month(day) !== _dates2.default.month(focused),
                'rw-state-focus': isFocused,
                'rw-state-selected': isSelected,
                'rw-now': isToday
              })
            },
            Day ? _react2.default.createElement(Day, { date: day, label: date }) : date
          )
        );
      })
    );
  },
  _headers: function _headers(week, format, culture) {
    return week.map(function (date) {
      return _react2.default.createElement(
        'th',
        { key: 'header_' + _dates2.default.weekday(date, undefined, _localizers.date.startOfWeek(culture)) },
        _localizers.date.format(date, format, culture)
      );
    });
  }
});

exports.default = MonthView;
module.exports = exports['default'];