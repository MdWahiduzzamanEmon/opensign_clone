// Canvas.tsx
import { Box } from '@mui/material';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FiSettings, FiUser, FiCopy, FiX } from 'react-icons/fi';

const ItemTypes = {
  WIDGET: 'item',
};

const widgetTypeLabels: Record<string, string> = {
  text_input: 'Text Input',
  signature: 'Signature',
  initials: 'Initials',
  checkbox: 'Checkbox',
  dropdown: 'Dropdown',
  radio_button: 'Radio Button',
  date: 'Date',
  image: 'Image',
  email: 'Email',
  name: 'Name',
  company: 'Company',
  job_title: 'Job Title',
  text: 'Text',
  stamp: 'Stamp',
};

const Canvas = ({
  widgets,
  onDrop,
  onMove,
  handleOpenWidgetEditor,
  setSignaturePosition,
  pageNumber,
  onRemoveWidget, // add this prop
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
  onRemoveWidget: (id: string) => void; // add this prop
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
            onRemove={() => onRemoveWidget(widget.id)} // pass remove handler
            text={widget.text}
          />
        ))}
    </Box>
  );
};

export default Canvas;

const MIN_WIDTH = 60;
const MAX_WIDTH = 600;
const MIN_HEIGHT = 32;
const MAX_HEIGHT = 300;

const DraggableWidget = ({
  id,
  left,
  top,
  type,
  onMove,
  onClick,
  onRemove,
  text,
}: {
  id: string;
  left: number;
  top: number;
  type: string;
  onMove: (id: string, left: number, top: number) => void;
  onClick: () => void;
  onRemove: () => void;
  text?: string;
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ width: 180, height: 48 });
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeDir, setResizeDir] = React.useState<string | null>(null);
  const startPos = React.useRef<{ x: number; y: number; width: number; height: number }>({
    x: 0,
    y: 0,
    width: 180,
    height: 48,
  });

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

  // Resize logic for all sides/corners
  const handleResizeMouseDown = (dir: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDir(dir);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
      };
    }
  };

  React.useEffect(() => {
    if (!isResizing || !resizeDir) return;
    const handleMouseMove = (e: MouseEvent) => {
      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;
      let dx = e.clientX - startPos.current.x;
      let dy = e.clientY - startPos.current.y;
      if (resizeDir === 'bottom-right') {
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startPos.current.width + dx));
        newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, startPos.current.height + dy));
      } else if (resizeDir === 'right') {
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startPos.current.width + dx));
      } else if (resizeDir === 'bottom') {
        newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, startPos.current.height + dy));
      }
      setSize({ width: newWidth, height: newHeight });
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDir(null);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDir]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left,
        top,
        width: size.width,
        height: size.height,
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        minHeight: MIN_HEIGHT,
        maxHeight: MAX_HEIGHT,
        background: 'rgba(199,215,245,0.95)',
        border: '2.5px dashed #7da7e6',
        borderRadius: 16,
        boxShadow: '0 2px 12px 0 rgba(33, 150, 243, 0.10)',
        padding: 0,
        zIndex: isDragging ? 1000 : 1,
        transition:
          'box-shadow 0.2s, left 0.18s cubic-bezier(.4,2,.6,1), top 0.18s cubic-bezier(.4,2,.6,1), opacity 0.18s',
        opacity: isDragging ? 0.5 : 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: isDragging ? 'grabbing' : 'pointer',
        userSelect: 'none',
      }}
      onClick={onClick}
      className="draggable-widget-pill"
    >
      {/* Top-right pill with action buttons */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: 12,
          display: 'flex',
          gap: 6,
          background: '#f8faff',
          borderRadius: 20,
          boxShadow: '0 1px 4px 0 #b3c6e6',
          padding: '2px 12px',
          alignItems: 'center',
          border: '1.5px solid #b3c6e6',
          height: 32,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#7da7e6',
            cursor: 'pointer',
            fontSize: 18,
            padding: 0,
          }}
          aria-label="Settings"
        >
          <FiSettings />
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#7da7e6',
            cursor: 'pointer',
            fontSize: 18,
            padding: 0,
          }}
          aria-label="User"
        >
          <FiUser />
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#7da7e6',
            cursor: 'pointer',
            fontSize: 18,
            padding: 0,
          }}
          aria-label="Copy"
        >
          <FiCopy />
        </button>
        <button
          type="button"
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            color: '#e53935',
            cursor: 'pointer',
            fontSize: 20,
            marginLeft: 2,
            padding: 0,
          }}
          aria-label="Remove widget"
        >
          <FiX />
        </button>
      </div>
      {/* Widget label */}
      <span
        style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 22,
          color: '#222',
          letterSpacing: 0.2,
          userSelect: 'none',
          pointerEvents: isDragging ? 'none' : 'auto',
          padding: '18px 0',
          width: '100%',
        }}
      >
        {text || widgetTypeLabels[type] || type}
      </span>
      {/* Resize handle at bottom-right (diagonal resize) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 24,
          height: 24,
          background: 'transparent',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          cursor: 'nwse-resize',
          zIndex: 2,
        }}
        onMouseDown={handleResizeMouseDown('bottom-right')}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderBottom: '4px solid #3b82f6',
            borderRight: '4px solid #3b82f6',
            borderRadius: 4,
            margin: 2,
          }}
        />
      </div>
    </div>
  );
};
