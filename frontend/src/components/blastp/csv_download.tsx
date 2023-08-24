import CsvDownload from "react-json-to-csv";

interface CsvDownloadComponentProps {
  data: Object[];
  loading?: boolean;
  title: string;
  filename: string;
}

function CsvDownloadComponent({
  data,
  loading,
  title,
  filename,
}: CsvDownloadComponentProps) {
  return (
    <CsvDownload data={data} filename={filename}>
      <button
        className={`text-white font-medium rounded-lg text-sm px-4 py-2 mr-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 ${
          loading === true && "cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {title}
      </button>
    </CsvDownload>
  );
}

export default CsvDownloadComponent;