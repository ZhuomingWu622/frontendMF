import { Text, FlatList, ScrollView ,StyleSheet} from "react-native"
import { ItemCard, ItemCardProps } from "./itemCard"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BASE_URL } from "../utils";
import { videoItemListAtom } from "../atom";
import { useAtom } from "jotai";
import { VideoPostItem } from "../type";

// const duplicate = <T, >(arr: Array<T>, times: number) => {
//     const output =[];

//     for( let i =0; i< times; i++){
//         output.push(arr);
//     }
//     return output.flat();
// };


// const data: ItemCardProps[] = [
//     {
//         imgSourse:"https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
//         dishTitle: "sweet and sour pork", 
//         id: "1",
//         restaurantName: 'Chefus'},
//     {
//         imgSourse:"https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D", 
//         dishTitle: "orange chicken", 
//         id: "2",
//         restaurantName: 'US Kitchen'},

//     {
//         imgSourse:"https://images.unsplash.com/photo-1502998070258-dc1338445ac2?q=80&w=1279&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
//         dishTitle: "Burger Meal", 
//         id: "3",
//         restaurantName: 'Jersey Cafe'},

//     {
//         imgSourse:"https://plus.unsplash.com/premium_photo-1661600643912-dc6dbb1db475?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
//         dishTitle: "Chinese Dumpling", 
//         id: "4",
//         restaurantName: 'Chinese dragon'},

//     {
//         imgSourse:"https://images.unsplash.com/photo-1478749485505-2a903a729c63?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
//         dishTitle: "JP Ramen", 
//         id: "5",
//         restaurantName: 'Tokyo bistro'},




//     ]

export const ItemList = () => {
    const [itemsData, setItemsData] = useAtom(videoItemListAtom);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        setLoading(true);
        axios.get<VideoPostItem[]>(`${BASE_URL}/api/v1/video/videos?size=50`).then(result => {
            setItemsData(result.data)
        }).finally(()=>{
            setLoading(false);
        });
    },[]);


    if(loading){
        return <FontAwesome name="spinner" size = {60}/>;
    }

    return (
        <FlatList
            data={itemsData}
            // data = {data}
            renderItem={({ item, index}) => (
            <ItemCard
                    key ={index}
                    // imgSourse={item.imgSourse}
                    // dishTitle={item.dishTitle}
                    imgSourse={item.coverImageUrl}
                    dishTitle={item.postTitle}
                    restaurantName={item.restaurantName}
                    // id = {item.id}
                    id = {item._id}
                
                />
        )}
        numColumns={2}
        />
            
        
    );
};

const styles = StyleSheet.create({
    container:{
        width: "100%",
    },

    contentContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    }
});