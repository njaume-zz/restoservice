import React from 'react';
import './css/autocomplete.css'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {randomString, removeAccents} from '../../libs'

const styles = {
  label : {
    position: 'relative',
    top:'-60px',
    fontSize: '0.8rem',
    color:'#8a0808'
  }
}
class AutoCompleteField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      error: '',
      selectedItem: '',
      labelClassName: 'label-inactive',
      dropDownMenu:{
        open: false,
        selectedIndex: 0
      },
      dataSourceLimited: this.props.dataSource,
      dataSourceSize: this.props.dataSource.length,
      focusFilter: false,
      hasMoreItems: true,
      from: 0,
      to: 100,
      items : [],
      listStringId : randomString(5),
      mainInputFocused: false,
      filterInputFocused: false,
      onSelectClickFinished: false,
    };

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if(this.state.dropDownMenu.open) this.toogleOpen()
    }
  }


  /**
   * Set the wrapper ref
   */
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }


  componentWillReceiveProps(nextProps){
    if(typeof nextProps.dataSource !== 'undefined' && nextProps.dataSource !== null && nextProps.dataSource.length !== this.props.dataSource.length){
      this.setState({
        searchText : '',
        dataSourceLimited: nextProps.dataSource,
        dataSourceSize: nextProps.dataSource.length,
      });
    }

    
    if(typeof nextProps.value !== 'undefined' && nextProps.value !== null && nextProps.value.toString().length > 0 ){
      let selectedItem;
      if(typeof nextProps.dataSourceConfig !== 'undefined' && nextProps.dataSourceConfig !== null && typeof nextProps.dataSourceConfig === 'object' && nextProps.dataSourceConfig.value){
        selectedItem = this.findElementInArrayByKey(nextProps.value)
    
      }
      else{
        selectedItem = nextProps.dataSource.find((value) => {
          return value.toString() === nextProps.value.toString()
        })
      }
        if(selectedItem) {
          
          let labelClass = 'label-active'

          this.selectItem({
            labelClassName:labelClass,
            selectedItem: selectedItem,
            dataSourceLimited:this.props.dataSource,
            dataSourceSize : this.props.dataSource.length,
            focusFilter: false, dropDownMenu:{open: false, selectedIndex:0},
          }, selectedItem)
        }
    } else console.log("value undefined ", nextProps.value)
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (this.state.focusFilter && this.state.dropDownMenu.open) {

      this.filterInputRef.focus()
    } else if (!this.state.focusFilter && prevState.focusFilter && !this.state.dropDownMenu.open){

      this.mainInnputRef.focus()
    }
  }


  findElementInArrayByKey = (key) =>{
    console.log("findElementInArrayByKey",key)
    const elem = this.props.dataSource.find((element) => (element.key.toString() === key.toString()))
    
    return elem
  }

  handleMainInputClick = () =>{
    
    this.toogleOpen()
  }

  toogleOpen = () =>{
    
    this.setState({
      searchText : '',
      dataSourceLimited:this.props.dataSource,
      dataSourceSize : this.props.dataSource.length,
      dropDownMenu:{...this.state.dropDownMenu, open: !this.state.dropDownMenu.open},
      focusFilter: !this.state.dropDownMenu.open
    })
  }

  filterInputChange = (event) => {
    const val = event.target.value
    const cleanedFilter = removeAccents(val.trim());
    
    const dataSource =  this.state.searchText.length > 0 ? this.props.dataSource.filter(x => this.fuzzyFilter(cleanedFilter, this.getItemTextCleaned(x))).slice(0, 100) : this.props.dataSource;
    this.setState(
      {
        dataSourceLimited : dataSource,
        dataSourceSize: dataSource.length,
        labelClassName:'label-active',
        searchText : val,
        dropDownMenu:{...this.state.dropDownMenu, selectedIndex: 0}
      })
  }

  focus = () =>{
    this.mainInnputRef.focus()
  }

  onFocus = () =>{
    
    if(this.props.onFocus) this.props.onFocus()
    this.setState({labelClassName:'label-active', mainInputFocused: true})
    if (this.state.focusFilter){
      //  this.setState({dropDownMenu:{...this.state.dropDownMenu,open: true}})
    }
  }

  onBlur = (event) =>{
    if(this.props.onBlur) this.props.onBlur()
  }

  handleClick = (event, index, item) =>{
    let labelClass = 'label-active'

    this.selectItem({
      labelClassName:labelClass,
      selectedItem:item,
      dataSourceLimited:this.props.dataSource,
      dataSourceSize : this.props.dataSource.length,
      focusFilter: false, dropDownMenu:{open: false, selectedIndex:0},
    }, item)
  }

  handleKeyPress = (e) =>{
    
    if(e.key === "ArrowDown"){
      e.preventDefault()
      if (this.state.dropDownMenu.selectedIndex + 1 < this.state.dataSourceSize){
        const nextIndex =  this.state.dropDownMenu.selectedIndex + 1
        this.setState({
          dropDownMenu:{
            ...this.state.dropDownMenu,
            selectedIndex: nextIndex
          }
        })
        if (this.state.dataSourceSize > 4) this.scrollUL(this.state.listStringId + nextIndex)
      }
    } else if(e.key === "ArrowUp"){
      e.preventDefault()
      const nextIndex = this.state.dropDownMenu.selectedIndex !== 0 ? this.state.dropDownMenu.selectedIndex - 1 : 0
      this.setState({
        dropDownMenu:{
          ...this.state.dropDownMenu,
          selectedIndex: nextIndex
        }
      })
      if (this.state.dataSourceSize > 4) this.scrollUL(this.state.listStringId + nextIndex)
    }
    else if(e.key === "Enter"){
      e.preventDefault()
      if(this.state.dropDownMenu.open && this.state.dataSourceSize > 0){
        this.selectItem({
          selectedItem : this.state.dataSourceLimited[this.state.dropDownMenu.selectedIndex],
          dataSourceLimited:this.props.dataSource,
          dataSourceSize : this.props.dataSource.length,
          focusFilter: false,
          dropDownMenu:{open: false, selectedIndex:0}
        }, this.state.dataSourceLimited[this.state.dropDownMenu.selectedIndex])
      }
      else this.toogleOpen()
    }
    else if(e.keyCode === 13){
      //e.preventDefault()
      if(this.state.dropDownMenu.open && this.state.dataSourceSize > 0){
        this.selectItem({
          selectedItem : this.state.dataSourceLimited[this.state.dropDownMenu.selectedIndex],
          dataSourceLimited:this.props.dataSource,
          dataSourceSize : this.props.dataSource.length,
          focusFilter: false,
          dropDownMenu:{open: false, selectedIndex:0}
        }, this.state.dataSourceLimited[this.state.dropDownMenu.selectedIndex])
      }
      else this.toogleOpen()
    }
    else if(e.key === "Escape"){
      this.setState({
        searchText : '',
        dataSourceLimited:this.props.dataSource,
        dataSourceSize : this.props.dataSource.length,
        focusFilter: false, dropDownMenu:{open: false, selectedIndex:0}})
    }
    else if(e.key === "Tab" ){
      this.setState({focusFilter: false, mainInputFocused: false, searchText : '', dropDownMenu:{...this.state.dropDownMenu, open: false, selectedIndex:0}})
    }
  }

  handleKeyPressMainInput = (e) =>{
    if(e.key === "ArrowDown" || e.key === "Escape"){
      e.preventDefault()
      this.toogleOpen()
    }else if(e.key === "Enter" || e.keyCode === 32 || e.keyCode === 13){
      e.preventDefault()
      this.toogleOpen()
    }
    else if(e.keyCode === 9){
      this.setState({
        searchText : '',
        dataSourceLimited:this.props.dataSource,
        dataSourceSize : this.props.dataSource.length,
        dropDownMenu:{...this.state.dropDownMenu, open: false},
        focusFilter: false,
        mainInputFocused: false
      })
    }
    else if(e.keyCode !== 9){
      this.setState({
        searchText : '',
        dataSourceLimited:this.props.dataSource,
        dataSourceSize : this.props.dataSource.length,
        dropDownMenu:{...this.state.dropDownMenu, open: false},
        focusFilter: false,
        mainInputFocused: false
      })
      e.preventDefault()
      e.stopPropagation()
    }
    else if(e.keyCode === 229){
      this.setState({
        selectedItem : this.state.dataSourceLimited[this.state.dropDownMenu.selectedIndex],
      })
    }
  }

  getItemText = (item) =>{
    console.log(item, this.props.dataSourceConfig, this.props.dataSource)
    const menuConfig = this.props.dataSourceConfig && this.props.dataSourceConfig.value ? this.props.dataSourceConfig : false;
    const resultValue = menuConfig ? item[menuConfig.text] : item;
    return typeof resultValue == 'string' ? resultValue.trim() : resultValue;
  }

  getItemTextCleaned = (item) =>{
    const menuConfig = this.props.dataSourceConfig && this.props.dataSourceConfig.value ? this.props.dataSourceConfig : false;
    const resultValue = menuConfig ? item[menuConfig.text] : item;
    return typeof resultValue == 'string' ? removeAccents(resultValue.trim()) : resultValue;
  }

  getItemValue = (item) =>{
    const menuConfig = this.props.dataSourceConfig;
    return menuConfig ? item[menuConfig.text] : item;
  }

  findByText = (text) =>{
    const sanizedText = this.sanitizeValue(text)
    const menuConfig = this.props.dataSourceConfig;
    let result;
    if (typeof menuConfig !== 'undefined' && menuConfig !== null){
      result = this.props.dataSource.find(x =>{
        return this.getItemText(x) === sanizedText
      });
    }
    else {
      result =  this.props.dataSource.find(x => x === text)
    }
    return result;
  }

  scrollUL = (li) =>{
    // scroll UL to make li visible
    // li can be the li element or its id
    if (typeof li !== "object"){
      li = document.getElementById(li);
    }

    var ul = document.getElementById("ul");
    // fudge adjustment for borders effect on offsetHeight
    var fudgeBottom = -30;
    var fudgeTop = 80;
    // bottom most position needed for viewing
    var bottom = (ul.scrollTop + (ul.offsetHeight - fudgeBottom) - li.offsetHeight);
    // top most position needed for viewing
    var top = ul.scrollTop + fudgeTop;
    if (li.offsetTop <= top){
      // move to top position if LI above it
      // use algebra to subtract fudge from both sides to solve for ul.scrollTop
      ul.scrollTop = li.offsetTop - fudgeTop;
    } else if (li.offsetTop >= bottom) {
      // move to bottom position if LI below it
      // use algebra to subtract ((ul.offsetHeight - fudge) - li.offsetHeight) from both sides to solve for ul.scrollTop
      ul.scrollTop = li.offsetTop - ((ul.offsetHeight - fudgeBottom) - li.offsetHeight) ;
    }
  };

  createItems = (from,to) =>{
    let items = [];
    for(let i = from; i < to; i++){
      if(i < this.state.dataSourceLimited.length){
        const item = this.state.dataSourceLimited[i];
        const val = this.getItemValue(item)
        const text = this.getItemText(item)
        const itemClass = (i == this.state.dropDownMenu.selectedIndex ? 'option-selected' : 'option')
        items.push(<li key={this.state.listStringId + i} id={this.state.listStringId + i} onClick={(event) => this.handleClick(event, i, item)} value={val} className={itemClass}>{text}</li>)
      }else {
        //  this.setState({hasMoreItems : false})
        break;
      }
    }
    return items;
  }

  loadItems = (page) =>{
    const nextTo = this.state.to + 100;
    this.setState({to: nextTo})
  }

  selectItem = (newState, changeItem) =>{
    var event = new Event('change', { bubbles: true });
    event.simulated = true;

    this.mainInnputRef.value = newState.selectedItem.value;

    this.mainInnputRef.dispatchEvent(event);

    this.setState({...newState})
    this.props.onChange(changeItem)
  }

  selectDefaultItem = () =>{
    this.selectItem({
      selectedItem : this.props.value,
      dataSourceLimited:this.props.dataSource,
      dataSourceSize : this.props.dataSource.length,
      focusFilter: false,
      dropDownMenu:{open: false, selectedIndex:0}
    }, this.state.dataSourceLimited[this.state.dropDownMenu.selectedIndex])
  }

  onBlurMainInput = () => {
    
    this.setState({mainInputFocused: false}, () => {
      if(this.props.onBlur) this.props.onBlur()
    })
  }

  handleChange = (event) => {
    //console.log("handle autocomplete change")
  }

  fuzzyFilter = (searchText, key) => {
    let compareString = key.toLowerCase();
    searchText = searchText.toLowerCase();

    let searchTextIndex = 0;
    for (let index = 0; index < key.length; index++) {
      if (compareString[index] === searchText[searchTextIndex]) {
        searchTextIndex += 1;
      }
    }

    return searchTextIndex === searchText.length;
  };

  render() {
    const items = this.createItems(this.state.from,this.state.to)

    return (
      <div className="mdl-selectfield" ref={this.setWrapperRef}>
        <input className="input" style={{outline: 'none'}}
               ref={(input) => { this.mainInnputRef = input; }}
               id={this.props.id}
               type={"text"} name={"select"}
               className={"select"}
               data-analyticsid={this.props["data-analyticsid"]}
               onFocus={this.onFocus}
               onBlur={this.onBlurMainInput}
               onClick={this.handleMainInputClick}
               readOnly={this.state.mainInputFocused}
               onChange={(e) => {this.handleChange(e)}}
               value={this.getItemText(this.props.value)}
          /* onKeyPress={this.handleKeyPressMainInput2}*/
               onKeyDown={(e) => this.handleKeyPressMainInput(e)}
        />
        <label  style={styles.label} htmlFor={"select"}>{this.props.floatingLabelText}</label>
        <div className={"error-input-label"}>{!this.state.dropDownMenu.open && !this.state.mainInputFocused && !this.state.focusFilter ? this.props.errorText : ''}</div>
        {this.state.dropDownMenu.open &&
        <div>
          <div className={"ul-header"}>
            <input  ref={(input) => { this.filterInputRef = input; }}
                    type={"text"}
                    onChange={this.filterInputChange}
                    onKeyDown={(e) => this.handleKeyPress(e)}
                    value={this.state.searchText}
                    className={"input-filter"}
                    onBlur={(e) => this.onBlur(e)}
            />
          </div>
          <div className="ul" id={"ul"}>
            <InfiniteScroll
              pageStart={0}
              useWindow={false}
              loadMore={this.loadItems.bind(this)}
              hasMore={this.state.dataSourceLimited.length < this.state.to ? false : true}
            >
              {items}
            </InfiniteScroll>
          </div>
        </div>
        }
      </div>
    );
  }
}

AutoCompleteField.propTypes = {
  dataSource: PropTypes.array,
  value: PropTypes.any.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  dataSourceConfig: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  }),
  onChange: PropTypes.func
}

export default AutoCompleteField;
