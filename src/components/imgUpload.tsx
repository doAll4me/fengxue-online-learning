import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import AV from 'leancloud-storage';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ImgUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  // 使用action接口上传图片时，监测上传进度（但这种是公司用的
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // 通过自定义方法上传 customRequest 【此项目选择本方案】
  const handleUpload = (info: any) => {
    console.log(info.file); //info.file是文件执行对象
    // 转化为后端要求的格式 base64编码字符串
    getBase64(info.file, async (mybase64) => {
      // console.log(mybase64); //对图片file进行了特殊编码data:image/png;base64,iVBORw0KG...（这个编码可以直接访问图片
      // setImageUrl(base64);
      // const data = { base64: 'TGVhbkNsb3Vk' };

      //使用SDK构建资源，并存储到云端
      const res: any = await new AV.File('code26.png', {
        base64: mybase64,
      }).save();
      // console.log(res);返回的url是真正的线上链接
      let { url } = res.attributes;
      setImageUrl(url); //上传后预览图片
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>图片上传</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={handleUpload}
      >
        {imageUrl ? (
          <img
            draggable={false}
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default ImgUpload;
