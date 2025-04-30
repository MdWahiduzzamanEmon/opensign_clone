import { useTranslation } from 'react-i18next';
import { isMobile } from '../../config';
import { Box } from '@mui/material';
import GetWidgetType from './GetWidgetType/GetWidgetType';

function WidgetList(props) {
  const { t } = useTranslation();

  return props.updateWidgets.map((item, ind) => {
    const widgetName = t(`widgets-name.${item.type}`);

    return (
      <Box key={ind} paddingBottom={0.5}>
        <Box
          data-tut="isSignatureWidget"
          sx={{
            userSelect: 'none',
            marginX: { xs: 0.25, md: 0 },
            cursor: 'grab',
          }}
          onClick={() => {
            props.addPositionOfSignature && props.addPositionOfSignature('onclick', item);
          }}
          ref={!isMobile && item.ref ? item.ref : null}
          onMouseMove={(e) => !isMobile && props?.handleDivClick(e)}
          onMouseDown={() => !isMobile && props?.handleMouseLeave()}
          onTouchStart={(e) => !isMobile && props?.handleDivClick(e)}
        >
          {item.ref && <GetWidgetType item={item} widgetName={widgetName} />}
        </Box>
      </Box>
    );
  });
}

export default WidgetList;
