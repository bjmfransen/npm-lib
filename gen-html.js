class HtmlElement {
  constructor(){
    //HtmlElement can be two types: has a tag, optional attributes and content, OR a string value WITHOUT tag and attributes
    //arguments provided are converted to a json object to be loaded
    let json = {};
    if (arguments.length === 1){
      //case 1: one argument is provided
      if (typeof arguments[0] === 'string'){
        //the argument is of type string => that string is the content; no tags/attributes
        json.tag = '';
        json.attributes = {};
        json.content = arguments[0] || '';
      } else {
        //the argument is not a string so it must be a hash => load it
        json = arguments[0];
      }
    } else {
      //case 2: there are three arguments: tag, attributes and content
      json.tag = arguments[0];
      json.attributes = arguments[1] || {};
      json.content = arguments[2] || '';
    }

    return this.load(json);
  }
  
  appendChild(){
    //if the argument provided is an HtmlElement, it is appended as is
    //otherwise the HtmlElement constructor will be called using the same arguments as appendChild.
    //the newly created HtmlElement will then be appended.
    let element = (arguments[0] instanceof HtmlElement) ? arguments[0] : new HtmlElement(...arguments);
    this.content.push(element);
    
    return this;
  }

  load(json){
    //json: has three keys
    // tag - string
    // attributes - key/string value pairs
    // content - [json||string]
    
    //start by processing content
    //if it is not an array, make it so
    let content;
    console.log('LOAD', json.content, json.content instanceof Array)
    if (json.content instanceof Array){
      content = json.content;
    } else {
      if (json.content){
        content = [json.content];
        console.log('has content', content)
      } else {
        content = [];
        console.log('no content', content)
      }
    }

    console.log('loaded content', content, typeof content)

    this.content = content.map((element) => {
      if (typeof element === 'string'){
        return element;
      } else {
        return new HtmlElement(element)  
      }
    });
    this.tag = json.tag;
    this.attributes = json.attributes;

    return this;
  }
  
  toString(){
    let aAttributes = [];
    for (let key in this.attributes){
      aAttributes.push(`${key}="${this.attributes[key]}"`);
    }
    let content = this.content.map((contentItem) => {
      return contentItem.toString()
    }).join('')
    let result = `<${this.tag} ${aAttributes.join(' ')}>${content}</${this.tag}>`
    
    return result;
  }
}
let heJson = {
  'tag': 'div',
  'attributes': {
    'class': 'brown bold',
    'id': '1234'
  },
  'content': [
    'some string!',
    {
      'tag': 'b',
      'content': 'text in BOLD'
    }
  ]
}

class HtmlDocument {
  constructor(){
    this.html = new HtmlElement('html');
  }
  
  toString(){
    let result = '<!DOCTYPE html>';
    
    return result;
  }
} 
// let hDoc = new HtmlDocument()
