import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const NoteTitle = styled(TextField)(() => ({
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
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    padding: 0,
    color: 'text.primary',
    '&::placeholder': {
      color: 'text.secondary',
      opacity: 0.5,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export default NoteTitle;
