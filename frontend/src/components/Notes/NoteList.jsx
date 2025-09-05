import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Paper,
  Box,
  Button,
} from '@mui/material';

const NoteList = ({ notes, selectedNote, onSelect, onSave }) => {
  const renderListItem = (note) => (
    <ListItemButton
      key={`note-item-${note.id}`}
      selected={selectedNote?.id === note.id}
      onClick={() => onSelect(note)}
    >
      <ListItemText
        primary={renderPrimaryText(note)}
        secondary={renderSecondaryText(note)}
      />
    </ListItemButton>
  )

  const renderPrimaryText = (note) => (
    <Typography
      variant="subtitle1"
      noWrap
    >
      {note.title || 'Untitled'}
    </Typography>
  )

  const renderSecondaryText = (note) => (
    <Typography
      variant="body2"
      color="text.secondary"
      noWrap
    >
      {note.content || '...'}
    </Typography>
  )

  const renderAddButton = () => (
    <Button
      variant="contained"
      onClick={() => onSave({})}
      sx={{
        mx: 2,
        my: 1,
      }}
    >
      New Note
    </Button>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        width: '100%',
      }}>
      {renderAddButton()}
      <Divider />
      <Box sx={{ overflowY: 'auto' }}>
        <List disablePadding>
          {notes.map((note) => (
            <React.Fragment key={note.id}>
              {renderListItem(note)}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default NoteList;
