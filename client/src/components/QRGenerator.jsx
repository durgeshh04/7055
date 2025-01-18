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
    totalCalories,
  };

  const handleDownload = async () => {
    const qrElement = document.getElementById("qr-code");
    if (qrElement) {
      const dataUrl = await toPng(qrElement);
      const link = document.createElement("a");
      link.download = `${dish.dishname}-qr-code.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
      <h3 className="text-xl font-bold text-white-800">Scan QR Code:</h3>
      <div
        id="qr-code"
        className="p-4 bg-gray-100 shadow rounded-md inline-block"
      >
        <QRCode value={JSON.stringify(qrData)} />
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Download QR Code
      </button>
      <button
        onClick={() => navigator.clipboard.writeText(JSON.stringify(qrData))}
        className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
      >
        Copy QR Data to Clipboard
      </button>
    </div>
  );
};

export default QRGenerator;
