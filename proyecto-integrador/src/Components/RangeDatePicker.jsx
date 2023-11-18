import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../Styles/rangeDataPicker.css";

const RangeDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
        placeholderText="Selecciona un rango de fechas"
        dateFormat="dd/MM/yyyy"
        isClearable
        className="form-control"
      />
    </div>
  );
};

export default RangeDatePicker;
