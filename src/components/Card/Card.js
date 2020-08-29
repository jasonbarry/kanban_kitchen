import React from 'react';
import './Card.css';
import { DragSource, DragPreviewImage } from 'react-dnd';
import { Types } from '../../utils/types';
import classNames from 'classnames';

// A collection of all the functions the draggable item holds
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { cardId: props.id }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    alert('Card has been dropped!');
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    canDrag: monitor.canDrag(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, isDragging, connectDragSource, connectDragPreview } = this.props;

    return connectDragSource(
      <div>
        <DragPreviewImage src='../../public/favicon.ico' connect={connectDragPreview}/>
        <div className={classNames({
          'Card': true,
          'Card-is-dragging': isDragging,
        })}>
          <h1>Title</h1>
          <p>My draggable card id is: {id}</p>
        </div>
      </div>
    )
  }
}

export default DragSource(Types.CARD, cardSource, collect)(Card);