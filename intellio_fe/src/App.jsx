import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';

const ChatBox = ({ messages }) => (
  <Box sx={{ height: '300px', overflowY: 'auto', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
    {messages.map((message, index) => (
      <Paper
        key={index}
        sx={{
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: message.sender === 'user' ? '#d1e7ff' : '#e0e0e0',
          alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
    ))}
  </Box>
);

const InputBox = ({ input, setInput, sendMessage }) => (
  <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
    <TextField
      fullWidth
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
    />
    <Button variant="contained" type="submit">Send</Button>
  </Box>
);

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      try {
        const response = await axios.post('http://localhost:5000/query-discovery', { query: input });
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: response?.data?.response}]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '1rem', textAlign: 'center' }}>Intellio-Assistant</Typography>
      <ChatBox messages={messages} />
      <InputBox input={input} setInput={setInput} sendMessage={sendMessage} />
    </Container>
  );
};

const App = () => <ChatContainer />;

export default App;
