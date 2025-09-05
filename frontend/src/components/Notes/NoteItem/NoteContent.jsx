import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const NoteContent = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    padding: 0,
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
      boxShadow: 'none',
    },
  },
  '& .MuiInputBase-input': {
    '&::placeholder': {
      opacity: 0.6,
    },
  },
}));

export default NoteContent;
