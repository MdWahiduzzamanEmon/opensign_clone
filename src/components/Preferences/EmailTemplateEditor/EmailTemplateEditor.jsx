import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid } from '@mui/material';
import ReactQuill from 'react-quill';
import CInput from '../../../ui-component/Input/Input';
import SubCard from 'ui-component/cards/SubCard';
import { APP_NAME, INPUT_BORDER_RADIUS } from '../../../config';
import CButton from '../../../ui-component/CButton/CButton';

const EmailTemplateEditor = () => {
  const defaultTemplates = {
    request: {
      subject: '{{sender_name}} has requested you to sign {{document_title}}',
      body: `Hi {{receiver_name}},<br><br>
We hope this email finds you well. {{sender_name}} has requested you to review and sign the document titled "{{document_title}}".<br><br>
Your signature is crucial to proceed with the next steps as it signifies your agreement.<br><br>
{{signing_url}}<br><br>
If you have any questions or need further clarification, please contact the sender.<br><br>
Thanks,<br>Team ${APP_NAME}`,
    },
    completion: {
      subject: 'Document {{document_title}} has been signed by all parties',
      body: `<p>Hi {{sender_name}},</p><br><p>All parties have successfully signed the document {{document_title}}. Kindly download the document from the attachment.</p><br><p>Thanks</p><p>Team ${APP_NAME}</p>`,
    },
  };

  const [templates, setTemplates] = useState(defaultTemplates);

  const handleChange = (type, field, value) => {
    setTemplates((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleReset = (type) => {
    setTemplates((prev) => ({
      ...prev,
      [type]: defaultTemplates[type],
    }));
  };

  const renderEditor = (label, type) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" mb={2}>
        {label} Email
      </Typography>
      <SubCard>
        <CInput
          fullWidth
          label="Subject"
          value={templates[type].subject}
          onChange={(e) => handleChange(type, 'subject', e.target.value)}
          margin="normal"
        />
        <ReactQuill
          theme="snow"
          value={templates[type].body}
          placeholder="add body of email"
          onChange={(value) => handleChange(type, 'body', value)}
          style={{
            marginTop: '16px',
            marginBottom: '16px',
            border: '1px solid rgb(186, 187, 188)',
            borderRadius: INPUT_BORDER_RADIUS,
            overflow: 'hidden',
          }}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'align',
            'strike',
            'script',
            'blockquote',
            'background',
            'list',
            'indent',
            'link',
            'image',
            'color',
            'code-block',
            'undo',
            'redo',
            'clean',
          ]}
          modules={{
            toolbar: [
              [{ font: [] }, { size: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ script: 'sub' }, { script: 'super' }],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
        />
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item>
              <CButton variant="contained" onClick={() => console.log(templates)} label={' Save'} />
            </Grid>
            <Grid item>
              <CButton
                variant="outlined"
                color="error"
                onClick={() => handleReset(type)}
                label={' Reset'}
              />
            </Grid>
          </Grid>
        </Box>
      </SubCard>
    </Box>
  );

  return (
    <Box p={4}>
      {renderEditor('Request', 'request')}
      {renderEditor('Completion', 'completion')}
    </Box>
  );
};

export default EmailTemplateEditor;
