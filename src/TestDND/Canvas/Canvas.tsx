// Canvas.tsx
import { Box } from '@mui/material';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  WIDGET: 'item',
};

const Canvas = ({
  widgets,
  onDrop,
  onMove,
  handleOpenWidgetEditor,
  setSignaturePosition,
  pageNumber,
  children,
}: {
  widgets: Array<{
    pageNumber: number;
    id: string;
    left: number;
    top: number;
    type: string;
    text?: string;
  }>;
  onDrop: (item: {
    id: string;
    type: string;
    left: number;
    top: number;
    pageNumber: number;
  }) => void;
  onMove: (id: string, left: number, top: number) => void;
  handleOpenWidgetEditor: (id: string) => void;
  setSignaturePosition: (position: { x: number; y: number }) => void;
  pageNumber: number;
  children: React.ReactNode;
}) => {
  const [{ isOver }, drop] = useDrop<{ id?: string; type: string }, void, { isOver: boolean }>({
    accept: ItemTypes.WIDGET,
    drop(item, monitor) {
      const offset = monitor.getClientOffset();
      const dropTarget = document.getElementById('canvas');
      if (!dropTarget || !offset) return;

      const rect = dropTarget.getBoundingClientRect();
      const left = offset.x - rect.left;
      const top = offset.y - rect.top;

      const maxLeft = rect.width - 100;
      const maxTop = rect.height - 100;
      const clampedLeft = Math.max(0, Math.min(left, maxLeft));
      const clampedTop = Math.max(0, Math.min(top, maxTop));

      setSignaturePosition({ x: clampedLeft, y: clampedTop });

      if (!item.id) {
        const id = Date.now().toString();
        onDrop({ id, type: item.type, left: clampedLeft, top: clampedTop, pageNumber });
      } else {
        onMove(item.id, clampedLeft, clampedTop);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Box
      id="canvas"
      ref={drop}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: isOver ? 'rgba(0,0,0,0.1)' : 'transparent',
        cursor: isOver ? 'copy' : 'default',
      }}
    >
      {children}
      {widgets
        .filter((widget) => widget.pageNumber === pageNumber)
        .map((widget) => (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            left={widget.left}
            top={widget.top}
            type={widget.type}
            onMove={onMove}
            onClick={() => handleOpenWidgetEditor(widget.id)}
            text={widget.text}
          />
        ))}
    </Box>
  );
};

export default Canvas;

const DraggableWidget = ({
  id,
  left,
  top,
  type,
  onMove,
  onClick,
  text,
}: {
  id: string;
  left: number;
  top: number;
  type: string;
  onMove: (id: string, left: number, top: number) => void;
  onClick: () => void;
  text?: string;
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.WIDGET,
      item: { id, type, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      hover(item: any, monitor) {
        if (!ref.current) return;

        const delta = monitor.getDifferenceFromInitialOffset();
        if (!delta) return;

        const canvas = document.getElementById('canvas');
        if (!canvas) return;

        const canvasRect = canvas.getBoundingClientRect();
        const widgetRect = ref.current.getBoundingClientRect();

        const newLeft = Math.round(item.left + delta.x);
        const newTop = Math.round(item.top + delta.y);

        const maxLeft = canvasRect.width - widgetRect.width;
        const maxTop = canvasRect.height - widgetRect.height;

        const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
        const clampedTop = Math.max(0, Math.min(newTop, maxTop));

        if (Math.abs(clampedLeft - item.left) > 1 || Math.abs(clampedTop - item.top) > 1) {
          item.left = clampedLeft;
          item.top = clampedTop;
          onMove(item.id, clampedLeft, clampedTop);
        }
      },
    }),
    [onMove],
  );

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left,
        top,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
      onClick={onClick}
    >
      {text || type}
    </div>
  );
};
