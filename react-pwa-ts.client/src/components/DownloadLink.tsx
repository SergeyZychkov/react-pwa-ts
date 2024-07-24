interface IProps {
    url: string,
    fileName?: string;
}

const DownloadLink = ({ url, fileName }: IProps) => {
    const handleDownload = () => {
        fetch(url)
            .then((response) => {
                return response.blob().then(blob => {
                    return {
                        contentType: response.headers.get("Content-Type") ?? "application/octet-stream",
                        raw: blob
                    }
                });
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob.raw], {type: blob.contentType}));

                window.open(url, "_blank");
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error fetching the file:", error);
            });
    };

    return (
        <div>
            {fileName}
            <button onClick={handleDownload}>
        Open
        </button>
        </div>
);
};

export default DownloadLink;