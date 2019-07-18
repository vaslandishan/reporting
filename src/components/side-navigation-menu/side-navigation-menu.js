import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import './side-navigation-menu.scss';

import * as events from 'devextreme/events';
import Tooltip from "devextreme-react";

class SideNavigationMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultVisible: false,
            withAnimationVisible: false,
            withTemplateVisible: false
        };

        this.toggleDefault = this.toggleDefault.bind(this);
        this.toggleWithTemplate = this.toggleWithTemplate.bind(this);
        this.toggleWithAnimation = this.toggleWithAnimation.bind(this);
    }
    searchOptions = {
        placeholder: '«» جستجو',
        emptyDateValue:'موردی یافت نشد',
        icon:'',



    };
    scrollOptions = {
        UseNative:'true'

    };
    animConfig = {
        show: {
            type: 'slide',
            from: {
                top: -100,
                opacity: 0
            },
            to: {
                top: 0,
                opacity: 1
            }
        },
        hide: {
            type: 'pop',
            from: {
                scale: 1,
                opacity: 1
            },
            to: {
                scale: 0.1,
                opacity: 0
            }
        }
    };
  render() {
    const {
      className,
      children,
      selectedItemChanged,
      selectedItem,
      onMenuReady,
      ...rest
    } = this.props;
    return (
      <div
        className={`${className} side-navigation-menu`}
        ref={this.getElementRef}

      >
        {children}
        <div className={'menu-container'}>
          <TreeView
            id={'treeMenu'}
            rtlEnabled={true}
            searchEnabled={true}
            expandEvent={'click'}
            width={'100%'}
            fontSize={'10'}
            noDataText={'موردی یافت نشد'}
            animationEnabled={true}
            onOptionChanged={this.onTreeViewReady2}

            {...rest}
            onInitialized={this.onMenuInitialized}
            onItemClick={selectedItemChanged}
            onContentReady={this.onTreeViewReady}
            onSelectionChanged={this.updateSelection}
            /*onMouseEnter={this.toggleWithTemplate}
            onMouseLeave={this.toggleWithTemplate}*/
            searchEditorOptions={ this.searchOptions}
            selectByClick
            selectionMode={'single'}
            keyExpr={'path'}
            virtualModeEnabled={true}

          />

          {/*
            <Tooltip
                target={'#treeMenu'}
                position={'top'}
                animation={this.animConfig}
                visible={this.state.withAnimationVisible}
            >
                <div>Projector PlusHD</div>
            </Tooltip>

*/}
        </div>
      </div>
    );
  }

    toggleDefault() {
        this.setState({
            defaultVisible: !this.state.defaultVisible
        });
    }

    toggleWithTemplate() {
        this.setState({
            withTemplateVisible: !this.state.withTemplateVisible
        });
    }

    toggleWithAnimation() {
        this.setState({
            withAnimationVisible: !this.state.withAnimationVisible
        });
    }

  componentDidUpdate() {
    this.updateMenu();
  }


  onMenuInitialized = (event) => {
    this.treeView = event.component;
    event.component.option('deferRendering', false);
  }

  updateSelection = (event) => {
    const nodeClass = 'dx-treeview-node';
    const selectedClass = 'dx-state-selected';
    const leafNodeClass = 'dx-treeview-node-is-leaf';
    const element = event.element;

    const rootNodes = element.querySelectorAll(
      `.${nodeClass}:not(.${leafNodeClass})`
    );
    Array.from(rootNodes).forEach(node => {
      node.classList.remove(selectedClass);
    });

    let selectedNode = element.querySelector(`.${nodeClass}.${selectedClass}`);
    while (selectedNode && selectedNode.parentElement) {
      if (selectedNode.classList.contains(nodeClass)) {
        selectedNode.classList.add(selectedClass);
      }

      selectedNode = selectedNode.parentElement;
    }

    this.updateMenu();
  }

  getElementRef = ref => {
    if (this.elementRef) {
      events.off(this.elementRef, 'dxclick');
    }

    this.elementRef = ref;
    events.on(this.elementRef, 'dxclick', e => {
      this.props.openMenu(e);
    });
  };

  updateMenu() {
    if (this.treeView) {
      this.treeView.selectItem(this.props.selectedItem);

      if (this.props.compactMode) {
        this.treeView.collapseAll();
      }
    }
  }

  onTreeViewReady = (...args) => {
    this.props.onMenuReady && this.props.onMenuReady(...args);
    this.updateSelection(...args);
     /* let elements = e.component.element().querySelectorAll(".dx-treeview-item");
      let that = this;
      elements.forEach((...args, index)  => {
          el.addEventListener("mouseenter", event => {
              that.tooltipContent = e.component.getDataSource().items()[index].name;
              that.target = event.target;
              that.isVisible = true;
          });
      });*/


  }
  onTreeViewReady2 = (...args) => {
    this.props.onMenuReady && this.props.onMenuReady(...args);
    this.updateSelection(...args);
     /* let elements = e.component.element().querySelectorAll(".dx-treeview-item");
      let that = this;
      elements.forEach((...args, index)  => {
          el.addEventListener("mouseenter", event => {
              that.tooltipContent = e.component.getDataSource().items()[index].name;
              that.target = event.target;
              that.isVisible = true;
          });
      });*/


  }
}

export default SideNavigationMenu;
