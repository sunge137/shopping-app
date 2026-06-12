function ResumePage() {
  const docUrl = process.env.GOOGLE_DOC_URL;
  return (
    <div className="doc-container" style={{ width: "100%", height: "800px" }}>
      <a className="text-blue-500 hover:text-blue-700" href={docUrl} target="_blank" rel="noopener noreferrer">
        My Resume
      </a>
      <iframe
        src={docUrl}
        width="100%"
        height="100%"
        title="Google Doc Embed"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default ResumePage;
