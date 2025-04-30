import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Stack,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDrag } from 'react-dnd';
import WidgetList from './WidgetList';
import { useTranslation } from 'react-i18next';
import { isMobile, radioButtonWidget, textInputWidget, textWidget } from '../../config';
import { widgets } from '../../constant/constant';

function WidgetComponent(props) {
  const { t } = useTranslation();
  const signRef = useRef(null);
  const userInformation = localStorage.getItem('UserInformation');
  const [isSignersModal, setIsSignersModal] = useState(false);

  const [, signature] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 1, text: 'signature' },
  });
  const [, stamp] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 2, text: 'stamp' },
  });
  const [, dropdown] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 5, text: 'dropdown' },
  });
  const [, checkbox] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 6, text: 'checkbox' },
  });
  const [, textInput] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 7, text: textInputWidget },
  });
  const [, initials] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 8, text: 'initials' },
  });
  const [, name] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 9, text: 'name' },
  });
  const [, company] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 10, text: 'company' },
  });
  const [, jobTitle] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 11, text: 'job title' },
  });
  const [, date] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 12, text: 'date' },
  });
  const [, image] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 13, text: 'image' },
  });
  const [, email] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 14, text: 'email' },
  });
  const [, radioButton] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 15, text: radioButtonWidget },
  });
  const [, text] = useDrag({
    type: 'BOX',
    item: { type: 'BOX', id: 16, text: textWidget },
  });

  const [widget, setWidget] = useState([]);
  const handleModal = () => {
    setIsSignersModal(!isSignersModal);
  };

  useEffect(() => {
    const widgetRef = [
      signature,
      stamp,
      initials,
      name,
      jobTitle,
      company,
      date,
      text,
      textInput,
      checkbox,
      dropdown,
      radioButton,
      image,
      email,
    ];
    const getWidgetArray = widgets;
    const newUpdateSigner = getWidgetArray.map((obj, ind) => {
      return { ...obj, ref: widgetRef[ind] };
    });

    setWidget(newUpdateSigner);
    // eslint-disable-next-line
  }, []);

  const getFilteredWidgets = () => {
    if (props.isSignYourself)
      return widget.filter(
        (data) =>
          !['dropdown', radioButtonWidget, textInputWidget, 'date', 'image', 'checkbox'].includes(
            data.type,
          ),
      );
    if (props.isTemplateFlow) return widget.filter((data) => data.type !== textWidget);
    if (!props.isAlllowModify) return widget;

    return userInformation
      ? widget.filter(
          (data) =>
            !['dropdown', radioButtonWidget, textInputWidget, 'date', 'image', 'checkbox'].includes(
              data.type,
            ),
        )
      : widget.filter(
          (data) =>
            ![
              'dropdown',
              radioButtonWidget,
              textInputWidget,
              'date',
              'image',
              'checkbox',
              'name',
              'email',
              'job title',
              'company',
            ].includes(data.type),
        );
  };
  const updateWidgets = getFilteredWidgets();

  const handleSelectRecipient = () => {
    if (
      props.signersdata[props.isSelectListId]?.Email ||
      props.signersdata[props.isSelectListId]?.Role
    ) {
      const userData =
        props.signersdata[props.isSelectListId]?.Name ||
        props.signersdata[props.isSelectListId]?.Role;
      const name = userData?.length > 20 ? `${userData.slice(0, 20)}...` : userData;
      return name;
    }
  };

  return (
    <>
      {isMobile ? (
        !props.isMailSend && (
          <Box position="fixed" zIndex={99} bottom={0} right={0} width="100%">
            {props.isSigners && (
              <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                <Box flexGrow={1} onClick={handleModal}>
                  <Select
                    fullWidth
                    value={handleSelectRecipient()}
                    disabled
                    variant="outlined"
                    sx={{ backgroundColor: props.blockColor || '#e0e0e0' }}
                  >
                    <MenuItem value={handleSelectRecipient()}>{handleSelectRecipient()}</MenuItem>
                  </Select>
                </Box>

                <Box width="18%">
                  {props.handleAddSigner ? (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={props.handleAddSigner}
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  ) : (
                    props.setIsAddSigner && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => props.setIsAddSigner(true)}
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    )
                  )}
                </Box>
              </Stack>
            )}

            <Box borderTop={2} borderColor="primary.main" bgcolor="background.paper">
              <Box display="flex" overflow="auto" py={1} pr={1}>
                <WidgetList
                  updateWidgets={updateWidgets}
                  handleDivClick={props.handleDivClick}
                  handleMouseLeave={props.handleMouseLeave}
                  signRef={signRef}
                  marginLeft={5}
                  addPositionOfSignature={props.addPositionOfSignature}
                />
              </Box>
            </Box>
          </Box>
        )
      ) : (
        <Box
          height="100%"
          sx={{
            // pointerEvents: props.isMailSend ? 'none' : 'auto',
            // opacity: props.isMailSend ? 0.5 : 1,
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Box px={2} pt={2} pb={1} borderBottom={1} borderColor="divider">
            <Typography fontWeight="bold">{t('Roles')}</Typography>
          </Box>

          <Box p={2} pt={4}>
            <WidgetList
              updateWidgets={updateWidgets}
              handleDivClick={props.handleDivClick}
              handleMouseLeave={props.handleMouseLeave}
              signRef={signRef}
            />
          </Box>
        </Box>
      )}

      <Dialog open={isSignersModal} onClose={handleModal} fullWidth maxWidth="sm">
        <DialogTitle>{props.title || t('recipients')}</DialogTitle>
        <DialogContent>
          {props.signersdata?.length > 0 ? (
            <Box maxHeight="600px" overflow="auto">
              {/* RecipientList component goes here */}
            </Box>
          ) : (
            <Box p={2} textAlign="center">
              <Typography>
                {t('please-add')} {props.title || t('recipients')}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default WidgetComponent;
