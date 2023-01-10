import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const SingleTodo = ({ todo, setTodos, todos }) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (!edit) setEdit(!edit);
    else {
      setEdit(!edit);
      setTodos(
        todos.map((t) =>
          t.id === todo.id
            ? {
                id: t.id,
                text: editText,
              }
            : t
        )
      );
    }
  };

  return (
    <View style={styles.todo}>
      {!edit ? (
        <Text style={styles.todoText}>{todo.text}</Text>
      ) : (
        <TextInput
          style={styles.todoInput}
          value={todo.text}
          onChangeText={(text) => setEditText(text)}
        />
      )}

      <TouchableOpacity>
        <MaterialIcons
          style={styles.todoaction}
          name="edit"
          size={23}
          color="black"
          onPress={handleEdit}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons
          style={styles.todoaction}
          name="delete"
          size={23}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SingleTodo;

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: "black",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  todoaction: {
    marginLeft: 15,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  todoInput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
  },
});
