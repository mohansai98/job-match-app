import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const props = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.docx,.txt',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        onFileSelect(info.file.originFileObj);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file: File) => {
      if (document.querySelectorAll('.ant-upload-list-item').length > 0) {
        message.error('You can only upload one file.');
        return Upload.LIST_IGNORE;
      }

      onFileSelect(file);
      return false;
    },
  };

  return (
    <div>
    <h3>Resume</h3>
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single upload of types: .pdf, .docx, .txt
      </p>
    </Dragger>
    </div>
  );
};

export default FileUpload;