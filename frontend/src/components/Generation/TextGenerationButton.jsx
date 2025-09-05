import React, { useState } from 'react';
import { Icon, IconButton } from '@mui/material';
import TextGenerationDialog from './TextGenerationDialog';

const TextGenerationButton = ({ onAddText }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddText = (text) => {
    if (onAddText && text) {
      onAddText(text);
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setIsDialogOpen(true)}>
        <Icon>auto_awesome</Icon>
      </IconButton>
      <TextGenerationDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddText={handleAddText}
      />
    </>
  );
};

export default TextGenerationButton;
