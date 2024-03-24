import { Image, View, Text, StyleSheet, Pressable} from "react-native"
import { useNavigation } from "expo-router";
import { FC } from "react";

export interface ItemCardProps{
    imgSourse: string;
    dishTitle: string;
    restaurantName: string;
    id : string;
}

export const ItemCard: FC<ItemCardProps> = ({imgSourse,dishTitle,restaurantName,id}) => {
    const navigation = useNavigation<any>();
    
    return (
        <View style={styles.container}>
            <Pressable onPress={() =>{
                navigation.navigate(`video/[id]`,
                id = id);
            } }>
                <Image source = {{ 
                uri: imgSourse,
                }} 
                height = {250}
                style ={styles.img}
            />
            </Pressable>
            
            <View style = {styles.textContainer}>
                <Text style={styles.dishTitle}>{dishTitle}</Text>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexBasis: '46%',
        marginBottom: 15,
        marginHorizontal: '2%',
    },

    img:{
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    
    textContainer: {
    //   flex: 1,
      backgroundColor: '#fff',
      paddingBottom:15,
      paddingHorizontal:6,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    dishTitle:{
        fontSize: 18,
        fontWeight:'600',
        marginBottom: 12,
        
    },
    restaurantName:{
        fontWeight:'500',
        
    },
  });