import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  availableSeats: number;
}

const EventTable: React.FC = () => {
  const [rows, setRows] = useState<Event[]>([
    {
      id: 1,
      title: 'Tech Conference 2025',
      description: 'The premier tech event of the year!',
      date: new Date('2025-11-15T00:00:00'),
      availableSeats: 500,
    },
    {
      id: 2,
      title: 'Local Art Exhibition',
      description: 'Showcasing the best local artists.',
      date: new Date('2025-05-20T00:00:00'),
      availableSeats: 50,
    },
    {
      id: 3,
      title: 'Summer Music Festival',
      description: 'Three days of amazing live music.',
      date: new Date('2025-07-10T00:00:00'),
      availableSeats: 2000,
    },
    {
      id: 4,
      title: 'Introduction to Python Programming',
      description: 'A beginner-friendly workshop.',
      date: new Date('2025-06-01T00:00:00'),
      availableSeats: 30,
    },
    {
      id: 5,
      title: "Book Club Meeting: 'The Great Gatsby'",
      description: 'Discussing the classic novel.',
      date: new Date('2025-05-05T00:00:00'),
      availableSeats: 15,
    },
    {
      id: 6,
      title: 'Charity Gala Dinner',
      description: 'An evening to support a great cause.',
      date: new Date('2025-09-28T00:00:00'),
      availableSeats: 120,
    },
    {
      id: 7,
      title: 'Hiking Adventure in Wadi Degla',
      description: 'Explore the beautiful landscapes.',
      date: new Date('2025-10-07T00:00:00'),
      availableSeats: 40,
    },
    {
      id: 8,
      title: 'Photography Workshop: Landscape',
      description: 'Learn the art of capturing stunning landscapes.',
      date: new Date('2025-08-18T00:00:00'),
      availableSeats: 25,
    },
    {
      id: 9,
      title: 'International Food Fair',
      description: 'Taste flavors from around the world.',
      date: new Date('2025-12-03T00:00:00'),
      availableSeats: 1000,
    },
    {
      id: 10,
      title: 'Yoga and Meditation Retreat',
      description: 'Rejuvenate your mind and body.',
      date: new Date('2025-06-25T00:00:00'),
      availableSeats: 20,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: new Date(),
    availableSeats: 0,
  });
    const [editMode, setEditMode] = useState(false);
    const [editRowId, setEditRowId] = useState<number | null>(null);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    { field: 'availableSeats', headerName: 'Available Seats', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditClick(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.id)}
        />,
      ],
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
    setFormData({
      title: '',
      description: '',
      date: new Date(),
      availableSeats: 0,
    });
      setEditMode(false);
  };

  const handleClose = () => {
    setOpen(false);
      setEditMode(false);
      setEditRowId(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'availableSeats' ? parseInt(value, 10) : value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        date: date,
      });
    }
  };

  const handleAddEvent = () => {
    setRows([...rows, { id: rows.length + 1, ...formData }]);
    handleClose();
  };

    const handleEditClick = (row: Event) => {
        setEditMode(true);
        setEditRowId(row.id);
        setFormData({
            title: row.title,
            description: row.description,
            date: row.date,
            availableSeats: row.availableSeats,
        });
        setOpen(true);
    };

    const handleUpdateEvent = () => {
        if (editRowId !== null) {
            const updatedRows = rows.map((row) =>
                row.id === editRowId ? { ...row, ...formData } : row
            );
            setRows(updatedRows);
        }
        handleClose();
    };

  const handleDeleteClick = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen} style={{ marginBottom: 16 }}>
        Add Event
      </Button>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Edit the details of the event.' : 'Enter the details of the new event.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.date.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
          />
          <TextField
            margin="dense"
            id="availableSeats"
            name="availableSeats"
            label="Available Seats"
            type="number"
            fullWidth
            value={formData.availableSeats}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editMode ? handleUpdateEvent : handleAddEvent} variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventTable;