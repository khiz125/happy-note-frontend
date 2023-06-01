import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from './Button';
import { NotesContext } from '../note/Note';

interface InputTextAreaProps {
  name: string;
  addClassName?: string;
  defaultValue?: string;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({ 
  name,
  addClassName,
  defaultValue="",
  setIsEditing,
}) => {
  const { setIsRequested } = useContext(NotesContext);
  const [inputText, setInputText] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputText) {
      const data = {
        category: name,
        text: inputText
      }

      const url = `${process.env.REACT_APP_HARPERDB_CUSTOM_FUNCTIONS_URL}/happynote/notes/add/`;

      try {
        const results = await axios.post(url, data);
        console.log(results);
        setInputText("");
        setIsRequested(prevState =>!prevState);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-2">
        <div className='shadow-xl rounded-[20px] border border-gray-200 w-full mr-10'>
          <textarea
            className='relative hidden-scrollbar text-[#8A8684] min-w-[300px]
            border-gray-200 outline-none focus:border-[#D9D9D9] w-full p-4 rounded-[20px]'
            name={`${name}`}
            id=""
            cols={40}
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <Button
          addClassName={`min-w-[80px] p-2 h-[50px] ${addClassName}`}
          onClick={() => setIsRequested(false)}
        >
          保存
        </Button>
      </div>
    </form>
  )
}

export default InputTextArea;