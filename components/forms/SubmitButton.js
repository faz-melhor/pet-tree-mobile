import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { Button } from "react-native-paper";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      style={styles.button}
      contentStyle={{ height: 50 }}
      mode="contained"
      onPress={handleSubmit}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});
