<br />
<h3>This is a fork from <b>React Native Dropdown Select List</b> : <a href="https://www.npmjs.com/package/react-native-dropdown-select-list">https://www.npmjs.com/package/react-native-dropdown-select-list</a></h3>
Fixed Certain Bugs & Enchancing certain features needed therefore this fork and seperate package is made.

### What's Fixed & Enchanced in this package :

  i. Fixed Default option in MultiSelect. <br><br>
  ii. Added checkicon option as props ( checkicon props ) to change default color or image. <br><br>
  iii. Added props ( labelHeadingColor ) to change default color of text selected. <br><br>
  iv. Added showSelected props ( showSelected = false ) will not show the selected bubbeles on the selection dropdown. This fixes the   
      visibility of select option data as it was shrinking when selecting a large number of data.<br> 

use defaultOption={[]} in MultiSelect as array of selected value instead of key value pair ( Object ).

<br>
<h1 align="center">
  ⭐ React Native Dropdown Select List </h1>

<div align="center">

React Native Select List Equivalent to Html's Select "

</div>

<p align="center" >
  <div style="display:flex;justify-content:space-evenly;align-items:center">
    
Multiple Select List            |  Select List
:-------------------------:|:-------------------------:
![](https://i.imgur.com/EAT81Nz.gif)  |  ![](https://i.imgur.com/qmHreFH.gif)
    
  </div>
  <br>
  
</p>
<br>

<h4>Light weight and <b>Easy</b> to use dropdown select list.</h4>

-   Style it your way with style props of every view.
-   Smooth performance on all platforms IOS, Android and Web.
-   Change Font Family Easily which community picker lacks.
-   <b>Zero</b> dependencies

<br>

# Compatibility

<br>

|  iOS  | Android | Web | Expo |
--------|---------|-----|------|
|  ✅  |    ✅    | ✅ |  ✅  |


<br>

# 🔌 Installation

```sh
$ npm install react-native-dropdown-select-list

```

OR

```sh
$ yarn add react-native-dropdown-select-list
```

<br>

# 😎 Basic Usage for SelectList
```jsx
import { SelectList } from 'react-native-dropdown-select-list'

const App = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  return(
    <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
  )

};
```
<br>

# 😎 Basic Usage for MultipleSelectList
```jsx
import { MultipleSelectList } from 'react-native-dropdown-select-list'

const App = () => {

  const [selected, setSelected] = React.useState([]);
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  return(
    <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        onSelect={() => alert(selected)} 
        label="Categories"
    />
  )

};
```

<br>


For Live `Demo` [(Expo Snack)](https://snack.expo.dev/@danish1658/react-native-dropdown-select-list)

<br>

# 🔧 General Props
<i>Applicable on both <b>SelectList</b> & <b>MultipleSelectList</b> Components</i>

| Name | Type | Description |
| ---- | ---- | ----------- |
| save| string | Pass ('key' or 'value') to save data of your choice in your local state variable
| onSelect| Function | Pass any function that you want to trigger immediately after a value is selected
| placeholder | String | Placeholder text that will be displayed in the select box
| search | boolean | set to false if you dont want to use search functionality
| maxHeight| Number | Maximum height of the dropdown wrapper to occupy
| data| array or array[object]| Data which will be iterated as options of select list
| setSelected| Function | For Setting the option value which will be stored in your local state
| searchicon| JSX Element | Pass any JSX to this prop like Text, Image or Icon to show instead of search icon
| arrowicon| JSX Element | Pass any JSX to this prop like Text, Image or Icon to show instead of chevron icon
| closeicon| JSX Element | Pass any JSX to this prop like Text, Image or Icon to show instead of close icon
| checkicon| JSX Element | Pass any JSX to this prop like Text, Image or Icon to show instead of checkicon
| searchPlaceholder| String | Custom placeholder text for search TextInput
| defaultOption| Object | Pass default selected option in key value pair
| fontFamily| string | Pass font name to apply globally on each text field of component
| notFoundText| string | Pass your custom message if any search result returns empty
| dropdownShown| boolean | Control your dropdown ( on & off ) state by changing its value to true or false
| showSelected| boolean | show selected items on the item selection dropdown or not, fixes the visibility bug when selecting large number of data.

<br>

# 🔧 General Style Props
<i>Applicable on both <b>SelectList</b> & <b>MultipleSelectList</b> Components</i>

| Name | Type | Description |
| ---- | ---- | ----------- |
| boxStyles| Object| Additional styles for select box parent wrapper
| inputStyles| Object| Additional styles for text of selection box
| dropdownStyles| Object| Additional styles for dropdown scrollview
| dropdownItemStyles| Object| Additional styles for dropdown single list item
| dropdownTextStyles| Object| Additional styles for dropdown list items text
| disabledItemStyles| Object| Additional styles for disabled dropdown list item
| disabledTextStyles| Object| Additional styles for disabled dropdown list items text

<br>

# 😎 Advanced Usage
```jsx
import { SelectList } from 'react-native-dropdown-select-list'

const App = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1',value:'Jammu & Kashmir'},
    {key:'2',value:'Gujrat'},
    {key:'3',value:'Maharashtra'},
    {key:'4',value:'Goa'},
  ];

  return(
    <SelectList 
      onSelect={() => alert(selected)}
      setSelected={setSelected} 
      fontFamily='lato'
      data={data}  
      arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
      searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
      search={false} 
      boxStyles={{borderRadius:0}} //override default styles
      defaultOption={{ key:'1', value:'Jammu & Kashmir' }}   //default selected option
    />
  )

};
```

<br>

# 😎 Getting Options From Database
```jsx
import { SelectList } from 'react-native-dropdown-select-list'

const App = () => {

  const [selected, setSelected] = React.useState("");
  const [data,setData] = React.useState([]);
  
  React.useEffect(() => 
    //Get Values from database
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        // Store Values in Temporary Array
        let newArray = response.data.map((item) => {
          return {key: item.id, value: item.name}
        })
        //Set Data Variable
        setData(newArray)
      })
      .catch((e) => {
        console.log(e)
      })
  ,[])

  return(
    <SelectList setSelected={setSelected} data={data} onSelect={() => alert(selected)} />
  )

};
```

<br>

# 🔧 Additional Props
<i>Applicable on <b>MultipleSelectList</b> Only</i>

| Name | Type | Description |
| ---- | ---- | ----------- |
| label| string| Pass any string to be placed instead of default label


<br>

# 🔧 Additional Style Props
<i>Applicable on <b>MultipleSelectList</b> Only</i>

| Name | Type | Description |
| ---- | ---- | ----------- |
| disabledCheckBoxStyles| Object| Additional styles disabled checkbox inside dropdown
| checkBoxStyles| Object| Additional styles for active checkbox
| badgeStyles| Object| Additional styles for badges of selected values
| badgeTextStyles| Object| Additional styles for Text of badges of selected values
| labelStyles| Object| Additional styles for label of multiple select list
| labelHeadingColor| TextStyle| Change Color of default Label Heading Text Selected  

<br>
