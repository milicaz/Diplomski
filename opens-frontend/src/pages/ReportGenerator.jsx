import React, { useState } from 'react';
import axios from 'axios';

const ReportGenerator = () => {
    const [headerImage, setHeaderImage] = useState('');
    const [footerImage, setFooterImage] = useState('');

    const generateReport = () => {
        // Assuming you have logic to select/upload images and set their paths
        axios.get('/api/reports/generate', {
            params: {
                headerImage: headerImage,
                footerImage: footerImage
            },
            responseType: 'blob' // Important to receive PDF as blob
        }).then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }).catch(error => {
            console.error('Error generating report:', error);
        });
    };

    return (
        <div>
            {/* UI for selecting/uploading headerImage and footerImage */}
            <button onClick={generateReport}>Generate Report</button>
        </div>
    );
};

export default ReportGenerator;