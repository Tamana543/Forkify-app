import View from './view.js';
import previewView from './previewView.js';

class resultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recies found! Try Again';
  _message = '';

  _generateMarkup() {
    return this.data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultView();
