import axios from "axios";
import React, { useState } from "react";
import { Button, message, Empty } from "antd";
import "./FileInput.css";
import { UploadOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()

  const handleWarning = () => {
    messageApi.open({
      type: "warning",
      content: "No file selected",
    });
  };

  const onFileChange = (event) => {
    setSelectedFile([...selectedFile, ...event.target.files]);
  };

  const onFileUpload = async () => {
    if (!selectedFile.length) {
      return handleWarning();
    }
    const formData = new FormData();

    selectedFile.forEach((file) => {
      formData.append("files", file, file.name);
    });
    const response = await axios.post("http://localhost:8081/uploadLogFiles", formData);
    if(response.status === 200) {
      navigate("/dashboard")
    }
  };

  const fileData = () => {
    if (selectedFile.length) {
      return (
        <div className="selected-files-container">
          <h2>Selected Files</h2>
          {selectedFile.map((item) => (
            <div key={item.name}>
              <p>
               {item.name}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return <Empty description="No files selected"/>
  };

  return (
    <>
      {contextHolder}
      <div className="file-input-root">
        <Button type="primary" size="large">
          <label for="file-upload" className="choose-file-btn">
            Choose File
          </label>
        </Button>

        <input id="file-upload" type="file" multiple onChange={onFileChange} />
        <Button
          size="large"
          type="default"
          className="upload-btn"
          onClick={onFileUpload}
          icon={<UploadOutlined />}
        >
          Upload!
        </Button>
      </div>
      <div className="file-details">{fileData()}</div>
    </>
  );
};

export default FileInput;
