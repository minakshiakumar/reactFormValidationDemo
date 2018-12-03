import React from 'react';
import ReactDOM from 'react-dom';
import Form from './component/form/formComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Form/>, document.getElementById('root'));

serviceWorker.unregister();
