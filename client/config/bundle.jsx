import React from 'react'
import PropTypes from 'prop-types'

export default class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null,
    };
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({ mod: null })
    props.load().then((mod) => {
      this.setState({ mod: mod.default || mod })
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

Bundle.propTypes = {
  children: PropTypes.any.isRequired,
  load: PropTypes.func.isRequired,
}
