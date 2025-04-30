import React from 'react';
import { widgets } from '../../constant/constant';
import GetWidgetType from './GetWidgetType/GetWidgetType';

function DragElement({ item }) {
  const filterWidgetPreview = widgets.find((data) => data.type === item?.text);

  return (
    <div>
      {filterWidgetPreview && <GetWidgetType item={filterWidgetPreview} widgetName={item?.text} />}
    </div>
  );
}

export default DragElement;
