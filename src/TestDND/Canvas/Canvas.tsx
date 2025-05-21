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
  onRemoveWidget,
  children,
}: {
  widgets: Array<{
    pageNumber: number;
    id: string;
    left: number;
    top: number;
    type: string;
    text?: string;
    name?: string;
    defaultValue?: string;
    SignUrl?: string; // <-- Add this line
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
  onRemoveWidget: (id: string) => void;
  children: React.ReactNode;
}) => {
  console.log('Canvas rendered with widgets:', widgets);

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

  // Add duplicate handler
  const handleDuplicateWidget = (widget: any) => {
    const newId = Date.now().toString() + Math.floor(Math.random() * 1000);
    onDrop({
      id: newId,
      type: widget.type,
      left: widget.left + 24,
      top: widget.top + 24,
      pageNumber: widget.pageNumber,
    });
  };

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
            onRemove={() => onRemoveWidget(widget.id)}
            text={widget.text}
            name={widget.name}
            defaultValue={widget.defaultValue}
            onDuplicate={() => handleDuplicateWidget(widget)}
            SignUrl={widget.SignUrl} // <-- Pass SignUrl prop
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

// Fix: DraggableWidget must be a React component (function or const with React.FC)
// and props must match what is passed from Canvas

type WidgetType = {
  id: string;
  left: number;
  top: number;
  type: string;
  onMove: (id: string, left: number, top: number) => void;
  onClick: () => void;
  onRemove: () => void;
  text?: string;
  onDuplicate: () => void;
  defaultValue?: string;
  name?: string;
};

const DraggableWidget: React.FC<WidgetType & { SignUrl?: string }> = ({
  id,
  left,
  top,
  type,
  onMove,
  onClick,
  onRemove,
  text,
  name,
  defaultValue,
  onDuplicate,
  SignUrl,
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
      canDrag: !isResizing,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, isResizing],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      hover(item: any, monitor) {
        if (!ref.current) return;
        const initial = monitor.getInitialSourceClientOffset();
        const current = monitor.getClientOffset();
        if (!initial || !current) return;
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const canvasRect = canvas.getBoundingClientRect();
        const widgetRect = ref.current.getBoundingClientRect();
        // Calculate new absolute position based on mouse, not delta
        const newLeft = current.x - canvasRect.left - widgetRect.width / 2;
        const newTop = current.y - canvasRect.top - widgetRect.height / 2;
        const maxLeft = canvasRect.width - widgetRect.width;
        const maxTop = canvasRect.height - widgetRect.height;
        const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
        const clampedTop = Math.max(0, Math.min(newTop, maxTop));
        if (item.left !== clampedLeft || item.top !== clampedTop) {
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
    if (isResizing && resizeDir) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
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
        border: '2px dashed #7da7e6',
        borderRadius: 10,
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
          top: -30,
          right: 0,
          display: 'flex',
          gap: 6,
          padding: '2px 12px',
          alignItems: 'center',
          height: 32,

          borderRadius: '5px 0 0 5px',
          border: '1px dashed #7da7e6',
          borderBottom: 'none',
          boxShadow: '0 2px 12px 0 rgba(33, 150, 243, 0.10)',
          zIndex: 2,
          cursor: 'pointer',
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#7da7e6',
            cursor: 'pointer',
            fontSize: 14,
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
            fontSize: 14,
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
            fontSize: 14,
            padding: 0,
          }}
          aria-label="Copy"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
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
      <div
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
      >
        {['signature', 'initials'].includes(type) && SignUrl ? (
          <img
            src={SignUrl}
            alt={type + ' preview'}
            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: 6 }}
          />
        ) : (
          <span
            style={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 22,
              color: '#222',
              letterSpacing: 0.2,
              userSelect: 'none',
              width: '100%',
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
            }}
          >
            {/* Prefer defaultValue, then name, then text, then fallback label */}
            {typeof defaultValue !== 'undefined' && defaultValue !== ''
              ? defaultValue
              : typeof name !== 'undefined' && name !== ''
                ? name
                : text || widgetTypeLabels[type] || type}
          </span>
        )}
      </div>
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
