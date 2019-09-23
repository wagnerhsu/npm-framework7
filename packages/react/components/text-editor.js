import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7TextEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, 'onChange onInput onFocus onBlur onButtonClick onKeyboardOpen onKeyboardClose onPopoverOpen onPopoverClose'.split(' '));
    })();
  }

  onChange(editor, value) {
    this.dispatchEvent('texteditor:change textEditorChange', editor, value);
  }

  onInput(editor) {
    this.dispatchEvent('texteditor:change textEditorChange', editor);
  }

  onFocus(editor) {
    this.dispatchEvent('texteditor:focus textEditorFocus', editor);
  }

  onBlur(editor) {
    this.dispatchEvent('texteditor:blur textEditorBlur', editor);
  }

  onButtonClick(editor, button) {
    this.dispatchEvent('texteditor:buttonclick textEditorButtonClick', editor, button);
  }

  onKeyboardOpen(editor) {
    this.dispatchEvent('texteditor:keyboardopen textEditorKeyboardOpen', editor);
  }

  onKeyboardClose(editor) {
    this.dispatchEvent('texteditor:keyboardclose textEditorKeyboardClose', editor);
  }

  onPopoverOpen(editor) {
    this.dispatchEvent('texteditor:popoveropen textEditorPopoverOpen', editor);
  }

  onPopoverClose(editor) {
    this.dispatchEvent('texteditor:popoverclose textEditorPopoverClose', editor);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      resizable
    } = props;
    const classes = Utils.classNames(className, 'text-editor', resizable && 'text-editor-resizable', Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['root-start'], React.createElement('div', {
      className: 'text-editor-content',
      contentEditable: true
    }, this.slots['default']), this.slots['root-end'], this.slots['root']);
  }

  componentWillUnmount() {
    if (this.f7TextEditor && this.f7TextEditor.destroy) {
      this.f7TextEditor.destroy();
    }
  }

  componentDidMount() {
    const props = this.props;
    const {
      mode,
      value,
      palceholder,
      buttons,
      customButtons,
      dividers,
      imageUrlText,
      linkUrlText,
      placeholder,
      clearFormattingOnPaste
    } = props;
    const params = Utils.noUndefinedProps({
      el: this.refs.el,
      mode,
      value,
      palceholder,
      buttons,
      customButtons,
      dividers,
      imageUrlText,
      linkUrlText,
      placeholder,
      clearFormattingOnPaste,
      on: {
        onChange: this.onChange,
        onInput: this.onInput,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onButtonClick: this.onButtonClick,
        onKeyboardOpen: this.onKeyboardOpen,
        onKeyboardClose: this.onKeyboardClose,
        onPopoverOpen: this.onPopoverOpen,
        onPopoverClose: this.onPopoverClose
      }
    });
    this.$f7ready(f7 => {
      this.f7TextEditor = f7.textEditor.create(params);
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.value', prevProps, prevState, () => {
      if (this.f7TextEditor) {
        this.f7TextEditor.setValue(this.props.value);
      }
    });
  }

}

__reactComponentSetProps(F7TextEditor, Object.assign({
  id: [String, Number],
  className: String,
  style: Object
}, Mixins.colorProps, {
  mode: {
    type: String,
    default: undefined
  },
  value: {
    type: String,
    default: undefined
  },
  buttons: Array,
  customButtons: Object,
  dividers: {
    type: Boolean,
    default: undefined
  },
  imageUrlText: {
    type: String,
    default: undefined
  },
  linkUrlText: {
    type: String,
    default: undefined
  },
  placeholder: {
    type: String,
    default: undefined
  },
  clearFormattingOnPaste: {
    type: Boolean,
    default: undefined
  },
  resizable: {
    type: Boolean,
    default: false
  }
}));

F7TextEditor.displayName = 'f7-text-editor';
export default F7TextEditor;