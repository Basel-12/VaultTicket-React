import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { toast } from 'react-toastify';

interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  availableSeats: number;
}

const EventTable: React.FC = () => {
  const [rows, setRows] = useState<Event[]>([]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: new Date(),
    availableSeats: 0,
  });
    const [editMode, setEditMode] = useState(false);
    const [editRowId, setEditRowId] = useState<number | null>(null);


    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const res = await axios.get('/api/Events')
                setRows(res.data)

            }catch(err){
                toast.error('error fetching data')
            }
        }
        fetchdata()
    },[])

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

  const handleAddEvent = async() => {
    try{
            const res = await axios.post('/api/Events',formData)
            toast.success('Event added Sucsefully')
            handleClose();
            window.location.reload();
        }catch(err){
        toast.error(err.response.data)
    }
    
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

    const handleUpdateEvent = async () => {
        if (editRowId !== null) {
          try {
            await axios.put(`/api/Events/${editRowId}`, formData);
            toast.success('Event updated successfully');
            handleClose();
            window.location.reload(); // optional: better to refetch only
          } catch (err: any) {
            toast.error(err.response?.data || 'Error updating event');
          }
        }
      };
      

    const handleDeleteClick = async (id: number) => {
        try {
          await axios.delete(`/api/Events/${id}`);
          toast.success('Event deleted successfully');
          setRows((prev) => prev.filter((row) => row.id !== id));
        } catch (err: any) {
          toast.error(err.response?.data || 'Error deleting event');
        }
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
            value={formData.date instanceof Date && !isNaN(formData.date.getTime())
                ? formData.date.toISOString().split('T')[0]
                : ''}
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