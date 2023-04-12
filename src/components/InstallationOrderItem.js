import React from 'react'
import { View } from 'react-native'
import { MyAppText } from './MyAppText'
import { listStyle } from '../style'
import { useSelector } from 'react-redux'
import { parseDate } from '../utils/utils'

const InstallationOrderItem = ({installationOrder, select}) => {
    const { dictionary } = useSelector(state=>state.auth)

    return (
        <View style={select&&select.installationOrderNumber===installationOrder.installationOrderNumber?[listStyle.heading,{backgroundColor:'lightblue'}]:listStyle.heading}>
            <MyAppText style={listStyle.listText} >{installationOrder.installationOrderNumber}</MyAppText>
            <MyAppText style={installationOrder.workStatus===1?listStyle.status1:
                              installationOrder.workStatus===2?listStyle.status2:
                              installationOrder.workStatus===3?listStyle.status3:
                              listStyle.status4} >{dictionary.workStatus[installationOrder.workStatus].statusDesc}</MyAppText>
            <MyAppText style={listStyle.listText} >{parseDate(installationOrder.entryDate)}</MyAppText>
            <MyAppText style={listStyle.listText} >{parseDate(installationOrder.dueDate)}</MyAppText>
            <MyAppText style={listStyle.listText} >{installationOrder.customer}</MyAppText>
            <MyAppText style={listStyle.listText} >{installationOrder.shipName}</MyAppText>
            <MyAppText style={[listStyle.listText, {width:300}]} >{installationOrder.shipAddress}</MyAppText>
            <MyAppText style={listStyle.listText} >{installationOrder.deliverers[0].fullName}</MyAppText>
            <MyAppText style={listStyle.listText} >{installationOrder.installers[0].fullName}</MyAppText>
        </View>
    )
}

export default InstallationOrderItem
