import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

const QRGenerator = ({ dish, quantities, totalCalories }) => {
  const qrData = {
    dishName: dish.dishname,
    items: dish.ingredients.map((item, idx) => ({
      name: item.name,
      quantity: quantities[idx],
      calories: (item.calories || 0) * (quantities[idx] || 1),
    })),
    totalCalories: totalCalories,
  };

  const handleDownload = async () => {
    const qrElement = document.getElementById("qr-code"); // Make sure the id matches your QR code element
    if (qrElement) {
      const dataUrl = await toPng(qrElement);
      const link = document.createElement("a");
      link.download = `${dish.dishname}-qr-code.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">Scan QR Code:</h3>
      <div id="qr-code" className="p-4 bg-gray-700 shadow-md rounded-md inline-block">
        <QRCode value={JSON.stringify(qrData)} />
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRGenerator;
