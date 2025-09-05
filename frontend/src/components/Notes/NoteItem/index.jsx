import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Icon,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

import TextGenerationButton from '../../Generation/TextGenerationButton';
import NoteTitle from './NoteTitle';
import NoteContent from './NoteContent';

const NoteItem = ({ note, onSave, onDelete }) => {
  const [editedNote, setEditedNote] = useState(note);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveTimeoutRef = useRef(null);
  const contentRef = useRef(null);

  // Initialize
  useEffect(() => {
    if (!note) return;
    setEditedNote(note);
    setHasChanges(false);

    // Focus the content field when note changes
    if (!contentRef.current) return;
    contentRef.current.focus();
  }, []);

  // Auto-save after changes with debounce
  useEffect(() => {
    if (!editedNote || !hasChanges) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => { handleSave(); }, 2000);
  }, [hasChanges, editedNote]);

  // Action Handlers

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => {
      if (prev[name] === value) return prev;
      setHasChanges(true);
      return { ...prev, [name]: value }
    });
  };

  const handleSave = async () => {
    if (!editedNote || !hasChanges) return;

    try {
      setIsSaving(true);
      await onSave(editedNote);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddGeneratedText = (text) => {
    setEditedNote(prev => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${text}` : text
    }));
    setHasChanges(true);
  };

  // Render Helpers

  const renderTitle = () => (
    <NoteTitle
      fullWidth
      variant="outlined"
      name="title"
      value={editedNote.title}
      onChange={handleInputChange}
      placeholder="Untitled Note"
    />
  )

  const renderStatus = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Typography
        variant="caption"
        color="textSecondary"
      >
        {isSaving ? 'Saving...' : (hasChanges ? 'Pending Save...' : 'Saved')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 2
        }}
      >
        <TextGenerationButton
          onAddText={handleAddGeneratedText}
          size="small"
          variant="outlined"
          startIcon={<Icon>auto_awesome</Icon>}
        />
        {onDelete && (
          <Tooltip title="Delete note">
            <IconButton onClick={() => onDelete(note)}>
              <Icon>delete</Icon>
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )

  const renderContent = () => (
    <NoteContent
      fullWidth
      multiline
      variant="outlined"
      name="content"
      value={editedNote.content}
      onChange={handleInputChange}
      placeholder="Start writing here..."
      inputRef={contentRef}
    />
  )

  if (!note) return null;
  if (!editedNote) return null;

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: 'auto',
        height: '100%',
        overflowY: 'auto',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          mb: 4,
          position: 'relative'
        }}
      >
        {renderTitle()}
        {renderStatus()}
      </Box>
      {renderContent()}
    </Box>
  );
};

export default NoteItem;
