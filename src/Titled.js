import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = createContext({
  updateParent: null,
  resetHeight: null
});

class Titled extends Component {
  height = 0;

  updateTitle = titles => {
    const finalTitleStr = titles.reduceRight(
      (titleStr, titleFn) => titleFn(titleStr),
      ''
    );
    if (document && document.title !== finalTitleStr) {
      document.title = finalTitleStr;
    }
    this.props.onChange && this.props.onChange(finalTitleStr);
  };

  updateParent = titles => {
    const { updateParent, title } = this.props;
    const nextTitles = titles.concat([title]);
    if (updateParent) {
      updateParent(nextTitles);
    } else if (this.height <= nextTitles.length) {
      this.height = nextTitles.length;
      this.updateTitle(nextTitles);
    }
  };

  resetHeight = () => {
    const { resetHeight } = this.props;
    this.height = 0;
    resetHeight && resetHeight();
  };

  componentDid = () => {
    const { updateParent, title } = this.props;
    if (updateParent) {
      updateParent([title]);
    } else if (this.height <= 1) {
      this.updateTitle([title]);
    }
  };

  componentDidMount() {
    this.componentDid();
  }

  componentDidUpdate() {
    this.componentDid();
  }

  componentWillUnmount() {
    this.resetHeight();
  }

  render() {
    return (
      <Provider
        value={{
          updateParent: this.updateParent,
          resetHeight: this.resetHeight
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

Titled.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  updateParent: PropTypes.func,
  resetHeight: PropTypes.func,
  title: PropTypes.func
};

const GetContext = props => (
  <Consumer>
    {value => (
      <Titled
        {...props}
        resetHeight={value.resetHeight}
        updateParent={value.updateParent}
      />
    )}
  </Consumer>
);

export default GetContext;
