import { ScrollView, useWindowDimensions,FlatList,ViewabilityConfigCallbackPairs } from "react-native"
import { VideoPlayer } from "./VideoPlayer"
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { videoItemListAtom } from "../atom";
import { useAtom, useAtomValue } from "jotai";
import { FC, useState,useRef } from "react";
import { Image } from "react-native";

interface VideoListProps{
    initialVideoId: string;
}


export const VideoList:FC<VideoListProps> = ({initialVideoId}) => {
    
    const {height} = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const videoHeight = height - insets.top - insets.bottom;
    const videoItemsList = useAtomValue(videoItemListAtom);
    const [activeVideoIndex, setActiveVideoIndex] = useState(-1);

    const viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs = [
        
        {onViewableItemsChanged : ({viewableItems}) =>{
            if ( viewableItems.length){
                setActiveVideoIndex(viewableItems[0].index as number);
            }},
        viewabilityConfig:{
            itemVisiblePercentThreshold:90,
        }}
    ]

    const viewabilityConfigCallbackPairsRef = useRef(viewabilityConfigCallbackPairs)

    return (
        <FlatList 
        style={{ width: '100%'}}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairsRef.current}
        initialScrollIndex={videoItemsList.findIndex(
            (videoItem)=>videoItem._id === initialVideoId)}
        getItemLayout={(data,index) => ({
                length: videoHeight, 
                offset: videoHeight*index,
                index
        })}
        
        contentContainerStyle = {{  width: '100%'}}
        snapToInterval={videoHeight}
        decelerationRate="fast"
        data={videoItemsList}
        renderItem={({item,index}) =>{
            return Math.abs(activeVideoIndex -index) <= 1 ? (<VideoPlayer 
            key = {item._id}
            videoHeight={ videoHeight}
            posterUrl={item.coverImageUrl}
            videoUrl={item.videoUrl}
            restaurantName={item.restaurantName}
            dishTitle={item.postTitle}
            activeVideoIndex={activeVideoIndex}
            selfVideoIndex={index}
            />
            ) : (
                <Image 
                source = {{uri: item.coverImageUrl}} 
                height = {videoHeight}
                />
            );
            
        }}

        
        />
           
        
    );
};

