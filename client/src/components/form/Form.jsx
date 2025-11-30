import { useState } from 'react';
import axios from 'axios';
import './style.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TaxForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        pno: '',
        name: '',
        level: '',
        switchOption: '',
        enclosedDocs: false,
        financialYear: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/tax-form', formData, {
                withCredentials: true
            });
            console.log('Form submitted successfully:', response.data);
            if (response?.data?.success) {
                toast.success('Form submitted successfully');
                navigate("/home");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form');
        }
    };

    const handleDocumentSelection = (documentType) => {
        const pdfUrls = {
            'CBDT': 'https://www.indiafilings.com/learn/cbdt-clarification-on-section-115-bac-of-income-tax-act/',
            'TaxSlab': 'https://drive.google.com/file/d/1tWZkeIKBFALdPCSbs8t4car5wNEgUBzn/view'
        };

        if (pdfUrls[documentType]) {
            window.open(pdfUrls[documentType], '_blank');
        }

        setFormData({
            ...formData,
            enclosedDocs: documentType === 'CBDT' ? true : formData.enclosedDocs,
            financialYear: documentType === 'TaxSlab' ? true : formData.financialYear
        });
    };

    return (
        <div className="container-fluid">
            <div className="main-content">
                <div className="form-header">
                    <b>Tax Regime Switch option facility from default (New Tax Regime) to Old Tax Regime for Financial Year 2023-24</b>
                </div>
                <form className="tax-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="pno">Pno:</label>
                        <input type="text" id="pno" name="pno" value={formData.pno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="level">Level:</label>
                        <input type="text" id="level" name="level" value={formData.level} onChange={handleChange} required />
                    </div>
                    <div className="documents">
                        <label>Documents:</label>
                        <hr />
                        <div className="buttons">
                            <button type="button" onClick={() => handleDocumentSelection('CBDT')}>
                                CBDT clarification for TDS - 115BAC
                            </button>
                            <button type="button" onClick={() => handleDocumentSelection('TaxSlab')}>
                                New Tax Slab Vs Old Tax Slab Options
                            </button>
                            <button type="button" onClick={() => handleDocumentSelection('TaxCalculator')}>
                                Tax Calculator
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>You are currently under Income Tax default Option-I (New tax Regime).</label>
                    </div>
                    <div className="form-group">
                        <label>Do you want to switch from Option-I (New Tax Regime) to Option-II (Old Tax Regime)?</label>
                        <select name="switchOption" value={formData.switchOption} onChange={handleChange} required>
                            <option value="">Select Option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 checkbox-container flex">
                                <input type="checkbox" id="enclosedDocs" name="enclosedDocs" checked={formData.enclosedDocs} onChange={handleChange} required/>
                                <label htmlFor="enclosedDocs">I have read the enclosed documents attached carefully before exercising the switching option.</label>
                            </div>
                            <div className="col-12 checkbox-container flex">
                                <input type="checkbox" id="financialYear" name="financialYear" checked={formData.financialYear} onChange={handleChange} required/>
                                <label htmlFor="financialYear">I can switch only once in a Financial Year.</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaxForm;
