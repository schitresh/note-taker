import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Container,
  useMediaQuery,
  Snackbar,
  Alert,
  Drawer,
  Paper
} from '@mui/material';
import NoteAppBar from './NoteAppBar';
import NoteList from './NoteList';
import NoteItem from './NoteItem';
import { notesApi } from '../../services/apiService';

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  // Handle Mobile View

  const isMobile = useMediaQuery('(max-width:600px)');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const toggleMenuDrawer = () => {
    setMenuDrawerOpen(!menuDrawerOpen);
  };

  // Query Handlers

  const queryClient = useQueryClient();

  const { data: notes = [], isPending, isError, error: queryError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => notesApi.list(),
  });

  useEffect(() => {
    if (!queryError) return;
    showSnackbar(queryError.response?.data?.detail, 'error');
  }, [queryError]);

  const createNoteMutation = useMutation({
    mutationFn: (newNote) => notesApi.create(newNote),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setSelectedNote(response.data);
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.detail, 'error');
    }
  });

  const updateNoteMutation = useMutation({
    mutationFn: (note) => notesApi.update(note.id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.detail, 'error');
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id) => notesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setSelectedNote(null);
      showSnackbar('Note deleted successfully', 'success');
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.detail, 'error');
    }
  });

  // Effects

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    let currentNote = notes[0];
    const lastSelectedNoteId = localStorage.getItem('lastSelectedNoteId');

    if (selectedNote) {
      currentNote = notes.find(note => note.id === selectedNote.id)
    } else if (lastSelectedNoteId) {
      currentNote = notes.find(note => note.id === lastSelectedNoteId)
    }

    setSelectedNote(currentNote);
  }, [isPending, notes, selectedNote]);

  // Action Handlers

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    localStorage.setItem('lastSelectedNoteId', note.id);
    toggleMenuDrawer();
  };

  const handleSave = (note) => {
    if (note.id) updateNoteMutation.mutate(note);
    else createNoteMutation.mutate(note);
    if (menuDrawerOpen) toggleMenuDrawer();
  };

  const handleDelete = (note) => {
    if (window.confirm('Are you sure?')) {
      deleteNoteMutation.mutate(note.id);
    }
  };

  // Handle Error Display

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Render Helpers

  const renderSnackbar = () => (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        variant="filled"
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );

  const renderDetail = () => (
    <Box
      key={`notes-detail-${selectedNote?.id}`}
      sx={{ width: '100%', overflowY: 'auto' }}
    >
      <NoteItem
        note={selectedNote}
        onSave={handleSave}
        onDelete={handleDelete}
        isSaving={createNoteMutation.isPending || updateNoteMutation.isPending}
      />
    </Box>
  )

  const renderNoteList = () => (
    <NoteList
      notes={notes}
      selectedNote={selectedNote}
      onSelect={handleSelectNote}
      onSave={handleSave}
    />
  )

  const renderSidebarDesktop = () => (
    renderNoteList()
  );

  const renderSidebarMobile = () => (
    <Drawer
      variant="temporary"
      open={menuDrawerOpen}
      onClose={toggleMenuDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          mt: '56px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        },
      }}
    >
      {renderNoteList()}
    </Drawer>
  );

  if (isPending) return <Container>Loading...</Container>;
  if (isError) return <Container>Something went wrong</Container>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {renderSnackbar()}
      <Paper
        square
        sx={{
          minWidth: isMobile ? '100%' : '300px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <NoteAppBar
          isMobile={isMobile}
          toggleMenuDrawer={toggleMenuDrawer}
          onLogout={() => {
          }}
        />
        {isMobile ? renderSidebarMobile() : renderSidebarDesktop()}
      </Paper>
      {renderDetail()}
    </Box>
  );
};

export default Notes;
