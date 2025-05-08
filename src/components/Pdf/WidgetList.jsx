import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import GetWidgetType from './GetWidgetType/GetWidgetType';

function WidgetList(props) {
  const { t } = useTranslation();

  return props.updateWidgets.map((item, index) => {
    const widgetName = t(`widgets-name.${item.type}`);

    return (
      <Box key={index} paddingBottom={0.5}>
        <Box
          ref={item.ref}
          sx={{
            userSelect: 'none',
            cursor: 'grab',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <GetWidgetType item={item} widgetName={widgetName} />
        </Box>
      </Box>
    );
  });
}

export default WidgetList;
