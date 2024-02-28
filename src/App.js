import React, { useState } from 'react';
import axios from 'axios';

function TextractForm() {
  const [file, setFile] = useState(null);
  const [extractedFields, setExtractedFields] = useState([]);
  const [headData, setHeadData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // New state for dropdown

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/extract-fields', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setExtractedFields(response.data.analyzePdf);
      setHeadData(response.data.head);
    } catch (error) {
      console.error('Error extracting fields:', error);
      alert('An error occurred while extracting fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Extract Fields from PDF</h1>
      <form style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input type="file" onChange={handleFileChange} />
        <select value={selectedOption} onChange={handleDropdownChange} style={{ marginLeft: '10px' }}>
          <option value="">Select an option</option>
          <option value="Himalaya">Himalaya</option>
          <option value="PNB">PNB</option>
          <option value="Vishal Mega">Vishal Mega</option>
        </select>
        <button type="button" style={{ marginLeft: '10px' }} onClick={handleUpload} disabled={loading}>
          {loading ? 'Extracting...' : 'Extract Fields'}
        </button>
      </form>
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
        <h2>Head Data:</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(headData).map(([key, value], index) => (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{key}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {extractedFields.map((data, index) => (
        <div key={index}>
          <h2 style={{ textAlign: 'center' }}>Extracted Table {index + 1}:</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Sno</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>EAN No</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Article Description</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>UOM</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Qty</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Free</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>B.Price</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Sp.Dis %</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Sch.Val</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>SGST/UTGST %</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>CGST/IGST %</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Cess</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>L.Price</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>MRP</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>T.Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['Sno']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['EAN No']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['Article Description']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['UOM']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['Qty']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['Free']}</td>
                  {/* Accept both variations for B.Price */}
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['B.Price'] || item['B. Price'] ||item['B. .Price'] || item['B Price']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['Sp.Dis\n%'] || item['Sp. Dis\n%'] || item['Sp. .Dis\n%'] || item['Sp Dis\n%'] }</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['Sch.Val'] || item['Sch. Val'] || item['Sch Val'] || item['Sch. .Val'] }</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['SGST/\nUTGST\n%']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['CGST/\nIGST\n%']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['Cess']}</td>
                  {/* Accept both variations for L.Price */}
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['L.Price'] || item['L. Price'] || item['L. .Price'] || item['L Price']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['MRP']}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item['T. .Value']||item['T. Value'] || item['T.Value'] ||  item['Value'] ||  item['T Value']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TextractForm;
