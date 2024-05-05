import React, {Component} from 'react';
import { Content } from 'native-base';
import { ImageCard, NoContent, Loading } from '../common';
import styles from '../styles';
import { connect } from 'react-redux';

class Screen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
    this._renderContent = this._renderContent.bind(this);
  }

  _renderContent() {
    if(this.props.privateEvents !== undefined && this.props.privateEvents !== null && this.props.privateEvents.length > 0) {
      return (this.props.privateEvents.map((event) => {
        return (
            <ImageCard 
              titleLabel={event.description}
              timeLabel={event.start}
              locationLabel='Bole Grace Plaza'
              action={()=>this.props.navigation.navigate('EventDetail', {event:event})}/>)
      }))
    } else {
      return <NoContent text="No private event" />
    }
  }

  render() {
    return (
      <Content style={[styles.content]}>
        {this._renderContent()}
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.eventReducer
  }
};

export default connect( mapStateToProps )(Screen);