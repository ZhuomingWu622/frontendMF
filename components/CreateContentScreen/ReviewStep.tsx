import { ResizeMode, Video } from "expo-av";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CreateScreenStep } from "../../type";
import { colors } from "../../constants";

interface ReviewStepProps{
    videoUri: string;
    setStep: (newStep: CreateScreenStep) => void;
    setVideoUri: (uri: string) => void;
}

export const ReviewStep:FC<ReviewStepProps> = ({
    videoUri,
    setStep,
    setVideoUri,
}) => {
    return (
    <SafeAreaView style = {styles.container}>
       <StatusBar style="light"/>
       <Video 
       source={{uri: videoUri}} 
       style={styles.video}
       resizeMode={ResizeMode.STRETCH}
       shouldPlay={true}
       isLooping={true}
       />
       <SafeAreaView style = {styles.returnBtnContainer}>
        <FontAwesome.Button 
        name="arrow-left" 
        backgroundColor="rgba(0,0,0,0.2)" 
        color="#fff"
        style={{
            paddingRight: 0,
        }}
        borderRadius={30}
        size={30}
        onPress={()=>{
            setStep(CreateScreenStep.Record);
            setVideoUri("");
        }}
        />
       </SafeAreaView>
       <View style={styles.continueBtnContainer}>
        <FontAwesome.Button 
        name="arrow-right"
        backgroundColor={colors.primary} 
        borderRadius={30}
        size={30}
        style={{
            paddingRight: 0,
        }}
        onPress={() =>{
            setStep(CreateScreenStep.Publish);
        }}
        />
       </View>
    </SafeAreaView>
    
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000",
    },
    video:{
        height:"90%",
        width:"100%", 
    },
    returnBtnContainer:{
        position: 'absolute',
        top: 9,
        left:9,
    },
    continueBtnContainer:{
        alignItems: "flex-end",
        paddingRight: 9,
        marginTop: 'auto',
    }
});

