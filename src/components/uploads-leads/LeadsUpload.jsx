import React, { useState } from "react";
import {
  Upload,
  X,
  CheckCircle2,
  Loader2,
  FileSpreadsheet,
} from "lucide-react";
import {leadsUpload} from '../../api/routes.js'

function LeadsUpload() {
  const [file, setFile] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !campaignName) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("campaignName", campaignName);

    setUploadStatus("uploading");

    try {
      const response = await leadsUpload(formData);
      setUploadStatus("success");
      setMessage(response.data.message);
      setFile(null);
      setCampaignName("");
    } catch (error) {
      setUploadStatus("error");
      setMessage(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Leads</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="e.g. Facebook Ads March"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              required
            />
          </div>

          {/* Upload Area */}
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 transition group bg-gray-50">
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 font-medium">
                {file ? file.name : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Excel or CSV files only
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-200"
          >
            Process Leads
          </button>
        </form>
      </div>

      {/* Uploading/Success Modal */}
      {uploadStatus !== "idle" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center relative">
            {uploadStatus !== "uploading" && (
              <button
                onClick={() => setUploadStatus("idle")}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            {uploadStatus === "uploading" && (
              <div className="flex flex-col items-center py-6">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Uploading Leads...
                </h3>
                <p className="text-gray-500 mt-2">
                  Please wait while we process your file.
                </p>
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="flex flex-col items-center py-6">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Upload Complete!
                </h3>
                <p className="text-green-600 mt-2 font-medium">{message}</p>
                <button
                  onClick={() => setUploadStatus("idle")}
                  className="mt-6 w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition"
                >
                  Close
                </button>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="flex flex-col items-center py-6">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                  <X className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Upload Failed
                </h3>
                <p className="text-red-500 mt-2">{message}</p>
                <button
                  onClick={() => setUploadStatus("idle")}
                  className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadsUpload;
