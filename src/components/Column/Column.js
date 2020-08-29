import React from 'react';
import Card from '../Card/Card';
import './Column.css';
import { DropTarget, DragSource } from 'react-dnd';
import flow from 'lodash/flow';
import { Types } from '../../utils/types'
import classNames from 'classnames';

const columnSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { columnId: props.id }
    return item
  }
}
/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    isOver: monitor.isOver(),
    connectDropTarget: connect.dropTarget()
  }
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  
  render() {
    const {  highlighted, hovered, connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className={classNames({
        'Column': true,
        'Column-highlighted': highlighted,
        'Column-hovered': hovered,
        'Column-is-over': isOver
      })}>
        <Card 
          id={1}
          isDragging={false}
        />
        <Card 
          id={2}
          canDrag={true}
          isDragging={false}
        />
        <Card 
          id={3}
          canDrag={true}
          isDragging={false}
        />
      </div>
    )
  }
}

export default DropTarget(Types.CARD, {}, collect)(Column)