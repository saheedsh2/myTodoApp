import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SingleTodo from "./components/SingleTodo";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if(!todo) return

    setTodos([...todos, {id: Date.now(), text: todo}])

    setTodo("")
  }

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();

  },[])



  // console.log(todos);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo APP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Note"
          style={styles.input}
           onChangeText={(text) => setTodo(text)}
           value={todo}
        />

    



        
        <TouchableOpacity onPress={handleAddTodo}>
          <Text style={styles.button}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 10, width: "100%"}}>
      
        <FlatList
          data={todos}
          renderItem={({item}) => <SingleTodo todo={item} setTodos={setTodos} todos={todos}/>}
          keyExtractor={(item) => item.id.toString()}
        />
         
      
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9c2b7",
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "black",
    elevation: 10,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "purple",
    padding: 13,
    borderRadius: 50,
    elevation: 10,
  },
});
