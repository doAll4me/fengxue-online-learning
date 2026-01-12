// components/RichEditor.tsx
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  onChange?: (arg: string) => void;
};

// {onChange}:Props===props:Props  {onChange}=props解构和传参一起了
export default function RichEditor({ onChange }: Props) {
  const [value, setValue] = useState('');
  const handleChange = (v: string) => {
    // console.log(v);v是你在富文本编辑器输入的内容
    setValue(v);
    onChange!(v); //将富文本编辑器里的内容传递给父组件form
  };
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      style={{ height: '200px', marginBottom: '50px' }}
    />
  );
}
