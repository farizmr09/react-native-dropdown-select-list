import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    TextInput,
    ViewStyle,
    ActivityIndicator,
    Pressable} from 'react-native';

import { MultipleSelectListProps } from '..';

type L1Keys = { key?: any; value?: any; disabled?: boolean | undefined }

const MultipleSelectList: React.FC<MultipleSelectListProps> = ({
        showSelected = true,
        fontFamily,
        setSelected,
        placeholder,
        boxStyles,
        inputStyles,
        placeholderStyles,
        dropdownStyles,
        dropdownItemStyles,
        dropdownTextStyles,
        maxHeight,
        data,
        searchicon = false,
        arrowicon = false,
        closeicon = false,
        checkicon = false,
        search = true,
        searchPlaceholder = "search",
        searchPlaceholderColor = "white",
        onSelect = () => {},
        label,
        notFoundText = "No data found",
        disabledItemStyles,
        disabledTextStyles,
        disabledCheckBoxStyles,
        labelStyles,
        badgeStyles,
        badgeTextStyles,
        checkBoxStyles,
        save = 'key',
        dropdownShown = false,
        defaultOption = [],
        labelHeadingColor = 'initial',
        showSelected = true,
        customUserInput = false,
        setData,
        setDefaultOption,
        isApiSearch = false,
        loader = false,
        setSearchValue = () => {},
        loaderSize,
        loaderColor
    }) => {

    const oldOption = React.useRef(null)
    const [_firstRender,_setFirstRender] = React.useState<boolean>(true);
    const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
    const [selectedval, setSelectedVal] = React.useState<any>(defaultOption);
    const [height,setHeight] = React.useState<number>(350)
    const animatedvalue = React.useRef(new Animated.Value(0)).current;
    const [filtereddata,setFilteredData] = React.useState(data);
    const [customUserInputData, setCustomUserInputData] = React.useState<any>("")
    const [counter, setCounter] = React.useState<number>(0);

    const slidedown = () => {
        setDropdown(true)
        
        Animated.timing(animatedvalue,{
            toValue:height,
            duration:500,
            useNativeDriver:false,
            
        }).start()
    }
    const slideup = () => {
        
        Animated.timing(animatedvalue,{
            toValue:0,
            duration:500,
            useNativeDriver:false,
            
        }).start(() => setDropdown(false))
    }

    React.useEffect( () => {
        if(maxHeight)
            setHeight(maxHeight)
    },[maxHeight])

    
    React.useEffect(() => {
        setFilteredData(data);
      },[data])

    
    // const setCustom = () => {
    //     if(customUserInputData.length > 0){
    //     const unfilteredData = data.map((item: any,index) => ( item.value ));
    //     console.log('unfilteredData',unfilteredData)
    //     const customInputData = [customUserInputData].concat(unfilteredData)
    //     const customInputDataFormatted = customInputData.map((item,index) => ({
    //         key: index + 1,
    //         value: item
    // }))
    //     console.log(customInputDataFormatted)
    //     setData(customInputDataFormatted)
    //     setDefaultOption((prev) => [...prev, customUserInputData])
    //  }
    // }

    // React.useEffect(() => { 
    //     setCustom();
    //  },[counter])  


    React.useEffect(() => {
        if(_firstRender){
          _setFirstRender(false);
          return;
        }
        onSelect()
        
    },[selectedval])

    React.useEffect(() => {
        if(!_firstRender){
            if(dropdownShown)
                slidedown();
            else
                slideup();
            
        }
        
    },[dropdownShown])






    return(
        <View>
            {
                (dropdown && search)
                ?
                    <View style={[styles.wrapper,boxStyles]}>
                        <View style={{flexDirection:'row',alignItems:'center',flex:1}}> 
                            {
                                (!searchicon)
                                ?
                                <Image 
                                    source={require('../assets/images/search.png')}
                                    resizeMode='contain'
                                    style={{width:20,height:20,marginRight:7}}
                                />
                                :
                                searchicon
                            }
                            
                            <TextInput 
                                placeholder={searchPlaceholder}
                                placeholderTextColor={searchPlaceholderColor}
                                onChangeText={(val) => {
                                    if(isApiSearch) {
                                        setSearchValue(val)
                                        }
                                    let result =  data.filter((item: L1Keys) => {
                                        val.toLowerCase();
                                        let row = item.value.toLowerCase()
                                        return row.search(val.toLowerCase()) > -1;
                                    });
                                    setFilteredData(result)
                                    if(result.length === 0 && customUserInput === true){
                                        setCustomUserInputData(val)
                                     }
                                }}
                                style={[{padding:0,height:20,flex:1,fontFamily},inputStyles]}
                            />
                                <TouchableOpacity onPress={() => {
                                    slideup()
                                    setFilteredData(data)
                                    isApiSearch ? setSearchValue("") : null 
                                    // setTimeout(() => setFilteredData(data), 800)
                                }} >
                                    {
                                        (!closeicon)
                                        ?
                                            <Image 
                                                source={require('../assets/images/close.png')}
                                                resizeMode='contain'
                                                style={{width:17,height:17}}
                                            />
                                        :
                                            closeicon
                                    }
                                </TouchableOpacity>
                                
                           
                        </View>
                        
                    </View>
                :

                (selectedval?.length > 0 )

                ?
                    <TouchableOpacity style={[styles.wrapper,boxStyles]} onPress={() => { if(!dropdown){ slidedown() }else{ slideup() } }} >
                        <View>
                            <Text style={[{fontWeight:'600',fontFamily},labelStyles]}>{ label }</Text>
                            <View style={{flexDirection:'row',marginBottom:8,flexWrap:'wrap'}}>
                                {
                                    selectedval?.map((item,index) => {
                                        return (
                                            <View key={index} style={[{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:50,marginRight:10,marginTop:10}, badgeStyles]}>
                                                <Text style={[{color:'white',fontSize:12,fontFamily}, badgeTextStyles]}>{item}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={[styles.wrapper,boxStyles]} onPress={() => { if(!dropdown){ slidedown() }else{ slideup() } }}>
                        <Text style={[{fontFamily},placeholderStyles]}>{ (selectedval == "") ? (placeholder) ? placeholder : 'Select option' : selectedval  }</Text>
                        {
                            (!arrowicon)
                            ?
                                <Image 
                                    source={require('../assets/images/chevron.png')}
                                    resizeMode='contain'
                                    style={{width:20,height:20}}
                                />
                            :
                                arrowicon
                        }
                        
                    </TouchableOpacity>
            }
            
            {
                (dropdown)
                ?
                    <Animated.View style={[{maxHeight:animatedvalue},styles.dropdown, dropdownStyles]}>
                        <View style={[{maxHeight:height}]}>
                            <ScrollView contentContainerStyle={{paddingVertical:10}} nestedScrollEnabled={true}>
                            {
                                 (isApiSearch && loader)
                                 ?
                                 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                       <ActivityIndicator
                                         size={loaderSize ? loaderSize : 'large'}
                                         color={ loaderColor ? loaderColor : "#0EC99E"}
                                       />
                                 </View>
                                 :
                                 null
                            }
                                {
                                    (filtereddata.length >=  1)
                                    ?
                                    filtereddata.map((item: L1Keys,index: number) => {
                                        let key = item.key ?? item.value ?? item;
                                        let value = item.value ?? item;
                                        let disabled = item.disabled ?? false;
                                        if(disabled){
                                            return(
                                                <TouchableOpacity style={[styles.disabledoption,disabledItemStyles]} key={index}>
                                                    <View style={[{width:15,height:15,marginRight:10,borderRadius:3,justifyContent:'center',alignItems:'center',backgroundColor:'#c4c5c6'},disabledCheckBoxStyles]}>
                                                        
                                                        {
                                                            (selectedval?.includes(value))
                                                            ?
                                                                (!checkicon) 
                                                                ?
                                                                <Image 
                                                                    key={index}
                                                                    source={require('../assets/images/check.png')}
                                                                    resizeMode='contain'
                                                                    style={[{width:8,height:8,paddingLeft:7}]}
                                                                />
                                                                : checkicon
                                                            :
                                                            null

                                                        }
                                                    </View>
                                                    <Text style={[{fontFamily,color:'#c4c5c6'},disabledTextStyles]}>{value}</Text>
                                                </TouchableOpacity>
                                            )
                                        }else{
                                            return(
                                                <TouchableOpacity style={[styles.option,dropdownItemStyles]} key={index} onPress={ () => {

                                                    
                                                    let existing = selectedval?.indexOf(value)


                                                    // console.log(existing);

                                                    if(existing != -1  && existing != undefined){

                                                        let sv = [...selectedval];
                                                        sv.splice(existing,1) 
                                                        setSelectedVal(sv);


                                                        setSelected((val: any) => {
                                                            let temp = [...val];
                                                            temp.splice(existing,1) 
                                                            return temp;
                                                        });
                                                        
                                                        // onSelect()
                                                    }else{
                                                        if(save === 'value'){
                                                            setSelected((val: any) => {
                                                                let temp = [...new Set([...val,value])];
                                                                return temp;
                                                            })
                                                        }else{
                                                            setSelected((val: any) => {
                                                                let temp = [...new Set([...val,key])];
                                                                return temp;
                                                            })
                                                        }
                                                       
                                                        setSelectedVal((val: any )=> {
                                                            let temp = [...new Set([...val,value])];
                                                            return temp;
                                                        })
                                    
                                                        
                                                        // onSelect()
                                                    }
                                                    
                                                    
                                                    
                                                }}>
                                                    <View style={[{width:15,height:15,borderWidth:1,marginRight:10,borderColor:'gray',borderRadius:3,justifyContent:'center',alignItems:'center'},checkBoxStyles]}>
                                                        
                                                        {
                                                            (selectedval?.includes(value))
                                                            ?
                                                                (!checkicon) 
                                                                ?
                                                                <Image 
                                                                    key={index}
                                                                    source={require('../assets/images/check.png')}
                                                                    resizeMode='contain'
                                                                    style={{width:8,height:8,paddingLeft:7}}
                                                                />
                                                                : checkicon
                                                            :
                                                            null

                                                        }
                                                            

                                                        
                                                        
                                                    </View>
                                                    <Text style={[{fontFamily},dropdownTextStyles]}>{value}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                        
                                    })
                                    : customUserInput === true ? (
                                        <TouchableOpacity style={[styles.option,dropdownItemStyles]} onPress={ () => {
                                            const unfilteredData = data.map((item: any,index) => ( item.value ));

                                            const customInputData = [customUserInputData].concat(unfilteredData)
                                            const customInputDataFormatted = customInputData.map((item,index) => ({
                                                    key: index + 1,
                                                    value: item
                                            }))
                                            console.log(customInputDataFormatted)
                                            setData(customInputDataFormatted)
                                            setDefaultOption((prev) => [...prev, customUserInputData])
                                            setSelected([...selectedval, customUserInputData])
                                            setSelectedVal([...selectedval, customUserInputData])
                                            setCustomUserInputData("");
                                            slideup()
                                            setTimeout(() => setFilteredData(customInputDataFormatted), 800)
                                        }}>
                                            <Text style={[{fontFamily},dropdownTextStyles]}>add "{customUserInputData}"</Text>
                                        </TouchableOpacity>
                                    ) : (
                                    <TouchableOpacity style={[styles.option,dropdownItemStyles]} onPress={ () => {
                                        setSelected(undefined)
                                        setSelectedVal("")
                                        slideup()
                                        setTimeout(() => setFilteredData(data), 800)
                                        
                                    }}>
                                        <Text style={[{fontFamily},dropdownTextStyles]}>{notFoundText}</Text>
                                    </TouchableOpacity>
                                    )
                                }
                                
                                
                                
                            </ScrollView>
                            

                                {showSelected &&

                                    (selectedval?.length > 0)
                                    ?
                                        <Pressable>
                                            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingLeft:20}}>
                                                <Text style={{marginRight:20,fontWeight:'600',fontFamily, color: labelHeadingColor }}>Selected</Text>
                                                <View style={{height: 1, flex: 1, backgroundColor: 'gray'}} />
                                            </View>
                                            <View style={{flexDirection:'row',paddingHorizontal:20,marginBottom:20,flexWrap:'wrap'}}>
                                            
                                                {
                                                    selectedval?.map((item,index) => {
                                                        return (
                                                            <View key={index} style={[{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:50,marginRight:10,marginTop:10},badgeStyles]}>
                                                                <Text style={[{color:'white',fontSize:12,fontFamily},badgeTextStyles]}>{item}</Text>
                                                            </View>
                                                        )
                                                    })
                                                }

                                            </View>
                                        </Pressable>
                                    :
                                    null
                                }
                                
                                
                            
                        </View>
                       
                    </Animated.View>
                :
                null
            }
            
            
        </View>
    )
}

export default MultipleSelectList;

const styles = StyleSheet.create({
    wrapper:{ borderWidth:1,borderRadius:10,borderColor:'gray',paddingHorizontal:20,paddingVertical:12,flexDirection:'row',justifyContent:'space-between',marginBottom:10 },
    dropdown:{ borderWidth:1,borderRadius:10,borderColor:'gray',overflow:'hidden'},
    option:{ paddingHorizontal:20,paddingVertical:8,flexDirection:'row',alignItems:'center'},
    disabledoption:{ paddingHorizontal:20,paddingVertical:8,flexDirection:'row',alignItems:'center', backgroundColor:'whitesmoke'}

})