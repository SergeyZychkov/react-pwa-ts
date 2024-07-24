import { useState, useEffect } from "react";
import DownloadLink from './DownloadLink';
import apiClient from '../utilities/apiService';

interface IUploadedFiles {
    name: string;
}

const UploadContent = () => {
    const [file, setFile] = useState<File>();
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<IUploadedFiles[]>([]);

    const contentCacheName = 'contentCache';

    useEffect(() => {
        populateUploadedFiles();
    }, []);

    async function populateUploadedFiles() {
        const response = await apiClient.get('/content/GetFilesFromContentFolder');
        cacheContent();
        setUploadedFiles(response.data);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSuccessful(false);
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    function buildLink(fileName: string) {
        return 'api/content/DownloadFile?fileName=' + fileName;
    }

    function cacheContent() {
        if ('caches' in window) {
            uploadedFiles.forEach((item) => {
                const path = buildLink(item.name);
                caches.match(path)
                    .then(function(response) {
                        if (!response) {
                            return fetch(path)
                                .then(function(res) {
                                    return caches.open(contentCacheName)
                                        .then(function(cache) {
                                            cache.put(path, res.clone());
                                        });
                                });
                        }
                    });
            });
        }
    }

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            await apiClient.postForm('/content/upload', formData)
                .then(function() {
                
                setFile(undefined);
                setIsSuccessful(true);
                populateUploadedFiles();
            });;
        }
    };

    return (
        <div>
            <div>
                <label htmlFor="file">
                    Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
            {isSuccessful && <p>File was uploaded!</p>}
            {file && (
                <div>
                    <br />
                    <img alt="not found" width="150px" src={URL.createObjectURL(file)} />
                </div>
            )}

            {file && <button onClick={handleUpload}>Upload a file</button>}

            <br />
            <p>List of uploaded files:</p> {uploadedFiles && <button onClick={cacheContent}>Cache files for offline mode</button>}
            {uploadedFiles.map(f =>
                    <DownloadLink url={buildLink(f.name)} fileName={f.name} key={f.name}></DownloadLink>
                )}
        </div>
    );
};

export default UploadContent;