import * as React from 'react';

import { StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownList = ({open, value, items, setOpen, setValue, setItems}) => {


  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchable={true}
      listMode="MODAL"   // list mode is MODAL
       modalProps={{ animationType: "fade", width: "50%", height: '50%'}}
       
       modalContentContainerStyle={{backgroundColor: "#fff", width:'100%', height:'50%',}}
       />
  )
}

export default DropdownList

const styles = StyleSheet.create({})