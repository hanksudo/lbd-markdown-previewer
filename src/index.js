import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rawMarkDown: '# Heading\n\n## Sub-heading\n\n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nTwo spaces at the end of a line leave a  \nline break.\n\nText attributes _italic_, *italic*, __bold__, **bold**, `monospace`.\n\nHorizontal rule:\n\n---\n\nBullet list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nA [link](http://example.com).\n'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({'rawMarkDown': event.target.value});
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <Editor
            value={this.state.rawMarkDown} 
            onChange={this.handleChange}
          />
        </div>
        <div className="column">
          <Previewer rawMarkDown={this.state.rawMarkDown} />
        </div>
      </div>
    );
  }
}

class Previewer extends React.Component {
  createMarkup() {
    return {__html: marked(this.props.rawMarkDown, {sanitize: true})}
  }
  render() {
    return <span className="content" dangerouslySetInnerHTML={this.createMarkup()}></span>
  }
}

function Editor(props) {
  return (
    <textarea
      className="textarea" 
      rows="26" 
      onChange={props.onChange}
      defaultValue={props.value}>
    </textarea>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
