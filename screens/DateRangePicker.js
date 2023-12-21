import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const DateRangePicker = () => {

   
    const minDate = new Date();
    const maxDate = new Date(2026,6,3)
    const [selectedStartDate,setSelectedStartDate]= useState('DD/MM')
    const onDateChange=(date,type)=>{
    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1,newDate.length-1);
    const dates = newDate1.split("T")
    const date1 = dates[0].split("_")
    const day = date1[2]
    const month = date1[1]
    const year = date1[0]
    console.log(day+"-"+month+"-"+ year)

    



    }
  return (
    <View  style={{marginTop:90}}>
       <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />

        <Button  >Done</Button>
    </View>
  )
}

export default DateRangePicker

const styles = StyleSheet.create({})