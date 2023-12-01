/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es';
import moment from 'moment';  // Importa moment para formatear las fechas
import '../Styles/rangeDataPicker.css';

// eslint-disable-next-line react/prop-types
const RangeDatePicker = ({ startDate, endDate, onDateChange }) => {
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    onDateChange({ startDate: start, endDate: end });
  };

  return (
    <div className="range-datepicker">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
        minDate={new Date()}
        selectsRange
        placeholderText="Rango de Fechas"
        dateFormat="dd/MM/yyyy"
        isClearable
        className="form-control"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        withPortal
        dateFormatCalendar="MMMM"
        dateFormatYear="yyyy"
      />
    </div>
  );
};

export default RangeDatePicker;
