import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { database } from "../../config/firebase.config"
import { collection, getDocs, deleteDoc, where } from "firebase/firestore";


export default function Task({ navigation }) {
    const [tasks, setTasks] = useState([]);

    async function deleteTask(id) {
        await deleteDoc(collection(database, "Tasks"),
            where("id", "==", id)
        )
    }

    async function getTasks() {
        const querySnapshot = await getDocs(collection(database, "Tasks"))
        const taskList = []
        querySnapshot.forEach((doc) => {
            taskList.push({ ...doc.data(), id: doc.id })
        });
        setTasks(taskList)
    }

    useEffect(() => {
        getTasks()
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.Tasks}>
                            <TouchableOpacity
                                style={styles.deleteTask}
                                onPress={() => {
                                    deleteTask(item.id)
                                }}
                            >
                                <FontAwesome
                                    name="star"
                                    size={23}
                                    color="#F92e6A"
                                >
                                </FontAwesome>
                            </TouchableOpacity>
                            <Text
                                style={styles.DescriptionTask}
                                onPress={() =>
                                    navigation.navigate("Details", {
                                        id: item.id,
                                        description: item.description,
                                    })
                                }
                            >
                                {item.description}
                            </Text>

                        </View>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.buttonNewTask}
                onPress={() => navigation.navigate("New Task")}
            >
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    Tasks: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    deleteTask: {
        justifyContent: "center",
        paddingLeft: 15,
    },
    DescriptionTask: {
        width: "75%",
        alignContent: "flex-start",
        backgroundColor: "#f5f5f5cf",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15,
        color: "#282b2db5",
    },
    buttonNewTask: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "#F92e6a",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton: {
        color: "#ffffff",
        fontSize: 25,
        fontWeight: "bold",
    },
});