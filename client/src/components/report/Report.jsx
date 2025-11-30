import axios from 'axios';
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon from Font Awesome
import './style.css'; // Import your custom styles
import { format } from 'date-fns'; // Import date-fns for date formatting

const Report = () => {
    const [data, setData] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showReport, setShowReport] = useState(false); // State to toggle report visibility

    const columns = useMemo(() => [
        { Header: 'P. No.', accessor: 'pno' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Level', accessor: 'level' },
        { Header: 'Created On', accessor: 'createdAt' },
        { Header: 'Option', accessor: 'switchOption' },
    ], []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/users/getTaxReport', {
                params: { fromDate, toDate },
                withCredentials: true
            });
            setData(response.data.reports); // Assuming response structure has 'reports' array
            setShowReport(true); // Show the report after fetching data
        } catch (error) {
            console.error('Error fetching data:', error);
            setData([]); // Clear data in case of error
            setShowReport(false); // Hide the report on error
            toast.error(error?.response?.data?.message);
        }
    };

    const handleViewButtonClick = () => {
        fetchData();
    };

    return (
        <div className="report-container">
            <header className="report-header">
                <h1>Tax Regime Reports</h1>
            </header>
            <div className="search-container">
                <div className="date-picker">
                    <label>From Date:</label>
                    <FaCalendarAlt className="calendar-icon" style={{
                        fontSize: "27px",
                        marginRight: "10px"
                    }} />
                    <div className="date-picker-wrapper">
                        <DatePicker
                            selected={fromDate}
                            onChange={date => setFromDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="date-input"
                        />
                    </div>
                </div>
                <div className="date-picker">
                    <label>To Date:</label>
                    <FaCalendarAlt className="calendar-icon" style={{
                        fontSize: "30px",
                        marginRight: "10px"
                    }}/>
                    <div className="date-picker-wrapper">
                        <DatePicker
                            selected={toDate}
                            onChange={date => setToDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="date-input"
                        />
                    </div>
                </div>
                <button className="view-button" onClick={handleViewButtonClick}>View</button>
            </div>
            <div className="table-container">
                <table className="report-table">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.accessor}>{column.Header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {showReport && data.map((row, index) => (
                            <tr key={index}>
                                {columns.map(column => (
                                    <td key={column.accessor}>
                                        {column.accessor === 'createdAt'
                                            ? format(new Date(row[column.accessor]), 'dd/MM/yyyy')
                                            : row[column.accessor]
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Report;
