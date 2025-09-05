import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  Icon,
  IconButton,
  Typography
} from '@mui/material';
import { generationApi } from '../../services/apiService';

const TextGenerationDialog = ({ open, onClose, onAddText }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');

  // Query Handlers

  const { mutate: generate, isPending } = useMutation({
    mutationFn: (prompt) => generationApi.text(prompt),
    onSuccess: (data) => {
      setGeneratedText(data.generated_text || '');
      setError('');
    },
    onError: (error) => {
      setError(error.response?.data?.detail || 'Failed to generate text. Please try again.');
    }
  });

  // Action Handlers

  const handleGenerate = () => {
    if (prompt.trim()) {
      generate(prompt);
    }
  };

  const handleAdd = () => {
    if (generatedText.trim()) {
      onAddText(generatedText);
      handleClose();
    }
  };

  const handleClose = () => {
    setPrompt('');
    setGeneratedText('');
    setError('');
    onClose();
  };

  // Render Helpers

  const renderHeader = () => (
    <DialogTitle>
      Generate Text with AI
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Icon>close</Icon>
      </IconButton>
    </DialogTitle>
  )

  const renderPromptBox = () => (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleGenerate();
          }
        }}
        disabled={isPending}
        multiline
        rows={2}
        variant="outlined"
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
        <IconButton
          onClick={handleGenerate}
          disabled={isPending || !prompt.trim()}
          color="primary"
        >
          {isPending ? (
            <CircularProgress size={24} />
          ) : (
            <Icon fontSize="small">send</Icon>
          )}
        </IconButton>
      </Box>
    </Box>
  )

  const renderGeneratedText = () => (
    <TextField
      fullWidth
      label="Generated Text"
      value={generatedText}
      onChange={(e) => setGeneratedText(e.target.value)}
      multiline
      rows={8}
      variant="outlined"
      margin="normal"
      disabled={isPending}
    />
  )

  const renderActions = () => (
    <DialogActions>
      <Button onClick={handleClose}>
        Cancel
      </Button>
      <Button
        onClick={handleAdd}
        variant="contained"
        disabled={!generatedText.trim() || isPending}
      >
        Add to Note
      </Button>
    </DialogActions>
  )

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {renderHeader()}
      <DialogContent dividers>
        {renderPromptBox()}
        {renderGeneratedText()}
      </DialogContent>
      {renderActions()}
    </Dialog>
  );
};

export default React.memo(TextGenerationDialog);
