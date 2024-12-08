import React, { useEffect, useState } from 'react';
//import Quagga from 'quagga';
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = () => {
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Start Quagga barcode scanner
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#barcode-scanner'),
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment"
        },
      },
      decoder: {
        readers: ["code_128_reader"]
      },
    }, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    // Callback when barcode is detected
    Quagga.onDetected((data) => {
      console.log("Barcode detected and processed", data);
      setScannedBarcode(data.codeResult.code);
      Quagga.stop();
    });

    // Cleanup function
    return () => {
      Quagga.stop();
    };
  }, []);

  useEffect(() => {
    // When scannedBarcode changes, navigate to product detail page
    if (scannedBarcode) {
      fetchProductDetailsAndRedirect(scannedBarcode);
    }
  }, [scannedBarcode]);

  const fetchProductDetailsAndRedirect = async (barcode) => {
    try {
      // Redirect to product detail page with the scanned barcode ID
      const productDetailURL = `/selectedItem/${barcode}`;
      navigate(productDetailURL);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div id="barcode-scanner"></div>
  );
};

export default BarcodeScanner;
